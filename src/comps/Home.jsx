import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const Home = ({ addToCart }) => {
  const featured = [
    {
      title: "Modern Linen Sofa",
      imageUrl: "/src/assets/cosy-sofa.png",
      price: "$899.00",
      isBestSeller: false,
      type: "Living Room", // Functional type
      rating: "(4.8)",
    },
    {
      title: "Luxury Accent Chair",
      imageUrl: "/src/assets/accent-chair.png",
      price: "$499.00",
      isBestSeller: false,
      type: "Seating", // Functional type
      rating: "(4.6)",
    },
    {
      title: "Minimalist Round Mirror",
      imageUrl: "/src/assets/mirror.png",
      price: "$199.00",
      isBestSeller: true,
      type: "Decor", // Functional type
      rating: "(4.7)",
    },
  ];

  return (
    <>
      <ToastContainer />
      <div className="bg-accentHighlight/30">
        <div className="min-h-1/2 bg-themeAccent text-textColor z-0 ">
          <div className="flex flex-col lg:flex-row lg:justify-between min-h-1/2 lg:ml-12 2xl:ml-36 items-center pt-8 lg:pt-0 ">
            {/* Added a background div that covers 40% of the width */}
            {/* <div className="xl:absolute xl:top-0 xl:right-0 xl:h-full xl:w-[40%] xl:bg-accentHighlight xl:z-0"></div> */}

            <div className="z-10 ml-4 ">
              <h1 className="font-luxury font-bold text-4xl lg:text-7xl mb-4 py-4 bg-gradient-to-r from-textColor via-buttonBackground to-accentHighlight bg-clip-text text-transparent  ">
                Furnish Your Style
              </h1>
              <p className="text-lg lg:text-xl py-4 ">
                Discover stylish, comfortable, and durable furniture designed to
                elevate every corner of your home. From modern minimalism to
                classic elegance, we have pieces that suit your unique style.
              </p>
              <button className="font-luxury font-smibold text-xl mt-12 py-4 px-6 rounded-lg bg-buttonBackground text-accentHighlight hover:bg-buttonBackground/40 transition-all">
                Shop Now
              </button>
            </div>
            <div
              className="sofa w-full lg:w-[1400px] relative z-10  h-96 bg-accentHighlight  mt-4 lg:mt-0 bg-cover bg-center py-80"
              style={{ backgroundImage: `url("/armchar.png")` }}
            ></div>
          </div>
        </div>
        <div className=" flex  justify-center ">
          <h1 className="text-bold text-3xl my-16 border-l-4 h-fit border-textColor pl-2 rounded-sm">
            Featured
          </h1>
        </div>
        <div className="absolute w-[40%] h-[90%] blur-3xl rounded-full bg-themeAccent/20 mt-[15%] left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        ;
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mx-[10%] relative ">
          {featured.map((feature) => {
            return (
              <>
                <div className="flex flex-col items-center mb-8 justify-center group">
                  <div className=" ">
                    <div
                      className="bg-cover bg-center w-72 h-72 lg:w-[350px] lg:h-[350px] border relative  rounded-md border-textColor shadow-2xl hover:scale-[1.01] transition-all"
                      style={{ backgroundImage: `url("${feature.imageUrl}")` }}
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
                      <h3>{feature.price}</h3>
                    </div>
                    <div className="flex items-center">
                      <div className="flex space-x-1">
                        <img src="/src/assets/star.svg" alt="Star" />
                        <img src="/src/assets/star.svg" alt="Star" />
                        <img src="/src/assets/star.svg" alt="Star" />
                        <img src="/src/assets/star.svg" alt="Star" />
                        <img src="/src/assets/half-star.svg" alt="Half Star" />
                      </div>
                      <div className="ml-4 text-textColor">
                        <span>{feature.rating}</span>
                      </div>
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

export default Home;
