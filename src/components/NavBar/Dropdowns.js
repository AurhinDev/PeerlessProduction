import React, { useContext, useEffect, useState } from "react";
import { NetworkContext, CurrencyContext } from "../../helper/Context";
import "./Dropdown.css";
import { exportedPairings } from "../../helper/Pairings";
import ArrowButton from "../Features/ArrowButton";
function Dropdowns(props) {
  let pairings = exportedPairings;

  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  const [networkOpen, setNetworkOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    setCurrency(pairings[network][0]);
  }, [network]);

  function handleNetworkDropdown(e) {
    setNetworkOpen((prevState) => !prevState);
  }

  function handleCurrencyDropdown(e) {
    setCurrencyOpen((prevState) => !prevState);
  }

  function handleNetworkSelect(e) {
    setNetwork(e.target.innerHTML);
    setNetworkOpen(false);
    setCurrencyOpen(true);
  }
  function handleCurrencySelect(e) {
    const name = e.target.getAttribute("data-name");
    const clickedCurrency = pairings[network].filter(
      (item) => item[12].name == name
    );

    setCurrency(clickedCurrency[0]);
    setCurrencyOpen(false);
  }

  return (
    <>
      <div className="dropDown-container standardShadow">
        <div className="dropDown-network">
          <div
            className="dropDown-network-text"
            onClick={handleNetworkDropdown}
          >
            <h3>Network</h3>
            <ArrowButton upOrDown={networkOpen ? "down" : ""} />
          </div>
          <div className="select-dropdown">
            <ul className="dropdown">
              {networkOpen ? (
                Object.entries(pairings).map((item) => (
                  <li
                    value={item[0]}
                    key={item[0]}
                    onClick={handleNetworkSelect}
                    className={item[0] == network ? "dropdown-active" : ""}
                  >
                    {item[0]}
                  </li>
                ))
              ) : (
                <li
                  value={network}
                  key={network}
                  onClick={handleNetworkSelect}
                  className="dropdown-active"
                >
                  {network}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="dropDown-container standardShadow">
        <div className="dropDown-currency">
          <div
            className="dropDown-network-text"
            onClick={handleCurrencyDropdown}
          >
            <h3>Currency</h3>
            <ArrowButton upOrDown={currencyOpen ? "down" : ""} />
          </div>
          <div className="select-dropdown">
            <ul className="dropdown">
              {" "}
              {currencyOpen ? (
                pairings[network].map((item) => {
                  const peerAdr = item[8].peerAdr;
                  const name = item[12].name;
                  if (name == currency[12].name) {
                    console.dir("yeaoy");
                  }

                  return (
                    <li
                      key={peerAdr}
                      value={name}
                      data-peeradr={peerAdr}
                      data-name={name}
                      onClick={handleCurrencySelect}
                      className={
                        name == currency[12].name ? "dropdown-active" : ""
                      }
                    >
                      {name + " - " + peerAdr}
                    </li>
                  );
                })
              ) : (
                <li
                  key={currency[8].peerAdr}
                  value={currency[12].name}
                  data-peeradr={currency[8].peerAdr}
                  data-name={currency[12].name}
                  onClick={handleCurrencySelect}
                  className="dropdown-active"
                >
                  {currency[12].name + " - " + currency[8].peerAdr}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dropdowns;
