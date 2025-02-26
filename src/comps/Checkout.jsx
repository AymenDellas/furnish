import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { MoonLoader } from "react-spinners";
import supabase from "../../supabase";
import { ToastContainer } from "react-toastify";
const Checkout = ({ cart }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (cart.length === 0) {
    return (
      <div>
        How are you gonna checkout with no products in ur cart like bruh
      </div>
    );
  }

  const total = cart.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );
  const handleFormData = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    for (const item of cart) {
      const { data: product, error } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (error || !product) {
        console.error(`Product not found in database: ${item.name}`);
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

    const formData = {
      email,
      firstName,
      lastName,
      phoneNumber,
      total,
      cart,
      status: "pending",
    };

    const { error: orderError } = await supabase
      .from("orders")
      .insert(formData);
    if (orderError) {
      toast.error("Error adding the order");
      console.error(orderError);
      setIsLoading(false);
      return;
    }

    // Update stock correctly inside the loop
    for (const item of cart) {
      const { data: product } = await supabase
        .from("products")
        .select("stock")
        .eq("id", item.id)
        .single();

      if (product) {
        const { error: stockError } = await supabase
          .from("products")
          .update({ stock: product.stock - item.count })
          .eq("id", item.id);

        if (stockError) {
          console.log("Error updating stock for", item.name, stockError);
        }
      }
    }

    toast.success("Order placed successfully!");
    setIsLoading(false); // Stop loading
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col justify-center min-h-screen items-center m-4">
        <div className="text-center border-textColor/20 border p-8 rounded-lg shadow-2xl w-full max-w-lg">
          {cart.map((item) => {
            return (
              <div>
                <div className="flex justify-between">
                  <h1 className="my-2">
                    {item.name} x {item.count}
                  </h1>
                  <h1 className="my-2">
                    Subtotal : {item.price * item.count}$
                  </h1>
                </div>
              </div>
            );
          })}
          <h1 className="font-bold text-3xl my-2">Total: {total}$</h1>

          <hr />
          <h1 className="font-bold text-textColor text-3xl my-4">
            Client Informations
          </h1>
          <form onSubmit={handleFormData} className="flex flex-col ">
            <input
              className=" my-4 p-4 rounded-lg border border-textColor mx-2"
              type="text"
              placeholder="First name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className=" my-4 p-4 rounded-lg border border-textColor mx-2"
              type="text"
              placeholder="Last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <input
              className="my-4 p-4 rounded-lg border border-textColor mx-2"
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="my-4 p-4 rounded-lg border border-textColor mx-2"
              type="text"
              placeholder="Phone Number"
              required
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              type="submit"
              className={`border border-textColor p-4  text-accentHighlight hover:bg-textColor/70 transition-colors rounded-lg mt-4 ${
                isLoading ? "bg-textColor/50 " : "bg-textColor"
              }`}
            >
              {isLoading ? (
                <div className="flex justify-center">
                  <MoonLoader size={30} />
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;
