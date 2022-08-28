import React, { useContext } from "react";
import { NetworkContext } from "../../helper/Context";

function NetworkDropdown(props) {
  const { network, setNetwork } = useContext(NetworkContext);

  function handleChange(e) {
    setNetwork(e.target.value);
  }

  return (
    <div>
      <select onChange={(e) => handleChange(e)}>
        <option value="NetworkOne">Network 1</option>
        <option value="NetworkTwo">Network 2</option>
        <option value="NetworkThree">Network 3</option>
      </select>
    </div>
  );
}

export default NetworkDropdown;
