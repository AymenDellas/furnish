import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <article
      className="group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Best Seller Badge */}
        {product.isBestSeller && (
          <div className="absolute top-3 right-3 bg-textColor/80 px-3 py-1 rounded-lg text-accentHighlight font-medium text-sm">
            Best Seller
          </div>
        )}

        {/* Quick Add Button */}
        <div
          className={`absolute top-3 left-3 transition-all duration-300 z-50 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleAddToCart}
            aria-label={`Add ${product.name} to cart`}
            className="bg-textColor/80 hover:bg-textColor transition-colors p-2 rounded-full text-accentHighlight shadow-lg z-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
        </div>

        {/* View Details Overlay */}
        <Link
          to={`/products/${product.id}`}
          className={`absolute inset-0 bg-textColor/10 flex items-center justify-center transition-all duration-300 ${
            isHovering ? "opacity-100" : "opacity-0"
          }`}
        >
          <span className="bg-white/90 text-textColor px-4 py-2 rounded-md font-medium transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </Link>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-textColor/60 font-medium">
            {product.type}
          </span>
          <div className="flex items-center">
            <div className="flex space-x-1">
              {[
                ...Array(Math.max(0, Math.floor(Number(product.rating) || 0))),
              ].map((_, i) => (
                <img key={i} src="/star.svg" alt="Star" className="h-4 w-4" />
              ))}

              {product.rating % 1 !== 0 && (
                <img src="/half-star.svg" alt="Half Star" className="h-4 w-4" />
              )}
            </div>
            <span className="ml-2 text-sm text-textColor/60">
              {product.rating}
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-textColor mb-1">
          {product.name}
        </h3>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-medium">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-textColor/60 line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
