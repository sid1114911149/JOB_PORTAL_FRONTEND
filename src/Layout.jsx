// Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/shared/Navbar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> {/* 🔥 All pages will render here */}
    </>
  );
};

export default Layout;