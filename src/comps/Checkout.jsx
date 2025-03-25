import React, { useState, useMemo } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import supabase from "../../supabase";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Trash2,
  CreditCard,
  MapPin,
  Phone,
  User,
  Mail,
} from "lucide-react";

const Checkout = ({ cart, setCart }) => {
  const total = cart.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    status: "pending",
    cart,
    total,
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Memoized calculations
  const cartSummary = useMemo(() => {
    const total = cart.reduce(
      (acc, product) => acc + product.price * product.count,
      0
    );
    const totalItems = cart.reduce((acc, product) => acc + product.count, 0);
    return { total, totalItems };
  }, [cart]);

  // Input change handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    toast.info("Product removed from cart", {
      position: "bottom-right",
      autoClose: 2000,
    });
  };

  // Empty cart state
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 text-center">
        <ShoppingCart className="w-24 h-24 text-gray-400 mb-6" />
        <h2 className="text-3xl font-bold text-gray-700 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added any items to your cart yet.
        </p>
        <button
          onClick={() => navigate("/products")}
          className="bg-themeAccent text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const handleFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validation
    if (!formData.firstName.trim()) {
      toast.error("Please enter your first name");
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Stock and order submission logic
    try {
      // Stock check
      for (const item of cart) {
        const { data: product, error } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        if (error || !product) {
          toast.error(`Product not found: ${item.name}`);
          setIsLoading(false);
          return;
        }

        if (product.stock < item.count) {
          toast.error(`Not enough stock for ${item.name}`);
          setIsLoading(false);
          return;
        }
      }

      // Prepare order data
      const orderData = {
        ...formData,
        total: cartSummary.total,
        cart,
        status: "pending",
      };

      // Insert order
      const { error: orderError } = await supabase
        .from("orders")
        .insert(orderData);

      if (orderError) {
        toast.error("Error adding the order");
        console.error(orderError);
        setIsLoading(false);
        return;
      }

      // Update stock
      for (const item of cart) {
        const { data: product } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        if (product) {
          await supabase
            .from("products")
            .update({ stock: product.stock - item.count })
            .eq("id", item.id);
        }
      }

      toast.success("Order placed successfully!");

      // Reset and navigate
      setTimeout(() => {
        navigate("/");
        setCart([]);
      }, 3000);
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Cart Summary */}
        <div className="bg-gray-100 p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold flex items-center">
              <ShoppingCart className="mr-3 text-themeAccent" />
              Your Cart ({cartSummary.totalItems} items)
            </h2>
            <span className="text-2xl font-semibold text-themeAccent">
              ${cartSummary.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Cart Items */}
        <div className="p-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">
                    ${item.price} × {item.count}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">
                  ${(item.price * item.count).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                >
                  <Trash2 />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Checkout Form */}
        <form onSubmit={handleFormData} className="p-6 space-y-6">
          <h2 className="text-3xl font-bold text-center mb-8">
            Checkout Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                required
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full pl-10 p-4 border rounded-lg focus:ring-2 focus:ring-themeAccent"
              />
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                required
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full pl-10 p-4 border rounded-lg focus:ring-2 focus:ring-themeAccent"
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 p-4 border rounded-lg focus:ring-2 focus:ring-themeAccent"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              required
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full pl-10 p-4 border rounded-lg focus:ring-2 focus:ring-themeAccent"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              required
              value={formData.address}
              onChange={handleInputChange}
              className="w-full pl-10 p-4 border rounded-lg focus:ring-2 focus:ring-themeAccent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center items-center p-4 rounded-lg text-white transition-colors space-x-2 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-themeAccent hover:bg-opacity-90"
            }`}
          >
            {isLoading ? (
              <MoonLoader size={24} color="white" />
            ) : (
              <>
                <CreditCard className="mr-2" />
                Place Order
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
