import React, { useState } from "react";
import { ethers } from "ethers";
import factoryABI from "./abi/contracts/PeerlessFactory.sol/PeerlessFactory.json";
import peerABI from "./abi/contracts/Peer.sol/Peer.json";
import tokenABI from "./abi/contracts/InkCoin.sol/INKCoin.json";
import { exportedPairings } from "./helper/Pairings";

import Layout from "./components/Layout";
import { NetworkContext, CurrencyContext } from "./helper/Context";

function App() {
  let pairings = exportedPairings;
  const [network, setNetwork] = useState("Ethereum");
  const [currency, setCurrency] = useState(pairings[network][0]);
  const factory_abi = factoryABI;
  const peer_abi = peerABI;
  const token_abi = tokenABI;

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();

    const factory = new ethers.Contract(
      "0x455834aE722e4D1B7029bc5B8B4424e4e626BB1A", //0x592A6983Ff361f5C74e1B63Bd66059cbc3c05358
      factory_abi,
      signer
    );
    const peer1 = await factory.peerById(0);
    const peerAdress = peer1[1];
    const peer = new ethers.Contract(peerAdress, peer_abi, signer);
    const peerTokenAdr = peer1[2];
    const token = new ethers.Contract(peerTokenAdr, token_abi, signer);
   
   
    const tokenAllowance =  await token.allowance(peerAdress, address);
    const hexToDecimal = (hex) => parseInt(hex, 16);
    console.dir("tokenAllowance1" +  hexToDecimal(tokenAllowance._hex )); 
    console.dir(tokenAllowance); 
    
    const tokenApporve = await token.approve(peerAdress, 1000000000000000)
   
   
    const tokenAllowance2 =  await token.allowance(peerAdress, address);
    console.dir(tokenAllowance); 
    
    console.dir("tokenAllowance2" + hexToDecimal(tokenAllowance2))





  };
  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
        <div className="App">
          <Layout connect={connect} />
        </div>
      </CurrencyContext.Provider>
    </NetworkContext.Provider>
  );
}

export default App; 
/* console.log(address) */ /* console.dir(signer)

/*   const peerFee = await peer.GetCostWithFee(1000);
    const hexToDecimal = (hex) => parseInt(hex, 16);
    console.dir(hexToDecimal("0x6314d157")); */

/*  console.dir(signer) */
/*  console.dir(signer._address) */
/*      const address = await signer.getAddress()
 */
/*    console.dir(await provider.getCode(address))
 */
/* console.dir(await provider.getCode(address))
 */
 
//https://ethereum.stackexchange.com/question s/120817/how-to-call-a-contract-function-method-using-ethersjs

/*  async function connectToMetamask(){
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
}
connectToMetamask()  */

/*  struct PeerStruct {
      address owner;
      address peerAdr;
      address tokenAdr;
      uint peerID;
      uint dateCreated;
      string name;
      bool frozen;
  } */
