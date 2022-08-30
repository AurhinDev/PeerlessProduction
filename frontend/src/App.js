import React, { useState } from "react";
import Layout from "./components/Layout";
import { NetworkContext, CurrencyContext } from "./helper/Context";

function App() {
  const [network, setNetwork] = useState("Ethereum");
  const [currency, setCurrency] = useState(null);
  return (
    <NetworkContext.Provider value={{ network, setNetwork }}>
      <CurrencyContext.Provider value={{ currency, setCurrency }}>
      
      <div className="App">
        <Layout />
      </div>

      </CurrencyContext.Provider >
    </NetworkContext.Provider>
  );
}

export default App;
