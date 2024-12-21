import React from "react";
import Home from "./comps/Home";
import NavLayout from "./Layout/NavLayout";
import Product from "./comps/Product";
import Products from "./comps/Products";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  createBrowserRouter,
  Routes,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

const App = () => {
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const addToCart = (product) => {
    setCart([...cart, product]);
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<NavLayout cart={cart} setCart={setCart} />}>
        <Route path="/" element={<Home addToCart={addToCart} />}></Route>
        <Route path="/:id" element={<Product />}></Route>
        <Route
          path="/products"
          element={<Products addToCart={addToCart} setCart={setCart} />}
        ></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
