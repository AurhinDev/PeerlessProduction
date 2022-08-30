pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./PeerlessFactory.sol";
import "hardhat/console.sol";


contract Peer is ReentrancyGuard {

    using Address for address;

    IERC20 token;
    PeerlessFactory factory;
    
    mapping(uint => Order) public allOrders;
    mapping(address => uint[]) public ordersByOwner;

    address payable private owner;
    address tokenAdr;
    address factoryAdr;
    
    string name;

    uint private _sellOrdersPosted = 0;
    uint private _sellOrdersFilled = 0;
    uint private _buyOrdersPosted = 0;
    uint private _buyOrdersFilled = 0;
    uint private _ordersCancelled = 0;
    uint public orderId = 0;
    uint public tokenFeesCollected = 0;
    uint public evmCurrencyFeesCollected = 0;
    uint id;
    uint fee;

    modifier notFrozen() {
        require(!factory.IsPeerFrozen(id), "Peer is frozen");
        _;
    }

    struct Order {
        uint id;
        address payable owner;
        bool filled;
        bool cancelled;
        uint evmCurrency;
        uint token;
        bool buyToken;
        uint datecreated;
    }

    modifier onlyOwner(){
        require(owner == msg.sender, "Not owner");
        _;
    }

    event BuyTokenOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event SellTokenOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event CancelledOrder(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event BuyTokenOrderFilled(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);
    event SellTokenOrderFilled(address indexed _from, uint indexed _id, uint _token, uint _evmCurrency);

    constructor(address _factory, string memory _name, address _adr, uint _fee, uint _id) {

        owner = payable(msg.sender);
        id = _id;
        fee = _fee;
        name = _name; 

        setContract(_adr);
        setFactory(_factory);
    }

    function setContract(address _adr) public onlyOwner() {
       token = IERC20(_adr);
    }
    function setFactory(address _adr) public onlyOwner() {
       factory = PeerlessFactory(_adr);
    }

    // BUY TOKEN FOR EVM CURRENCY
    function PostBuyOrder(uint _evmCurrency, uint _token) payable external notFrozen() {
        require(_evmCurrency > 0 && _token > 0, 'Too low order');
        require(msg.value > GetCostWithFee(_evmCurrency), 'Insufficient EVM Currency + Fee');
         
        Order memory order = Order(orderId, payable(msg.sender), false, false, _evmCurrency, _token, true, block.timestamp);
        allOrders[orderId] = order;
        ordersByOwner[msg.sender].push(orderId);
        _buyOrdersPosted += 1;

        emit BuyTokenOrder(msg.sender, orderId, _evmCurrency, _token);

        orderId += 1;
        evmCurrencyFeesCollected += GetCostWithFee(_evmCurrency) - _evmCurrency;
    }

    // SELL TOKEN FOR EVM CURRENCY
    function PostSellOrder(uint _evmCurrency, uint _token) external notFrozen() {
        require(token.balanceOf(msg.sender) > GetCostWithFee(_token), "Insufficient Token");
        
        token.transferFrom(msg.sender, address(this), _token);
        
        Order memory order = Order(orderId, payable(msg.sender), false, false, _evmCurrency, _token, false, block.timestamp);
        allOrders[orderId] = order;
        ordersByOwner[msg.sender].push(orderId);
        _sellOrdersPosted += 1;

        emit SellTokenOrder(msg.sender, orderId, _token, _evmCurrency);

        orderId += 1;
        tokenFeesCollected += GetCostWithFee(_token) - _token;
    }

    // This contract requires allowance from token
    function Approve(uint amount) external {
        token.approve(address(this), amount * 1 ether);
    }

    // AKA Sell tokens for EVM
    function FillBuyTokenOrder(uint _orderId) nonReentrant() notFrozen() public {
            console.log("LOG", _orderId);
            require(!allOrders[_orderId].filled, "Order filled");
            require(!allOrders[_orderId].cancelled, "Order cancelled");
        // Check Token Balance
            require(getContractTokenBalance() >= allOrders[_orderId].token, "Insufficient contract Token balance");

            // // Deposits Token in contract
            token.transferFrom(msg.sender, address(this), GetCostWithFee(allOrders[_orderId].token));

            // // Check Token before transfer out
            require(token.balanceOf(address(this)) > allOrders[_orderId].token, "Insufficient Token");
            
            // Check EVM before transfer out
            require(address(this).balance > allOrders[_orderId].evmCurrency, "Insufficient contract EVM balance");

            // Sends Token to Order owner
            token.transfer(allOrders[_orderId].owner, allOrders[_orderId].token);

            //orders[_orderId].owner.transfer(orders[_orderId].Token);
            //Token.transferFrom(owner, orders[_orderId].owner ,orders[_orderId].Token);

            // Sends EVM to Token seller
            (bool hs, ) = payable(msg.sender).call{value: allOrders[_orderId].evmCurrency }("");
            require(hs);

            allOrders[_orderId].filled = true;
            _buyOrdersFilled += 1;
            emit BuyTokenOrderFilled(msg.sender, orderId, allOrders[_orderId].token, allOrders[_orderId].evmCurrency);
    }

    // AKA Buy tokens for EVM
    function FillSellTokenOrder(uint _orderId) nonReentrant() notFrozen() payable public {
            require(!allOrders[_orderId].filled, "Order filled");
            require(!allOrders[_orderId].cancelled, "Order cancelled");

            require(msg.value > GetCostWithFee(allOrders[_orderId].evmCurrency), "Insufficient sender EVM");

            // Check Token before transfer out
            require(token.balanceOf(address(this)) > allOrders[_orderId].token, "Insufficient contract Token");
            
            // Check EVMCURRENCY before transfer out
            require(address(this).balance > allOrders[_orderId].evmCurrency, "Insufficient contract EVM balance");

            // Sends Token to order filler
            token.transfer(allOrders[_orderId].owner, allOrders[_orderId].token);

            // Sends EVMCURRENCY to order owner
            (bool hs, ) = payable( allOrders[_orderId].owner).call{value: allOrders[_orderId].evmCurrency }("");
            require(hs);

            _sellOrdersFilled += 1;
            allOrders[_orderId].filled = true;        
            emit SellTokenOrderFilled(msg.sender, orderId, allOrders[_orderId].token, allOrders[_orderId].evmCurrency);
    }

    function GetCostWithFee(uint amount) public view returns (uint) {
        return amount * (100 + fee) / 100;
    }

    function WithdrawFees() nonReentrant() onlyOwner() external {
        token.transfer(owner, tokenFeesCollected);
        owner.transfer(evmCurrencyFeesCollected);
        tokenFeesCollected = 0;
        evmCurrencyFeesCollected = 0;
    }

    function CancelOrder(uint _orderID) external {
        require(!allOrders[_orderID].filled || !allOrders[_orderID].cancelled, 'Order cant be filled or cancelled');
        require(address(allOrders[_orderID].owner) == msg.sender, "Not order owner");
        allOrders[_orderID].cancelled = true;
    }

    function getContractEVMBalance() public view returns(uint){
        return address(this).balance;
    }
    function getContractTokenBalance() public view returns(uint){
        return token.balanceOf(address(this));
    }
    function getTokenFeesCollected() public view returns(uint) {
        return tokenFeesCollected;
    }
    function getEVMFeesCollected() public view returns(uint) {
        return evmCurrencyFeesCollected;
    }
    function buyOrdersPosted() public view returns(uint){
        return _buyOrdersPosted;
    }
    function sellOrdersPosted() public view returns(uint){
        return _sellOrdersPosted;
    }
    function buyOrdersFilled() public view returns(uint){
        return _buyOrdersFilled;
    }
    function sellOrdersFilled() public view returns(uint){
        return _sellOrdersFilled;
    }
    function ordersCancelled() public view returns(uint) {
        return _ordersCancelled;
    }

    function getOrderByID(uint _id) public view returns (uint, address payable, bool, bool, uint, uint, bool) {
        return (allOrders[_id].id, allOrders[_id].owner, allOrders[_id].filled, allOrders[_id].cancelled, allOrders[_id].evmCurrency, allOrders[_id].token, allOrders[_id].buyToken);
    }

    function getOrdersByOwner(address _owner) public view returns (uint[] memory) {
        return ordersByOwner[_owner];
    }
}