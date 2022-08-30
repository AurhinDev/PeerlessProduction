pragma solidity ^0.8.0;

//SPDX-License-Identifier: UNLICENSED


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./Peer.sol";


contract PeerlessFactory {

    address payable private owner;

    uint public tradeFee = 102; //2%
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

    function AddPeer(address _tokenadr, string memory _name) public onlyOwner() {
        require(!peerRegistered[_tokenadr], "Peer already registered");

        Peer newPeer = new Peer(address(this), _name, _tokenadr, tradeFee, peerID);
        PeerStruct memory peer = PeerStruct(
            msg.sender, 
            address(newPeer),
            _tokenadr,
            peerID, 
            block.timestamp, 
            _name,
            false
            );

        peerById[peerID] = peer;
        peerRegistered[_tokenadr] = true;
        peerByOwnerAdr[msg.sender] = peer;
        peers.push(peer);
        peerID += 1;
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

    function IsPeerFrozen(uint id) external view returns (bool) {
        return peerById[id].frozen;
    }

    function SetTradeFee(uint fee) external onlyOwner() {
        tradeFee = fee;
    }

    function SetFrozenPeer(uint id, bool frozen) external onlyOwner() {
        peerById[id].frozen = frozen;
    }
}

