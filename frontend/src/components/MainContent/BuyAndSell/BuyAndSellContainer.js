import React, { useState } from "react";
import "./BuyAndSellContainer.css";
function BuyAndSellContainer(props) {
  const [buy, setBuy] = useState(true);

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

  function handleSubmit(e) {
    console.dir("hej");
  }
  return (
    <div className=" centerInDiv BuyAndSellContainer-container  ">
      <div className="BuyAndSellContainer-HeaderAndButtons">
        {buy ? <div className="header-info"><h2> BUY</h2><h5>Make buy order</h5></div> : <div className="header-info"><h2> SELL</h2><h5>Make sell order</h5></div>}
        <div className="BuyAndSellContainer-form-buttons">
          <button
            type="button"
            onClick={handleBuyAndSell}
            value="buy"
            className="BuyButton button-5"
          >
            Buy
          </button>

          <button
            type="button"
            onClick={handleBuyAndSell}
            value="sell"
            className="SellButton button-5"
          >
            Sell
          </button>
        </div>
      </div>
      <form
        className="BuyAndSellContainer-form"
        style={
          buy
            ? {
                backgroundColor: "rgb(22, 156, 20, 0.3)",
                boxShadow: "rgb(39, 206, 36, 0.1) 5px 5px 20px",
              }
            : {
                backgroundColor: "rgb(192, 15, 15, 0.3)",
                boxShadow: "rgb(192, 15, 15, 0.1)  5px 5px 20px",
              }
        }
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
            className="button-23 BuyAndSellContainer-form-submitButton "
            type="button"
            onClick={handleSubmit}
          >
            Buy Contract
          </button>
        ) : (
          <button
            className="button-23 BuyAndSellContainer-form-submitButton "
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
