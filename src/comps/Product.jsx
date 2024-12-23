import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const Product = ({ products, addToCart, isLoading }) => {
  const [count, setCount] = useState(1);
  const { id } = useParams();
  const product = products.find((item) => item.id === id);

  if (!product) {
    return <p>Product not found!</p>;
  }
  return (
    <>
      <ToastContainer />
      {isLoading ? (
        <div>test</div>
      ) : (
        <div className=" flex items-center min-h-screen justify-center">
          <div className="flex flex-col xl:flex-row border border-textColor p-8 relative">
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
              <h2 className="font-bold text-xl my-8">
                Price : {product.price}$
              </h2>
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
      )}
    </>
  );
};

export default Product;
