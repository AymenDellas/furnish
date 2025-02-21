import React from "react";
import { useState } from "react";
import { collection, addDoc, runTransaction, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { MoonLoader } from "react-spinners";
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
    const data = {
      email,
      firstName,
      lastName,
      phoneNumber,
      total,
      cart,
      status: "pending",
      date: new Date().toLocaleDateString(),
    };

    try {
      setIsLoading(true);
      await addDoc(collection(db, "orders"), data);
      await runTransaction(db, async (transaction) => {
        for (const item of cart) {
          const productRef = doc(db, "products", item.id);
          const productDoc = await transaction.get(productRef);
          const currentStock = productDoc.data().stock;
          if (currentStock < item.count) {
            throw new Error(`Not enough stock for ${item.name}`);
          }
          transaction.update(productRef, {
            stock: currentStock - item.count,
          });
        }
      });
      cart.length = 1;
      setIsLoading(false);

      console.log("Order placed successfully and stock updated.");
    } catch (error) {
      console.log("Error processing order:", error);
    }
  };
  return (
    <>
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
