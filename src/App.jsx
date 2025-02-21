import React from "react";
import Home from "./comps/Home";
import NavLayout from "./Layout/NavLayout";
import Product from "./comps/Product";
import Products from "./comps/Products";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import Checkout from "./comps/Checkout";
import { db } from "../firebase.js";
import NotFound from "./comps/NotFound";

import {
  createBrowserRouter,
  Routes,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { toast } from "react-toastify";

const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState(() => {
    const updatedStorage = localStorage.getItem("data");
    return updatedStorage ? JSON.parse(updatedStorage) : [];
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const colRef = collection(db, "products");
        const response = await getDocs(colRef);
        const productsData = response.docs.map((doc) => ({
          id: doc.id, // Include the document ID
          ...doc.data(),
        }));
        setProducts(productsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const { id } = useParams();
  const addToCart = (product, count) => {
    try {
      let updatedCart;
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + count } : item
        );
      } else {
        updatedCart = [...cart, { ...product, count }];
      }
      setCart(updatedCart);

      toast.success("Product has been added successfully!");
    } catch (error) {
      toast.error("Failed to add the product to the cart. Please try again.");
    }
  };
  useEffect(() => {
    // Update localStorage whenever the cart changes
    localStorage.setItem("data", JSON.stringify(cart));
  }, [cart]);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="*" element={<NotFound />}></Route>
        <Route path="" element={<NavLayout cart={cart} setCart={setCart} />}>
          <Route
            path="/"
            element={<Home addToCart={addToCart} db={db} />}
          ></Route>
          <Route
            path="/products/:id"
            element={
              <Product
                isLoading={isLoading}
                products={products}
                addToCart={addToCart}
                setCart={setCart}
              />
            }
          ></Route>
          <Route
            path="/products"
            element={
              <Products
                isLoading={isLoading}
                addToCart={addToCart}
                setCart={setCart}
                products={products}
              />
            }
          ></Route>
          <Route path="/checkout" element={<Checkout cart={cart} />}></Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
