import React, { useEffect, useState, useContext } from "react";
import Slider from "../../Features/Slider";
import { NetworkContext, CurrencyContext } from "../../../helper/Context";
import  {ReactComponent as AddSvg}  from "../../../assets/plus.svg";
import "./BuyAndSellContainer.css";
function BuyAndSellContainer(props) {
  const [buy, setBuy] = useState(true);
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const networkAbbreviations = {
    Ethereum: "ETH",
    Polygon: "MATIC",
    Avalanche: "AVAX",
  };
   const  placeholder1 = "Number of " + network;
  const  placeholder2 = "Number of " + currency[12].name ;
 

  function handleBuyAndSell(e) {
    if (e.target.value == "buy") {
      setBuy(true);
      return;
    }
    if (e.target.value == "sell") {
      setBuy(false);
      return;
    } else {
      console.dir("Error: " + e.target.value);
    }
  }
  useEffect(() => {
    
  }, [buy]);
  function handleSubmit(e) {
    console.dir("hej");
  }
  return (
    <div className=" centerInDiv BuyAndSellContainer-container   ">
      <div className="BuyAndSellContainer-HeaderAndButtons">
        {buy ? (
          <div className="header-info-title">
            <h2>BUY </h2>
            <h5>Create Buy Order</h5>
          </div>
        ) : (
          <div className="header-info-title">
            <h2> SELL</h2>
            <h5>Create Sell Order</h5>
          </div>
        )}

        <Slider
          width={"20%"}
          value1={"Buy"}
          value2={"Sell"}
          background1={"var(--backgroundGreen)"}
          background2={"var(--backgroundRed)"}
          state={setBuy}
        />
      </div>
      <form
        className="BuyAndSellContainer-form standardShadow " //standardShadow
      >
        <div className="BuyAndSellContainer-main">
          <div className="BuyAndSellContainer-text">
            <p className="bold">I want to {buy? "buy": "sell"}</p>
            <p className="bold">To the price of</p>
          </div>

          <div className="BuyAndSellContainer-input">
            <input placeholder={placeholder1}/>
            <input placeholder={placeholder2}/>
          </div>
          <div className="BuyAndSellContainer-currency">
            <p className="bold">{networkAbbreviations[network]}</p>
            <p className="bold">{currency[12].name}</p>
          </div>
        </div>

        {buy ? (
          <button
            className="button-23 button-23-green BuyAndSellContainer-form-submitButton bold"
            type="button"
            onClick={handleSubmit}
          >
          <AddSvg className="AddSvg"/><h3>Create Order</h3>
          </button>
        ) : (
          <button
            className="button-23 button-23-red BuyAndSellContainer-form-submitButton bold"
            type="button"
            onClick={handleSubmit}
          >
             <AddSvg className="AddSvg"/> <h3>Create Order</h3>
          </button>
        )}
      </form>
    </div>
  );
}

export default BuyAndSellContainer;
