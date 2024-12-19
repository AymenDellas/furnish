import React from "react";
import Home from "./comps/Home";
import NavLayout from "./Layout/NavLayout";
import Cart from "./comps/Cart";
import Products from "./comps/Products";
import { useState } from "react";
import {
  createBrowserRouter,
  Routes,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const App = () => {
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<NavLayout cart={cart} setCart={setCart} />}>
        <Route path="/" element={<Home addToCart={addToCart} />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
