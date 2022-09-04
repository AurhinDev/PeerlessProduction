import React, { useContext } from "react";
import { NetworkContext } from "../../helper/Context";
import "./MainContent.css";
import TabelContainer from "./Tabel/TabelContainer";
import BuyAndSellContainer from "./BuyAndSell/BuyAndSellContainer";
function MainContainer(props) {
  const { network, setNetwork } = useContext(NetworkContext);

  return (
    <div className="MainContainer-container">
      <div className="MainContainer-sidebar standardShadow">
        <BuyAndSellContainer />
      </div>

      <TabelContainer />
    </div>
  );
}

export default MainContainer;
