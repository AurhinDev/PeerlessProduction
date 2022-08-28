import React, { useContext } from "react";
import { NetworkContext, CurrencyContext } from "../../../helper/Context";
import "./TabelContainer.css";



function TabelContainer(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  
  
  return (
    <div className="TabelContainer-container">
      <div className="header-info"><h2> ORDERS</h2><h5>All contract available in the network</h5></div>
      <div className='TabelContainer-scrollable standardShadow'>
      <table className="TabelContainer-tabel ">
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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
          <tr className="TabelContainer-row">
            <td>6</td>
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

          <tr className="TabelContainer-row">
            <td>6</td>
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
    </div>
  );
}

export default TabelContainer;
