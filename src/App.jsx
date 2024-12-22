import React from "react";
import Home from "./comps/Home";
import NavLayout from "./Layout/NavLayout";
import Product from "./comps/Product";
import Products from "./comps/Products";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect } from "react";

import {
  createBrowserRouter,
  Routes,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAXs_5Xsy4Euc3On-pDO2VvG1ujuKBt8Ew",
  authDomain: "furnish-5832d.firebaseapp.com",
  projectId: "furnish-5832d",
  storageBucket: "furnish-5832d.firebasestorage.app",
  messagingSenderId: "842011303052",
  appId: "1:842011303052:web:ae54f35e0f2f79ff81efa9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const App = () => {
  const [products, setProducts] = useState([]);

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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const addToCart = (product, count) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);
      if (existingProduct) {
        const updatedCart = cart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + count } : item
        );
        setCart(updatedCart);
      } else {
        setCart([...cart, { ...product, count }]);
      }
      toast.success("Product has been added successfully!");
    } catch (error) {
      toast.error("Failed to add the product to the cart. Please try again.");
    }
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<NavLayout cart={cart} setCart={setCart} />}>
        <Route
          path="/"
          element={<Home addToCart={addToCart} db={db} />}
        ></Route>
        <Route
          path="/products/:id"
          element={
            <Product
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
              addToCart={addToCart}
              setCart={setCart}
              products={products}
            />
          }
        ></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
