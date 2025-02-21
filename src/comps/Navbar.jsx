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
  const totalPrice = cart.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );

  return (
    <>
      <div className="mb-28">
        <div className="fixed top-4 left-0 right-0 mx-auto w-[90%] max-w-[1200px] bg-transparent p-4 backdrop-blur-2xl rounded-2xl shadow-lg z-50 ">
          {/* large screens navbar */}
          <div className=" justify-between mx-4  items-center hidden lg:flex">
            <div className="items-center ">
              <Link to={"/"}>
                <h1 className="font-extrabold text-3xl font-luxury">
                  FurniSpace
                </h1>
              </Link>
            </div>
            <div className="">
              <ul className="flex text-md ">
                <Link to={"/"} className="relative">
                  <li className="p-2 mx-2 transition-all before:content-[''] before:absolute before:w-0 hover:before:w-[50px] before:transition-all before:duration-300 before:ease-out before:h-0.5 before:bg-gradient-to-r before:from-themeAccent before:via-black before:to-themeAccent  before:bottom-0 rounded-lg">
                    Home
                  </li>
                </Link>
                <Link to={"/products"} className="relative w-fit">
                  <li className="p-2 mx-2 transition-all  rounded-lg before:content-[''] before:absolute before:w-0 hover:before:w-[75px] before:transition-all before:duration-300 before:ease-out before:h-0.5 before:bg-gradient-to-r before:from-themeAccent before:via-black before:to-themeAccent  before:bottom-0">
                    Products
                  </li>
                </Link>
              </ul>
            </div>
            <div
              className="p-2 transition-all hover:bg-textColor/10 rounded-lg cursor-pointer"
              onClick={() => setIsCartopen(true)}
            >
              <img src="/cart.svg" alt="Shopping Cart" />
            </div>
          </div>

          {/*small screen sidebar*/}

          <div className="relative flex lg:hidden justify-between cursor-pointer items-center  ">
            <h1 className="font-bold text-2xl font-luxury ">FurniSpace</h1>
            <img
              src="/menu (2).svg "
              alt=""
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hover:bg-white/30 rounded-lg p-2"
            />
          </div>
        </div>
      </div>

      {/*sidebar */}
      <div
        className={`w-[70%] h-screen fixed top-0 right-0 bg-accentHighlight  rounded-l-xl shadow-2xl text-themeAccent z-50 transition-all
             ${isSidebarOpen ? "block" : "hidden"} `}
      >
        <img
          onClick={() => setIsSidebarOpen(false)}
          src="/close.svg"
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
      {/* cart*/}
      <div
        className={`fixed w-full lg:w-[50%] xl:w-[30%] min-h-screen bg-accentHighlight top-0 right-0 rounded-lg z-50 transition-all ${
          isCartopen ? "block" : "hidden"
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
          const singleTotal = product.price * product.count;
          return (
            <div className="flex mt-16 relative" key={product.id}>
              <div
                style={{ backgroundImage: `url(${product.imageUrl})` }}
                className="mx-8 w-32 h-32 bg-cover bg-center rounded-lg shadow-xl"
              ></div>
              <div>
                <h1 className="my-2 font-bold">{product.name}</h1>
                <h1 className="my-2">Price : {singleTotal}$</h1>
                <h1 className="my-2">Count :{product.count}</h1>
                <img
                  onClick={() =>
                    setCart(cart.filter((item) => item.id !== product.id))
                  }
                  src="/delete.svg"
                  alt="Delete Item"
                  className="absolute right-10 bottom-0 cursor-pointer"
                />
              </div>
              ;
            </div>
          );
        })}
        {cart.length > 0 ? (
          <div>
            <div className="flex justify-around items-end mt-8 p-4 xl:pb-4">
              <div
                onClick={() => setCart([])}
                className="border border-textColor rounded-lg bg-textColor/10 hover:bg-textColor/20 transition-all w-1/2 flex justify-center mx-4 p-2 cursor-pointer"
              >
                <img src="/delete.svg" alt="Clear Cart" />
              </div>
              <Link
                onClick={() => setIsCartopen(false)}
                to={"/checkout"}
                className="border border-textColor rounded-lg bg-textColor/10 hover:bg-textColor/20 transition-all w-1/2 flex justify-center mx-4 p-2 cursor-pointer"
              >
                Checkout
              </Link>
            </div>
            <h1 className="text-center font-bold my-4 text-xl">
              Total price : {totalPrice}$
            </h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Navbar;
