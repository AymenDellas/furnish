import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../../firebase";
import LoadingSpinner from "./LoadingSpinner";
import ProductCard from "./ProductCard";
import Newsletter from "./Newsletter";
import Footer from "./Footer";

const Home = ({ addToCart, isLoading, products }) => {
  const [featured, setFeatured] = useState([]);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLocalLoading(true);
      try {
        const colRef = collection(db, "featured");
        const response = await getDocs(colRef);
        const productsData = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeatured(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(
          "Failed to load featured products. Please try again later."
        );
      } finally {
        setLocalLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-accentHighlight/30">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Section */}
      <section className="relative bg-themeAccent text-textColor overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center py-12 lg:py-16">
            <div className="z-10 max-w-xl">
              <h1 className="font-luxury font-bold text-4xl lg:text-7xl mb-4 py-4 bg-gradient-to-r from-textColor via-buttonBackground to-accentHighlight bg-clip-text text-transparent">
                Furnish Your Style
              </h1>
              <p className="text-lg lg:text-xl py-4 mb-8">
                Discover stylish, comfortable, and durable furniture designed to
                elevate every corner of your home. From modern minimalism to
                classic elegance, we have pieces that suit your unique style.
              </p>
              <Link
                to="/products"
                className="inline-block font-luxury font-semibold text-xl py-4 px-8 rounded-lg bg-buttonBackground text-accentHighlight hover:bg-buttonBackground/80 transition-all duration-300 shadow-lg"
                aria-label="Browse our product collection"
              >
                Shop Now
              </Link>
            </div>
            <div
              className="w-full lg:w-1/2 h-80 lg:h-96 mt-8 lg:mt-0 rounded-xl overflow-hidden shadow-2xl transform lg:translate-x-8"
              aria-hidden="true"
            >
              <img
                src="/armchar.png"
                alt="Elegant armchair from our collection"
                className="w-full h-full object-cover object-center"
                loading="eager"
              />
            </div>
          </div>
        </div>
        {/* Background gradient blob */}
        <div
          className="absolute w-full h-full top-0 left-0 opacity-20 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute w-1/2 h-1/2 bg-themeAccent/30 rounded-full blur-3xl -top-20 -right-20"></div>
          <div className="absolute w-1/2 h-1/2 bg-themeAccent/20 rounded-full blur-3xl -bottom-20 -left-20"></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 border-l-4 border-textColor pl-4 rounded-sm inline-block">
            Featured Collections
          </h2>

          {localLoading || isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 3).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          )}
        </div>
        {/* Background gradient blob */}
        <div
          className="absolute w-3/4 h-3/4 bg-themeAccent/10 rounded-full blur-3xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
          aria-hidden="true"
        ></div>
      </section>

      {/* Why Choose Us Section (New) */}
      <section className="py-16 bg-textColor/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Why Choose FurniSpace
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-themeAccent/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p>
                Furniture built to last with premium, sustainably sourced
                materials.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-themeAccent/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p>Quick and reliable delivery service to your doorstep.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-themeAccent/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">10-Year Warranty</h3>
              <p>
                Shop with confidence with our comprehensive warranty coverage.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-shadow duration-300">
              <div className="bg-themeAccent/20 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p>Multiple secure payment options for your convenience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section (New) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">
            What Our Customers Say
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 bg-buttonBackground text-accentHighlight text-4xl font-serif p-2">
                "
              </div>
              <p className="mb-4 pt-4">
                The sofa I purchased is not only beautiful but also incredibly
                comfortable. The quality exceeded my expectations!
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Sarah Johnson</p>
                  <div className="flex">
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 bg-buttonBackground text-accentHighlight text-4xl font-serif p-2">
                "
              </div>
              <p className="mb-4 pt-4">
                Fast shipping and excellent customer service. The dining table
                arrived earlier than expected and was easy to assemble.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Michael Torres</p>
                  <div className="flex">
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/half-star.svg" alt="" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md relative">
              <div className="absolute -top-4 -left-4 bg-buttonBackground text-accentHighlight text-4xl font-serif p-2">
                "
              </div>
              <p className="mb-4 pt-4">
                I've purchased multiple pieces from FurniSpace and have been
                consistently impressed with their attention to detail and
                quality.
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Emma Rodriguez</p>
                  <div className="flex">
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                    <img src="/star.svg" alt="" className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
