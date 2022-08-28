import React, { useContext } from "react";
import { NetworkContext, CurrencyContext } from "../../../helper/Context";
import "./TabelContainer.css";
function TabelContainer(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
// Prompt user for account connections
await provider.send("eth_requestAccounts", []);
const signer = provider.getSigner();
console.log("Account:", await signer.getAddress());
  return (
    <div className="TabelContainer-container">
      <table className="TabelContainer-tabel">
      <thead>
        <tr className="TabelContainer-first-row">
          <th>ID</th>
          <th>TYPE</th>
          <th>TOKEN</th>
          <th>EVM TOKEN</th>
          <th>DATE</th>
        </tr>
        </thead>
        <tbody>
        <tr className="TabelContainer-row">
          <td>1</td>
          <td>BUY</td>
          <td>USD</td>
          <td>EURO</td>
          <td>2022-08-28</td>
        </tr>
  
        <tr className="TabelContainer-row">
          <td>2</td>
          <td>SELL</td>
          <td>MONEY</td>
          <td>PUNG</td>
          <td>2022-08-22</td>
        </tr>
        <tr className="TabelContainer-row">
          <td>3</td>
          <td>SELL</td>
          <td>MONEY</td>
          <td>PUNG</td>
          <td>2022-08-22</td>
        </tr>
        <tr className="TabelContainer-row">
          <td>4</td>
          <td>SELL</td>
          <td>MONEY</td>
          <td>PUNG</td>
          <td>2022-08-22</td>
        </tr>

        <tr className="TabelContainer-row">
          <td>5</td>
          <td>SELL</td>
          <td>MONEY</td>
          <td>PUNG</td>
          <td>2022-08-22</td>
        </tr>
        <tr className="TabelContainer-row">
          <td>6</td>
          <td>SELL</td>
          <td>MONEY</td>
          <td>PUNG</td>
          <td>2022-08-22</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TabelContainer;
