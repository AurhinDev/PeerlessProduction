import React, { useContext } from "react";
import { NetworkContext, CurrencyContext } from "../../helper/Context";

function CurrencyDropdown(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  const networkCurency = {
    NetworkOne: {
      EURO: "123",
      BITCOIN: "R5234",
      ETHERIUM: "4234",
    },
    NetworkTwo: {
      EURO: "3123",
      ETHERIUM: "2434",
    },
    NetworkThree: {
      EURO: "3123",
      BITCOIN: "23442342",
    },
  };
  const selectedNetwork = networkCurency[network];
  const entries = Object.entries(selectedNetwork);


  function handleChange(e) {
    setCurrency(e.target.value)
  }

  const listItems = entries.map((item) => (
    <option key={item[0]}>{item[0] + "-" + item[1]}</option>
  ));
  

  return (
    <div>
      <select onChange={(e) => handleChange(e)}>{listItems}</select>
    </div>
  );
}

export default CurrencyDropdown;
