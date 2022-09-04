import React, { useState } from "react";
import { ethers } from "ethers";
import factoryABI from "./abi/contracts/PeerlessFactory.sol/PeerlessFactory.json";
import peerABI from "./abi/contracts/Peer.sol/Peer.json";
import tokenABI from "./abi/contracts/InkCoin.sol/INKCoin.json";
import { exportedPairings } from "./helper/Pairings";

import Layout from "./components/Layout";
import { NetworkContext, CurrencyContext } from "./helper/Context";

function App() {
  let pairings =exportedPairings;
  const [network, setNetwork] = useState("Ethereum");
  const [currency, setCurrency] = useState(pairings[network][0]);

  const factory_abi = factoryABI;
  const peer_abi = peerABI;
  const token_abi = tokenABI;

/*   const connect = async () => { */
  async function connectToMetamask(){
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    await provider.send("eth_requestAccounts", []);
    const signer =  provider.getSigner();
  
    // Denna koden crashar också men används inte till något ännu
    // const myConnectedAddress = provider.selectedAddress ? provider.selectedAddress : provider?.accounts[0];
    const address = await signer.getAddress();
    const token = new ethers.Contract("0x7b12Aa06509141AADeabB6CA200ce01a0F0b2B3E", token_abi, signer)
    const factory = new ethers.Contract("0x592A6983Ff361f5C74e1B63Bd66059cbc3c05358", factory_abi, signer)
    const peer1 = await factory.peerById(0) 
    const peerAdress = peer1[1];
    const peer = new ethers.Contract(peerAdress, peer_abi, signer)
   console.dir(await peer.GetCostWithFee(1000))
    // Denna koden crashar
    
    
   /*  console.dir(signer) */
   /*  console.dir(signer._address) */
/*      const address = await signer.getAddress()
 */        /* console.log(address) */
/*    console.dir(await provider.getCode(address))
 */
/* console.dir(await provider.getCode(address))
 *//* console.dir(signer)
   console.log("Account:", await signer.getAddress()); */
     //https://ethereum.stackexchange.com/question s/120817/how-to-call-a-contract-function-method-using-ethersjs

    /*  struct PeerStruct {
      address owner;
      address peerAdr;
      address tokenAdr;
      uint peerID;
      uint dateCreated;
      string name;
      bool frozen;
  } */
    };



/*  async function connectToMetamask(){
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
}
connectToMetamask()  */

connectToMetamask()
  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
      
      <div className="App">
{/*       <button onClick={connect} className="button-23 connect2"> click  </button>  
 */}        <Layout />
      </div>

      </CurrencyContext.Provider >
    </NetworkContext.Provider>
  );
}

export default App;
