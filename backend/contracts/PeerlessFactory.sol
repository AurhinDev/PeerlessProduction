pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./Peer.sol";

contract PeerlessFactory {

    address payable private owner;

    uint public tradeFee = 102; //2%
    uint public addPeerFee  = 20 * 1e18; // 20 MATIC
    uint public peerID = 0;

    mapping(uint => PeerStruct) public peerById;
    mapping(address => bool) public peerRegistered;
    mapping(address => PeerStruct) public peerByOwnerAdr;

    PeerStruct[] peers;
    
    modifier onlyOwner(){
        require(owner == msg.sender, "Not owner");
        _;
    }

    struct PeerStruct {
        address owner;
        address peerAdr;
        address tokenAdr;
        uint peerID;
        uint dateCreated;
        string name;
        bool frozen;
    }

    constructor() {
        owner = payable(msg.sender);
    }

    function AddPeer(address adr, string memory name) public onlyOwner() {
        require(!peerRegistered[adr], "Peer already registered");

        Peer newPeer = new Peer(address(this), name, adr, tradeFee, peerID);
        PeerStruct memory peer = PeerStruct(
            msg.sender, 
            address(newPeer),
            adr,
            peerID, 
            block.timestamp, 
            name,
            false
            );

        peerById[peerID] = peer;
        peerRegistered[adr] = true;
        peerByOwnerAdr[msg.sender] = peer;
        peers.push(peer);
        peerID += 1;
    }

    function WithdrawFees() external onlyOwner() {
        for (uint256 i = 0; i < peers.length; i++) {
            Peer(peers[i].peerAdr).WithdrawFees();
        }
    }

    function GetPeers() external view returns (PeerStruct[] memory) {
        return peers;
    }

    function GetPeerByID(uint id) external view returns (PeerStruct memory) {
        return peerById[id];
    }
    
    function GetPeerByOwner(address adr) external view returns (PeerStruct memory) {
        return peerByOwnerAdr[adr];
    }

    // Used to see which Peers in DropDown. Dropdown set active peer, re-fetch orders.
 
    function IsPeerFrozen(uint id) external view returns (bool) {
        return peerById[id].frozen;
    }

    function SetTradeFee(uint fee) external onlyOwner() {
        tradeFee = fee;
    }

    function SetAddPeerFee(uint fee) external onlyOwner() {
        addPeerFee = fee * 1e18;
    }

    function SetFrozenPeer(uint id, bool frozen) external onlyOwner() {
        peerById[id].frozen = frozen;
    }
}

