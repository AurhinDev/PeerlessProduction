import React from 'react';
import "./TopBar.css"
import NetworkDropdown from './NetworkDropdown';
import CurrencyDropdown from './CurrencyDropdown';
import { ethers } from "ethers";

function TopBar(props) {
  const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");  
    console.dir(provider)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
};

  return (
    <div className='TopBar-container' >
      <h3> Coola Stats 1</h3>
      <h3> Coola Stats 2</h3>
      <NetworkDropdown/>
      <CurrencyDropdown/>
      <button onClick={connect}>Click</button>
    </div>
  );
}

export default TopBar;