pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./PeerlessFactory.sol";

contract Peer is ReentrancyGuard {

    using Address for address;

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

    string name;

    address payable private owner;
    address tokenAdr;
    address factoryAdr;
    
    IERC20 token;
    PeerlessFactory factory;
    Order[] public orderList;

    mapping(uint => Order) public allOrders;
    mapping(address => uint[]) public ordersByOwner;

    modifier notFrozen() {
        require(!factory.IsPeerFrozen(id), "Peer is frozen");
        _;
    }

    struct Order {
        address payable owner;
        bool filled;
        bool cancelled;
        uint evmCurrency; //ETH, MATIC etc
        uint token;
        bool buyToken;
        uint indexInOrderList;
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

    constructor(address _factory, 
    string memory _name, 
    address _adr, 
    uint _fee, 
    uint _id) {

        owner = payable(msg.sender);
        id = _id;
        fee = _fee;
        name = _name; 

        setContract(_adr);
        setFactory(_factory);
    }

    function setContract(address _adr) private {
       token = IERC20(_adr);
    }
    function setFactory(address _adr) private {
       factory = PeerlessFactory(_adr);
    }


    // BUY TOKEN FOR EVM CURRENCY
    function PostBuyOrder(uint _evmCurrency, uint _token) payable external notFrozen() {
        require(_evmCurrency > 0 && _token > 0, 'Too low order');
        require(msg.value > GetCostWithFee(_evmCurrency), 'Insufficient EVM Currency + Fee');
         
        Order memory order = Order(payable(msg.sender), false, false, _evmCurrency, _token, true, orderList.length);
        orderList.push(order);
        allOrders[orderId] = order;
        ordersByOwner[msg.sender].push(orderId);
        _buyOrdersPosted += 1;

        emit BuyTokenOrder(msg.sender, orderId, _evmCurrency, _token);
        orderId++;
        
        evmCurrencyFeesCollected += GetCostWithFee(_evmCurrency) - _evmCurrency;
    }

    // SELL TOKEN FOR EVM CURRENCY
    function PostSellOrder(uint _evmCurrency, uint _token) external notFrozen() {
        require(token.balanceOf(msg.sender) > GetCostWithFee(_token), "Insufficient Token");
        
        token.transferFrom(msg.sender, address(this), _token);
        
        Order memory order = Order(payable(msg.sender), false, false, _evmCurrency, _token, false, orderList.length);
        orderList.push(order);
        allOrders[orderId] = order;
        ordersByOwner[msg.sender].push(orderId);
        _sellOrdersPosted += 1;
        emit SellTokenOrder(msg.sender, orderId, _token, _evmCurrency);
        orderId++;
        tokenFeesCollected += GetCostWithFee(_token) - _token;
    }

    // CALL BEFORE POST SELL ORDER
    function Approve() external {
        token.approve(address(this), 100000 * 1 ether);
    }

    function FillOrder(uint _orderId) nonReentrant() notFrozen() payable public {

        require(!allOrders[_orderId].filled, "Order filled");
        require(!allOrders[_orderId].cancelled, "Order cancelled");
       

        if (allOrders[_orderId].buyToken) {

            // Check Token Balance
            require(getContractTokenBalance() >= allOrders[_orderId].token, "Insufficient contract Token balance");

            // // Deposits Token in contract
            // Token.transferFrom(msg.sender, address(this), GetCostWithFee(orders[_orderId].token));
            
            // // Check Token before transfer out
            // require(Token.balanceOf(address(this)) > orders[_orderId].Token, "Insufficient Token");
            
            // Check EVM before transfer out
            require(address(this).balance > allOrders[_orderId].evmCurrency, "Insufficient contract EVM balance");

            // Sends Token to Order owner
            token.transfer(allOrders[_orderId].owner, allOrders[_orderId].token);
            //orders[_orderId].owner.transfer(orders[_orderId].Token);
            //Token.transferFrom(owner, orders[_orderId].owner ,orders[_orderId].Token);

            // Sends EVM to Token seller
            (bool hs, ) = payable(msg.sender).call{value: allOrders[_orderId].evmCurrency }("");
            require(hs);

            // Fills Order
            allOrders[_orderId].filled = true;
            orderList[allOrders[_orderId].indexInOrderList].filled = true;

            _buyOrdersFilled += 1;
            emit BuyTokenOrderFilled(msg.sender, orderId, allOrders[_orderId].token, allOrders[_orderId].evmCurrency);


        } else {
             // Check EVMCURRENCY msg.value
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

            // Fills Order
            allOrders[_orderId].filled = true;
            orderList[allOrders[_orderId].indexInOrderList].filled = true;

            _sellOrdersFilled += 1;
            
            emit SellTokenOrderFilled(msg.sender, orderId, allOrders[_orderId].token, allOrders[_orderId].evmCurrency);
        }
        //RemoveOrderFromList(_orderId);
    }

    function GetCostWithFee(uint amount) internal view returns (uint) {
        return amount * fee / 100;
    }

    function RemoveOrderFromList(uint256 _orderID) internal {
        require(allOrders[_orderID].filled || allOrders[_orderID].cancelled, 'Order must be filled or cancelled');

        uint256 indexInArray = allOrders[_orderID].indexInOrderList;
        orderList[indexInArray] = orderList[orderList.length - 1];
        allOrders[_orderID].indexInOrderList = indexInArray;
        orderList.pop();
    }

    function WithdrawFees() nonReentrant() onlyOwner() external {
        token.transfer(owner, tokenFeesCollected);
        owner.transfer(evmCurrencyFeesCollected);
    }

    // Return payment for each order to each user
    function EmergencyWithdrawal() nonReentrant() onlyOwner() external {
        for (uint256 i = 0; i < orderList.length; i++) {
            if (!orderList[i].filled || !orderList[i].cancelled) {
                if (orderList[i].buyToken) {
                    //Send matic
                    (bool hs, ) = payable(orderList[i].owner).call{value: orderList[i].evmCurrency }("");
                    require(hs);
                } else {
                    // Send Token
                   token.transfer(orderList[i].owner, orderList[i].token);
                }
                orderList[i].cancelled = true;
            }
        }
    }

    /*

    struct Order {
        address payable owner;
        bool filled;
        bool cancelled;
        uint evmCurrency; //ETH, MATIC etc
        uint token;
        bool buyToken;
        uint indexInOrderList;
    }
    */

    function getContractMaticBalance() public view returns(uint){
        return address(this).balance;
    }
    function getContractTokenBalance() public view returns(uint){
        return token.balanceOf(address(this));
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

    function getOrderByID(uint _id) public view returns (address payable, bool, bool, uint, uint, bool) {
        return (allOrders[_id].owner, allOrders[_id].filled, allOrders[_id].cancelled, allOrders[_id].evmCurrency, allOrders[_id].token, allOrders[_id].buyToken);
    }

    function getOrdersByOwner(address _owner) public view returns (uint[] memory) {
        return ordersByOwner[_owner];
    }
    
    function getAllActiveOrder() public view returns (Order[] memory) {
        return orderList;
    }
    //Add
}