import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Products = ({ setCart, addToCart }) => {
  const featured = [
    {
      title: "Modern Linen Sofa",
      imageUrl: "/src/assets/cosy-sofa.png",
      price: "899.00",
      isBestSeller: false,
      type: "Living Room", // Functional type
      rating: "(4.8)",
    },
    {
      title: "Luxury Accent Chair",
      imageUrl: "/src/assets/accent-chair.png",
      price: "499.00",
      isBestSeller: false,
      type: "Seating", // Functional type
      rating: "(4.6)",
    },
    {
      title: "Minimalist Round Mirror",
      imageUrl: "/src/assets/mirror.png",
      price: "199.00",
      isBestSeller: true,
      type: "Decor", // Functional type
      rating: "(4.7)",
    },
    {
      title: "Modern Linen Sofa",
      imageUrl: "/src/assets/cosy-sofa.png",
      price: "2199.00",
      isBestSeller: false,
      type: "Living Room", // Functional type
      rating: "(4.8)",
    },
    {
      title: "Luxury Accent Chair",
      imageUrl: "/src/assets/accent-chair.png",
      price: "299.00",
      isBestSeller: false,
      type: "Seating", // Functional type
      rating: "(4.6)",
    },
    {
      title: "Minimalist Round Mirror",
      imageUrl: "/src/assets/mirror.png",
      price: "350.00",
      isBestSeller: true,
      type: "Decor", // Functional type
      rating: "(4.7)",
    },
    {
      title: "Modern Linen Sofa",
      imageUrl: "/src/assets/cosy-sofa.png",
      price: "750.00",
      isBestSeller: false,
      type: "Living Room", // Functional type
      rating: "(4.8)",
    },
    {
      title: "Luxury Accent Chair",
      imageUrl: "/src/assets/accent-chair.png",
      price: "699.00",
      isBestSeller: false,
      type: "Seating", // Functional type
      rating: "(4.6)",
    },
    {
      title: "Minimalist Round Mirror",
      imageUrl: "/src/assets/mirror.png",
      price: "99.99",
      isBestSeller: true,
      type: "Decor", // Functional type
      rating: "(4.7)",
    },
  ];

  const [order, setOrder] = useState("");
  const sortedFeatured = [...featured].sort((a, b) => {
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
        <div className="flex justify-between my-[5%]">
          <div className="font-bold text-lg">
            Showing {sortedFeatured.length} items
          </div>
          <div>
            <select
              onChange={(e) => setOrder(e.target.value)}
              value={order}
              className="w-[70%] p-2 rounded-lg bg-themeAccent text-textColor"
            >
              <option value="Default sort">Defaul sort</option>
              <option value="asc">Sort by price (low to high)</option>
              <option value="desc">Sort by price (high to low)</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4  relative ">
          {sortedFeatured.map((feature, index) => {
            return (
              <>
                <div className="flex flex-col items-center mb-8 justify-center px-8 group">
                  <div className=" ">
                    <div
                      className="bg-cover bg-center w-36 h-36 lg:w-[250px] lg:h-[250px] border relative  rounded-md border-textColor shadow-2xl hover:scale-[1.01] transition-transform"
                      style={{
                        backgroundImage: `url(${feature.imageUrl})`,
                      }}
                    >
                      {feature.isBestSeller ? (
                        <div className="absolute top-2 right-2 bg-textColor/70 px-3 py-1 rounded-lg text-accentHighlight">
                          Best Seller
                        </div>
                      ) : (
                        ""
                      )}
                      <div
                        onClick={() => {
                          addToCart(feature);
                          toast.success(
                            "The product has been added successfuly"
                          );
                        }}
                        className="cursor-pointer hover:bg-textColor/50 w-fit m-2 rounded-full bg-textColor/10 p-2 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <img src="/cart.svg " alt="" className="" />
                      </div>
                    </div>
                    <p className="my-2 text-textColor/40 underline">
                      {feature.type}
                    </p>
                    <div className="flex justify-between items-center my-2 text-textColor">
                      <h1 className=" font-bold ">{feature.title}</h1>
                      <h3>{feature.price}$</h3>
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
