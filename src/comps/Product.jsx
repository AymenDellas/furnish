import React, { useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  ShoppingCart,
  Star,
  Heart,
  Truck,
  Shield,
  Info,
  ArrowLeft,
} from "lucide-react";

const Product = ({ products, addToCart, isLoading }) => {
  const [count, setCount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const { id } = useParams();

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
        <div className="animate-pulse text-5xl font-bold text-gray-600">
          Loading Product...
        </div>
      </div>
    );
  }

  // Product not found
  const product = products.find((item) => String(item.id) === String(id));
  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 flex-col space-y-6 p-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-red-500 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center bg-themeAccent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            <ArrowLeft className="mr-2" /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  // Quantity control
  const handleQuantityChange = useCallback(
    (action) => {
      if (action === "increment") {
        setCount((prev) => prev + 1);
      } else if (action === "decrement" && count > 1) {
        setCount((prev) => prev - 1);
      }
    },
    [count]
  );

  // Add to cart handler
  const handleAddToCart = () => {
    if (!selectedColor) {
      toast.warning("Please select a color", {
        position: "bottom-right",
        autoClose: 2000,
      });
      return;
    }
    addToCart(product, count);
    toast.success(`${product.name} added to cart`, {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  const colorOptions = [
    { name: "Beige", hex: "#F5F5DC" },
    { name: "Gray", hex: "#808080" },
    { name: "Dark Brown", hex: "#5C4033" },
  ];

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <ToastContainer />

      <div className="grid md:grid-cols-2 gap-12 bg-white rounded-2xl shadow-2xl p-8">
        {/* Product Image */}
        <div className="relative group">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
          {product.isBestSeller && (
            <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Best Seller
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-gray-500 text-lg">{product.type}</p>
            </div>
            <div className="flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
              <Star className="text-yellow-500 fill-yellow-500" />
              <span className="font-semibold text-green-700">4.5</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-themeAccent">
            ${product.price.toFixed(2)}
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Select Color</h3>
            <div className="flex space-x-4">
              {colorOptions.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                    selectedColor === color.name
                      ? "border-themeAccent scale-110"
                      : "border-transparent hover:scale-110"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Quantity Control */}
          <div className="flex items-center space-x-4">
            <div className="border border-gray-300 rounded-lg flex items-center">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="px-4 py-2 text-xl hover:bg-gray-100"
              >
                -
              </button>
              <span className="px-6 text-lg">{count}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="px-4 py-2 text-xl hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center bg-themeAccent text-white py-4 rounded-lg hover:bg-opacity-90 transition space-x-2"
          >
            <ShoppingCart className="mr-2" />
            Add to Cart
          </button>

          {/* Product Highlights */}
          <div className="grid grid-cols-3 gap-4 text-center bg-gray-100 rounded-lg p-4">
            <div className="flex flex-col items-center">
              <Truck className="text-themeAccent mb-2" />
              <span className="text-sm">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="text-themeAccent mb-2" />
              <span className="text-sm">1-Year Warranty</span>
            </div>
            <div className="flex flex-col items-center">
              <Info className="text-themeAccent mb-2" />
              <span className="text-sm">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
