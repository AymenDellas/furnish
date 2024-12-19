import React from "react";
import Navbar from "../comps/Navbar";
import { Outlet } from "react-router-dom";
const NavLayout = ({ cart, setCart }) => {
  return (
    <>
      <Navbar cart={cart} setCart={setCart} />
      <Outlet />
    </>
  );
};

export default NavLayout;
