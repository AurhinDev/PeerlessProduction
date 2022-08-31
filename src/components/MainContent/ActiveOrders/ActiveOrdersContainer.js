import React, {useContext} from "react";
import "./ActiveOrdersContainer.css";
import { NetworkContext, CurrencyContext } from "../../../helper/Context";

function ActiveOrdersContainer(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  
  const networkAbbreviations = {
    "Ethereum": "ETH",
    "Polygon": "MATIC",
    "Avalanche": "AVAX"

  };

  const allOrders =   [
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: true,
      datecreated:  { value: "1661692336" }
    },

    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: true,
      datecreated:  { value: "1661692336" }
    },
    
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: false,
      datecreated:  { value: "1661692336" }
    }
    ,
    
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: false,
      datecreated:  { value: "1661692336" }
    }
    
    ,
    
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: false,
      datecreated:  { value: "1661692336" }
    }
    
    ,
    
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: false,
      datecreated:  { value: "1661692336" }
    }
    
    ,
    
    {
      owner: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      filled: false,
      cancelled: false,
      evmCurrency:  { value: "1000000000000000000" },
      token:  { value: "1000000000000000000" },
      buyToken: false,
      datecreated:  { value: "1661692336" }
    }
    
    
  ]

  const allOrdersFiltered = allOrders.filter(item => item.cancelled == false && item.filled == false );
  const tabelList = allOrdersFiltered.map((item, index) => {
    if( !item.cancelled & !item.filled){
      const tabelindex = index+1;
      const buy = item.buyToken;
      const token = item.token.value;
      const evmCurrency = item.evmCurrency.value;
      const date = item.datecreated.value;
    
      return (
        <tr className="TabelContainer-row">
              <td>{tabelindex}</td>
              {buy?<td className="TabelContainer-row-type" style={{color:"rgb(39, 206, 36)"}}>BUY</td>:<td className="TabelContainer-row-type" style={{color:"rgb(192, 15, 15)"}}>SELL</td>} 
              <td>{token}</td>
              <td>{evmCurrency}</td>
              <td>{date}</td>
              <td>
                <button className="button-5 ActiveOrdersContainer-cancel">
                  Cancel
                </button>
              </td>
            </tr>
      );
    }
    
  });

  
  return (
    <div className="ActiveOrdersContainer-container  ">
      <div className="header-info">
        <h2> MY ORDERS</h2>
        <h5>Orders I've made or am trying to buy</h5>
      </div>
      <div className="ActiveOrdersContainer-scrollable standardShadow ">
        <table className="ActiveOrdersContainer-tabel ">
          <thead>
            <tr className="ActiveOrdersContainer-first-row">
              <th>ID</th>
              <th>TYPE</th>
             
              <th>{currency}</th>
              <th>{networkAbbreviations[network]}</th>
              <th>DATE</th>
              <th>CANCEL</th>
            </tr>
          </thead>
          <tbody>
           {tabelList}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActiveOrdersContainer;
