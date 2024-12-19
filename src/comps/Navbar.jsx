import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ cart, setCart }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCartopen, setIsCartopen] = useState(false);
  const hideShow = () => {
    setIsSidebarOpen(false);
    setIsCartopen(true);
  };

  return (
    <>
      <div className=" bg-themeAccent p-4 text-textColor border-accentHighlight drop-shadow-xl border-b-2 z-50 relative ">
        {/* large screens navbar */}
        <div className=" justify-between mx-4 lg:mx-16 items-center hidden lg:flex ">
          <div className="items-center ">
            <Link to={"/"}>
              <h1 className="font-bold text-xl">BrandName</h1>
            </Link>
          </div>
          <div className="">
            <ul className="flex text-md">
              <Link to={"/"}>
                <li className="p-2 mx-2 transition-all hover:bg-white/30 rounded-lg">
                  Home
                </li>
              </Link>
              <Link to={"/products"} onClick={() => console.log(cart)}>
                <li className="p-2 mx-2 transition-all hover:bg-white/30 rounded-lg">
                  Products
                </li>
              </Link>
            </ul>
          </div>
          <div
            className="p-2 transition-all hover:bg-white/30 rounded-lg cursor-pointer"
            onClick={() => setIsCartopen(true)}
          >
            <img src="/public/cart.svg" alt="Shopping Cart" />
          </div>
        </div>
        <div
          className={`fixed w-[70%] xl:w-[20%] min-h-screen bg-accentHighlight top-0 right-0 rounded-lg z-50 transition-all ${
            isCartopen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div
            className="ml-6 mt-8 cursor-pointer rounded-xl bg-textColor/20 w-fit p-2"
            onClick={() => setIsCartopen(false)}
          >
            <img src="/close.svg" alt="Clear Cart" />
          </div>
          <div className="flex justify-center items-center font-bold">
            {cart.length === 0 ? "cart is empty" : ""}
          </div>
          {cart.map((product) => {
            return (
              <div className="flex  mt-16 ">
                <div
                  style={{ backgroundImage: `url(${product.imageUrl})` }}
                  className="mx-8 w-32 h-32 bg-cover bg-center rounded-lg shadow-xl "
                ></div>
                <div>
                  <h1>{product.title}</h1>
                  <h1>{product.price}</h1>
                </div>
              </div>
            );
          })}
          <div className="flex justify-around items-end min-h-screen pb-[40%] p-4 xl:pb-4">
            <div className="border border-textColor rounded-lg bg-textColor/10 hover:bg-textColor/20 transition-all w-1/2 flex justify-center mx-4 p-2 cursor-pointer">
              <img
                src="/delete.svg"
                alt="Clear Cart"
                onClick={() => setCart([])}
              />
            </div>
            <div className="border border-textColor rounded-lg bg-textColor/10 hover:bg-textColor/20 transition-all w-1/2 flex justify-center mx-4 p-2 cursor-pointer">
              Checkout
            </div>
          </div>
        </div>
        {/*small screen sidebar*/}

        <div
          className={`w-[70%] h-screen fixed top-0 right-0 bg-accentHighlight  rounded-l-xl shadow-2xl text-themeAccent z-50 transition-all 
             ${isSidebarOpen ? "translate-x-0" : "translate-x-full"} `}
        >
          <img
            onClick={() => setIsSidebarOpen(false)}
            src="/public/close.svg"
            alt=""
            className="cursor-pointer absolute top-7 left-8"
          />
          <ul className="flex flex-col mt-16">
            <Link to={"/"}>
              <li className="m-4 bg-themeAccent p-4 rounded-lg text-textColor ">
                Home
              </li>
            </Link>
            <Link to={"/products"}>
              <li className="m-4 bg-themeAccent p-4 rounded-lg text-textColor ">
                Products
              </li>
            </Link>

            <li
              className="m-4 bg-themeAccent p-4 rounded-lg text-textColor cursor-pointer "
              onClick={() => hideShow()}
            >
              Cart
            </li>
          </ul>
        </div>

        <div className="relative flex lg:hidden justify-between cursor-pointer items-center  ">
          <h1 className="font-bold text-lg ">BrandName</h1>
          <img
            src="/public/menu (2).svg "
            alt=""
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="hover:bg-white/30 rounded-lg p-2"
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
