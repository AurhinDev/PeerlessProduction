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
      {buy?<h2> Buy STONKS</h2>:<h2> Sell STONKS</h2> }
      <form className="BuyAndSellContainer-form">
        <div className="BuyAndSellContainer-form-buttons">
          <button  type="button" onClick={handleBuyAndSell} value="buy" className="BuyButton">
            Buy
          </button>

          <button  type="button"
            onClick={handleBuyAndSell}
            value="sell"
            className="SellButton"
          >
            Sell
          </button>
        </div>

        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="evm">EVM</label>
          <input type="text" id="evm" name="evm" />
        </div>
        <div className="BuyAndSellContainer-form-input">
          <label htmlFor="token">TOKEN</label>
          <input type="text" id="token" name="token" />
        </div>

        <button  className="BuyAndSellContainer-form-submitButton" type="button" onClick={handleSubmit}>Sumbit</button>
      </form>
    </div>
  );
}

export default BuyAndSellContainer;
