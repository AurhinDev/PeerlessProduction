import React, { useContext, useEffect } from "react";
import { NetworkContext, CurrencyContext } from "../../helper/Context";
import "./Dropdown.css";

function Dropdowns(props) {
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);

  let pairings = {
    Ethereum: [
      // <- Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "INK123",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F82" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "INK123" },
        { frozen: false },
      ], // <- Token Adress on Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "INK456",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F21" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "INK456" },
        { frozen: false },
      ], // <- Token Adress on Network
    ],
    Polygon: [
      // <- Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "PINC123",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8058efe0198ae9dD7D563e1b4938Dcbc83A1F81" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "PINC123" },
        { frozen: false },
      ], // <- Token Adress on Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "PINC456",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8058efe0198ae9dD7D563e1b4928Dcbc86A1F81" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "PINC456" },
        { frozen: false },
      ],
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "PINC789",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8058efe0198ae9dD7D563e3b4938Dcbc86A1F81" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "PINC789" },
        { frozen: false },
      ], // <- Token Adress on Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "PINC901",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd3058efe0198ae9dD7D563e1b4938D32cbc86A1F81" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "PINC901" },
        { frozen: false },
      ], // <- Token Adress on Network
    ],
    Avalanche: [
      // <- Network
      [
        "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
        "0xd8058efe0198ae9dD7D563e1b4938Dcbc86A1F81",
        "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        { value: "0" },
        { value: "1661688283" },
        "LINK123",
        false,
        { owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266" },
        { peerAdr: "0xd8053efe0198ae9dD7D563e1b4938Dcbc86A1F81" },
        { tokenAdr: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" },
        { peerID: { value: "0" } },
        { dateCreated: { value: "1661688283" } },
        { name: "LINK123" },
        { frozen: false },
      ], // <- Token Adress on Network
    ],
  };

  const entries = Object.entries(pairings);
  const networkList = entries.map((item) => (
    <option value={item[0]} key={item[0]}>
      {item[0]}
    </option>
  ));

  const currencyList = pairings[network].map((item) => {
    const peerAdr = item[8].peerAdr;
    const name = item[12].name;

    return (
      <option key={peerAdr} value={name}>
        {name + " - " + peerAdr}
      </option>
    );
  });

  useEffect(() => {
    setCurrency(pairings[network][0][12].name);
  }, [network]);

  function handleNetworkChange(e) {
    setNetwork(e.target.value);
  }

  function handleCurrencyChange(e) {
    setCurrency(e.target.value);
  }

  return (
    <>
      <div className="dropDown-container">
        <h3>Network</h3>
        <div className="select-dropdown">
          <select className="dropdown" onChange={(e) => handleNetworkChange(e)}>
            {networkList}
          </select>
        </div>
      </div>
      <div className="dropDown-container">
        <h3>Currency</h3>
        <div className="select-dropdown">
          <select onChange={(e) => handleCurrencyChange(e)}>
            {currencyList}
          </select>
        </div>
      </div>
    </>
  );
}

export default Dropdowns;
