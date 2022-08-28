import React, { useState } from "react";
import "./BuyAndSellContainer.css";
function BuyAndSellContainer(props) {
  const [buy, setBuy] = useState(false);

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
      {buy?<h2> Buy STONKS</h2>:<h2> Sell STONKS</h2> }
      <div className="BuyAndSellContainer-form-buttons">
          <button  type="button" onClick={handleBuyAndSell} value="buy" className="BuyButton button-5">
            Buy
          </button>

          <button  type="button"
            onClick={handleBuyAndSell}
            value="sell"
            className="SellButton button-5"
          >
            Sell
          </button>
        </div>
        </div>
      <form className="BuyAndSellContainer-form" style={{backgroundColor: buy? "rgb(22, 156, 20, 0.8)": "rgb(192, 15, 15, 0.8)"}}>
        

        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="evm">EVM</label>
          <input type="text" id="evm" name="evm" />
        </div>
        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="token">TOKEN</label>
          <input type="text" id="token" name="token" />
        </div>

        <button  className="button-23 BuyAndSellContainer-form-submitButton " type="button" onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  );
}

export default BuyAndSellContainer;
