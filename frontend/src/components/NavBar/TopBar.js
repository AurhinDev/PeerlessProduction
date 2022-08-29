import React, { useState, useEffect } from "react";
import "./TopBar.css";
import NetworkDropdown from "./NetworkDropdown";
import CurrencyDropdown from "./CurrencyDropdown";
import { ethers } from "ethers";
import { motion } from "framer-motion";

function TopBar(props) {
  /*   const connect = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum, "any");  
    console.dir(provider)
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    console.log("Account:", await signer.getAddress());
}; */

  const coolStats = ["This is Cool", "Yeah Boy", "Cool Stats Comming", "hej kompis"];
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (count < coolStats.length - 1) {
        setCount(count + 1);
      } else {
        setCount(0);
      }
    }, 10000);
    return () => {
      clearInterval(interval);
    };
  });

  useEffect(() => {
    console.dir("run animation");
  }, [count]);

  return (
    <div className="TopBar-container">
      <h1>PeerlessProduction</h1>
      <div className="TopBar-stats">
        <motion.h4
          animate={{ opacity: [0, 1, 1, 1, 0], y: [-50, 1, 1, 1, -50] }}
          transition={{ repeat: Infinity, duration: 10 }}
        >
          {coolStats[count]}
        </motion.h4>
      </div>
      <div className="TopBar-dropdowns">
        <NetworkDropdown />
        <CurrencyDropdown />
      </div>
    </div>
  );
}

export default TopBar;
