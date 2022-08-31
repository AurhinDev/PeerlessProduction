import React, { useState } from "react";
import { ethers } from "ethers";
import factoryABI from "./abi/contracts/PeerlessFactory.sol/PeerlessFactory.json";
import peerABI from "./abi/contracts/Peer.sol/Peer.json";
import tokenABI from "./abi/contracts/InkCoin.sol/INKCoin.json";


import Layout from "./components/Layout";
import { NetworkContext, CurrencyContext } from "./helper/Context";

function App() {
  const [network, setNetwork] = useState("Ethereum");
  const [currency, setCurrency] = useState(null);

  const factory_abi = factoryABI;
  console.log("Factory", factory_abi);
  const peer_abi = peerABI;
  console.log("Peer", peer_abi);
  const token_abi = tokenABI;
  console.log("Token", token_abi);

  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");

    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());

    const myConnectedAddress = provider.selectedAddress ? provider.selectedAddress : provider?.accounts[0];
    const token = new ethers.Contract("0x592A6983Ff361f5C74e1B63Bd66059cbc3c05358", token_abi, signer)
    const factory = new ethers.Contract("0xdAC17F958D2ee523a2206206994597C13D831ec7", factory_abi, signer)
    const peer = new ethers.Contract("VI HAR INGEN ADDRESS ÄNNU", peer_abi, signer)

    const name = await token.name()
    const asdasd = await factory.name()

    //https://ethereum.stackexchange.com/questions/120817/how-to-call-a-contract-function-method-using-ethersjs
};



  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
      
      <div className="App">
      <button onClick={connect()}> Click </button>
        <Layout />
      </div>

      </CurrencyContext.Provider >
    </NetworkContext.Provider>
  );
}

export default App;
