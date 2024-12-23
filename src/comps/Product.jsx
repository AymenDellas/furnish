import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

const Product = ({ products, addToCart, isLoading }) => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (isLoading) {
    return (
      <div className="text-5xl font-bold animate-pulse flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen flex-col">
        <div className="flex items-center">
          <p className="text-2xl xl:text-4xl font-bold underline flex bg-clip-text bg-gradient-to-r  from-themeAccent drop-shadow-2xl to-black text-transparent ">
            Product not found
          </p>
          <img src="/alert.svg" alt="" />
        </div>
        <Link
          to={"/products"}
          className="my-4 p-4 rounded-lg bg-textColor text-accentHighlight hover:bg-textColor/70 transition-colors"
        >
          Go Back
        </Link>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />

      <div className=" flex items-center min-h-screen justify-center">
        <div className="flex flex-col xl:flex-row  p-8 relative">
          <div className="xl:w-1/2 shadow-xl group">
            <img
              src={product.imageUrl}
              alt=""
              className="rounded-lg group-hover:scale-[1.01] transition-all"
            />
          </div>
          <div className="xl:ml-12">
            <h1 className="font-bold text-3xl my-8">{product.name}</h1>
            <p className="text-textColor/40 underline font-bold my-8">
              {product.type}
            </p>
            <h2 className="font-bold text-xl my-8">Price : {product.price}$</h2>
            <div className="border border-textColor/40 w-fit  rounded-lg">
              <button
                onClick={() => (count > 1 ? setCount(count - 1) : "")}
                className=" hover:bg-accentHighlight p-4 border-r-2 border-textColor/20"
              >
                -
              </button>
              <span className="mx-4">Count : {count}</span>
              <button
                onClick={() => setCount(count + 1)}
                className="  hover:bg-accentHighlight p-4 border-l-2 border-textColor/20"
              >
                +
              </button>
            </div>
            <div
              onClick={() => addToCart(product, count)}
              className="flex justify-center text-center  mt-28 p-4 border  cursor-pointer hover:bg-textColor/30 transition-all border-textColor rounded-lg"
            >
              Add to cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
