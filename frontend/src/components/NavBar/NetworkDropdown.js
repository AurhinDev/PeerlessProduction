import React, { useContext } from "react";
import { NetworkContext } from "../../helper/Context";
import "./Dropdown.css"
function NetworkDropdown(props) {
  const { network, setNetwork } = useContext(NetworkContext);

  function handleChange(e) {
    setNetwork(e.target.value);
  }

  return (
    <div className="dropDown-container">
      <h3>Network</h3>
    
    <div  className="select-dropdown">
      <select className="dropdown" onChange={(e) => handleChange(e)}>
        <option className="dropdown-item" value="NetworkOne">Network 1</option>
        <option className="dropdown-item" value="NetworkTwo">Network 2</option>
        <option className="dropdown-item" value="NetworkThree">Network 3</option>
      </select>
    </div>
    </div>
    
  );
}

export default NetworkDropdown;
