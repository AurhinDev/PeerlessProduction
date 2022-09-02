import React, { useEffect, useState } from "react";
import Slider from "../../Features/Slider";
import "./BuyAndSellContainer.css";
function BuyAndSellContainer(props) {
  const [buy, setBuy] = useState(true);
  /* const [sliderState, setsliderState] = useState(0); */
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
  useEffect(()=>{
    console.dir(buy)
  }, [buy])
  function handleSubmit(e) {
    console.dir("hej");
  }
  return (
    <div className=" centerInDiv BuyAndSellContainer-container  ">
      <div className="BuyAndSellContainer-HeaderAndButtons">
        {buy ? (
          <div className="header-info-title">
            <h2> BUY</h2>
            <h5>Make buy order</h5>
          </div>
        ) : (
          <div className="header-info-title">
            <h2> SELL</h2>
            <h5>Make sell order</h5>
          </div>
        )}
     
        <Slider width={"20%"} value1={"Buy"} value2={"Sell"} background1={"var(--backgroundGreen)"} background2={"var(--backgroundRed)"} state={setBuy}/>
      </div>
      <form
        className="BuyAndSellContainer-form " //standardShadow
        
      >
        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="evm">EVM</label>
          <input type="text" id="evm" name="evm" />
        </div>
        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="token">TOKEN</label>
          <input type="text" id="token" name="token" />
        </div>

        {buy ? (
          <button
            className="button-23 button-23-green BuyAndSellContainer-form-submitButton "
            type="button"
            onClick={handleSubmit}
          >
            Buy Contract
          </button>
        ) : (
          <button
            className="button-23 button-23-red BuyAndSellContainer-form-submitButton "
            type="button"
            onClick={handleSubmit}
          >
            Sell Contract
          </button>
        )}
      </form>
    </div>
  );
}

export default BuyAndSellContainer;
