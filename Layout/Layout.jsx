import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router-dom";
import "../Global_css/Layout.css";
const MainLayout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
