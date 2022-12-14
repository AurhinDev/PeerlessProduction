import React, { useState } from "react";
import MainContainer from "./MainContent/MainContainer";
import TopBar from "./NavBar/TopBar";
import "./Layout.css";

function Layout(props) {
  const connect = props.connect;
  const [connected, setConnected] = useState(false);

  function handleConnect() {
    connect()
    setConnected(true);
  }
  return (
    <div className="layout-container ">
      <TopBar />

      {connected ? (
        <MainContainer />
      ) : (
        <div className="centerInDiv connectText">
          <h2>Welcome!</h2>
          <h3>Connect to make some gnaly trades my dude. </h3>
          <button className="button-5 connectButton" onClick={handleConnect}>
            Connect
          </button>
          <p>Money lost will not be refunded.</p>
          <p>Have fun an be cool, </p>
        </div>
      )}
    </div>
  );
}

export default Layout;
