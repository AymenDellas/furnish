import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";

const Products = ({ addToCart, products = { products } }) => {
  const [order, setOrder] = useState("");
  const [filter, setFilter] = useState("");
  const filteredProducts = products.filter((item) => {
    switch (filter) {
      case "sofas":
        return item.type === "living room";

      case "chairs":
        return item.type === "seating";
      case "mirrors":
        return item.type === "decor";

      default:
        return item;
        break;
    }
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (order === "asc") {
      return a.price - b.price;
    } else if (order === "desc") {
      return b.price - a.price;
    }
  });

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-between mx-[10%] ">
        <div className="flex justify-between relative my-12 items-center">
          <div className="font-bold text-lg">
            Showing {sortedProducts.length} items
          </div>
          <div>
            <select
              onChange={(e) => setOrder(e.target.value)}
              value={order}
              className="w-[70%] float-right p-2 rounded-lg bg-themeAccent text-textColor"
            >
              <option value="Default sort">Defaul sort</option>
              <option value="asc">Sort by price (low to high)</option>
              <option value="desc">Sort by price (high to low)</option>
            </select>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              className="w-[70%] float-right p-2 rounded-lg my-4 bg-themeAccent text-textColor"
            >
              <option value="Default filter">All</option>
              <option value="sofas">Sofas</option>
              <option value="chairs">Accent Chairs</option>
              <option value="mirrors">Mirrors</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-4  relative ">
          {sortedProducts.map((product, index) => {
            return (
              <>
                <div className="flex flex-col items-center mb-8 justify-center px-8 group">
                  <div className=" ">
                    <Link to={`/products/${product.id}`}>
                      <div
                        className="bg-cover bg-center w-80 h-80 xl:w-[250px] xl:h-[250px] border relative  rounded-md border-textColor shadow-2xl hover:scale-[1.01] transition-transform"
                        style={{
                          backgroundImage: `url(${product.imageUrl})`,
                        }}
                      >
                        {product.isBestSeller ? (
                          <div className="absolute top-2 right-2 bg-textColor/70 px-3 py-1 rounded-lg text-accentHighlight">
                            Best Seller
                          </div>
                        ) : (
                          ""
                        )}
                        <div
                          onClick={() => {
                            addToCart(product);
                            toast.success(
                              "The product has been added successfuly"
                            );
                          }}
                          className="cursor-pointer hover:bg-textColor/50 w-fit m-2 rounded-full bg-textColor/10 p-2 transition-all opacity-0 group-hover:opacity-100"
                        >
                          <img src="/cart.svg " alt="" className="" />
                        </div>
                      </div>
                    </Link>
                    <p className="my-2 text-textColor/40 underline">
                      {product.type}
                    </p>
                    <div className="flex justify-between items-center my-2 text-textColor w-80  lg:w-[250px] ">
                      <h1 className=" font-bold w-1/2 ">{product.name}</h1>
                      <h3>{product.price}$</h3>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
