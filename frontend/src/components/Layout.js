import React, { useContext } from "react";
import MainContainer from "./MainContent/MainContainer";
import TopBar from "./NavBar/TopBar";
import "./Layout.css";

function Layout(props) {
  return (
    <div className="layout-container noMarginNoPadding">
      <TopBar />
      <MainContainer />
    </div>
  );
}

export default Layout;
