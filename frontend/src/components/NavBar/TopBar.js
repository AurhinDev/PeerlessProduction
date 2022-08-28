import React from 'react';
import "./TopBar.css"
import NetworkDropdown from './NetworkDropdown';
import CurrencyDropdown from './CurrencyDropdown';

function TopBar(props) {
  return (
    <div className='TopBar-container' >
      <h3> Coola Stats 1</h3>
      <h3> Coola Stats 2</h3>
      <NetworkDropdown/>
      <CurrencyDropdown/>
    </div>
  );
}

export default TopBar;