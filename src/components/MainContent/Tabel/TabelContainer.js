import React, { useContext, useEffect, useState } from "react";
import { NetworkContext, CurrencyContext } from "../../../helper/Context";
import "./TabelContainer.css";
import Slider from "../../Features/Slider";
import Modal from "../../Features/Modal";
function TabelContainer(props) {
  let orders = [
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    },
    {
      owner: "0xf39Fd6e521aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "456" },
      token: { value: "456" },
      buyToken: false,
      datecreated: { value: "4" },
    },
    {
      owner: "0xf39Fd6e23aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "789" },
      token: { value: "789" },
      buyToken: true,
      datecreated: { value: "456" },
    },
    {
      owner: "0xf39Fd6e23aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "789" },
      token: { value: "789" },
      buyToken: false,
      datecreated: { value: "123" },
    },
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    },
    {
      owner: "0xf39Fd6e521aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "456" },
      token: { value: "456" },
      buyToken: false,
      datecreated: { value: "4" },
    },
    {
      owner: "0xf39Fd6e23aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "789" },
      token: { value: "789" },
      buyToken: true,
      datecreated: { value: "456" },
    },
    {
      owner: "0xf39Fd6e23aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "789" },
      token: { value: "789" },
      buyToken: false,
      datecreated: { value: "123" },
    },
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    ,
    {
      owner: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      filled: false,
      cancelled: false,
      evmCurrency: { value: "123" },
      token: { value: "123" },
      buyToken: true,
      datecreated: { value: "1232" },
    }
    
    
    
  ];
  const { network, setNetwork } = useContext(NetworkContext);
  const { currency, setCurrency } = useContext(CurrencyContext);
  const [allTabel, setAllTabel] = useState(true);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState("");

  const [allOrders, setAllOrders] = useState(orders);
  const [currentSort, setCurrentSort] = useState("index");
  const [sortInvert, setSortInvert] = useState(false);

  allOrders.forEach((item, index) => {
    item["id"] = index;
  });

  const sortTypes = {
    index: {
      class: "index",
      fn: (a, b) => a.id - b.id,
    },
    type: {
      class: "type",
      fn: (a, b) => a.buyToken - b.buyToken,
    },
    currency1: {
      class: "currency1",
      fn: (a, b) => a.evmCurrency.value - b.evmCurrency.value,
    },
    currency2: {
      class: "currency2",
      fn: (a, b) => a.token.value - b.token.value,
    },
    date: {
      class: "date",
      fn: (a, b) => a.datecreated.value - b.datecreated.value,
    },
    indexInverted: {
      class: "index",
      fn: (a, b) => b.id - a.id,
    },
    typeInverted: {
      class: "type",
      fn: (a, b) => b.buyToken - a.buyToken,
    },
    currency1Inverted: {
      class: "currency1",
      fn: (a, b) => b.evmCurrency.value - a.evmCurrency.value,
    },
    currency2Inverted: {
      class: "currency2",
      fn: (a, b) => b.token.value - a.token.value,
    },
    dateInverted: {
      class: "date",
      fn: (a, b) => b.datecreated.value - a.datecreated.value,
    },
  };

  const networkAbbreviations = {
    Ethereum: "ETH",
    Polygon: "MATIC",
    Avalanche: "AVAX",
  };

  function handelModal(e) {
    setConfirmOrder(true);
    setSelectedOrder(e.target.getAttribute("data-id"));

  }

  function handleSortId(e) {
    if (sortInvert) {
      setCurrentSort("index");
    } else setCurrentSort("indexInverted");
    setSortInvert((prevState) => !prevState);
  }
  function handleSortType(e) {
    if (sortInvert) {
      setCurrentSort("type");
    } else setCurrentSort("typeInverted");
    setSortInvert((prevState) => !prevState);
  }

  function handleSortCurrency1(e) {
    if (sortInvert) {
      setCurrentSort("currency1");
    } else setCurrentSort("currency1Inverted");
    setSortInvert((prevState) => !prevState);
  }
  function handleSortCurrency2(e) {
    if (sortInvert) {
      setCurrentSort("currency2");
    } else setCurrentSort("currency2Inverted");
    setSortInvert((prevState) => !prevState);
  }
  function handleSortDate(e) {
    if (sortInvert) {
      setCurrentSort("date");
    } else setCurrentSort("dateInverted");
    setSortInvert((prevState) => !prevState);
  }

  console.dir(currency[12].name)
  return (
    <div className="TabelContainer-container">
      {confirmOrder ? (
        <Modal setConfirmOrder={setConfirmOrder} order={selectedOrder} />
      ) : null}
      <div className="header-info">
        {!allTabel ? (
          <div className="header-info-title">
            <h2> MY ORDERS</h2>
            <h5>Orderes I've created</h5>
          </div>
        ) : (
          <div className="header-info-title">
            <h2>ALL ORDERS</h2>
            <h5>All contract available in the network</h5>
          </div>
        )}

        <Slider
          width={"10%"}
          value1={"All"}
          value2={"My"}
          background1={"var(--highlight1)"}
          background2={"var(--highlight1)"}
          state={setAllTabel}
        />
      </div>
      <div className="TabelContainer-scrollable standardShadow">
        <table className="TabelContainer-tabel ">
          <thead>
            <tr className="TabelContainer-first-row">
              <th onClick={handleSortId}>ID</th>
              <th onClick={handleSortType}>TYPE</th>
              <th onClick={handleSortCurrency1}>{currency[12].name}</th>
              <th onClick={handleSortCurrency2}>
                {networkAbbreviations[network]}
              </th>
              <th onClick={handleSortDate}>DATE</th>
              {!allTabel ? <th>CANCEL</th> : null}
            </tr>
          </thead>
          <tbody>
            {[...allOrders].sort(sortTypes[currentSort].fn).map((item) => {
              if (!item.cancelled & !item.filled) {
                const tabelindex = item.id + 1;
                const buy = item.buyToken;
                const token = item.token.value;
                const evmCurrency = item.evmCurrency.value;
                const date = item.datecreated.value;

                return (
                  <tr
                    onClick={handelModal}
                    className="TabelContainer-row"
                    key={item.id}
                    value={item.id}
                  >
                    <td data-id={item.id} index={tabelindex}>
                      {tabelindex}
                    </td>
                    {buy ? (
                      <td data-id={item.id} className="TabelContainer-row-type">
                        <span
                          data-id={item.id}
                          className="TabelContainer-buyAndSell"
                          style={{
                            backgroundColor: "var(--backgroundGreen)",
                          }}
                        >
                          {" "}
                          BUY
                        </span>
                      </td>
                    ) : (
                      <td data-id={item.id} className="TabelContainer-row-type">
                        <span
                          data-id={item.id}
                          className="TabelContainer-buyAndSell"
                          style={{ backgroundColor: "var(--backgroundRed)" }}
                        >
                          {" "}
                          SELL
                        </span>
                      </td>
                    )}
                    <td data-id={item.id}>{token}</td>
                    <td data-id={item.id}>{evmCurrency}</td>
                    <td data-id={item.id}>{date}</td>
                    {!allTabel ? (
                      <td data-id={item.id}>
                        <button className="button-5 TabelContainer-cancel">
                          Cancel
                        </button>
                      </td>
                    ) : null}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TabelContainer;
