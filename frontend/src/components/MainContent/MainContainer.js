import React, { useContext } from "react";
import { NetworkContext } from "../../helper/Context";
import "./MainContent.css";
import TabelContainer from "./Tabel/TabelContainer";
import BuyAndSellContainer from "./BuyAndSell/BuyAndSellContainer";
import ActiveOrdersContainer from "./ActiveOrders/ActiveOrdersContainer";
function MainContainer(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  return (
    <div className="MainContainer-container">
      <TabelContainer />
      
      <div className="MainContainer-side">
     
      <BuyAndSellContainer /> 
      <ActiveOrdersContainer />
         
      </div>
    </div>
  );
}

export default MainContainer;
