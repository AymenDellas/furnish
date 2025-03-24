import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Thanks for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="bg-textColor/5 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter for exclusive offers, interior design
          tips, and be the first to know about new arrivals.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row justify-center max-w-md mx-auto"
        >
          <div className="relative flex-grow">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full px-6 py-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-themeAccent border border-textColor/20 shadow-md"
              required
              aria-label="Email address"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-4 rounded-r-lg bg-textColor text-accentHighlight font-medium shadow-md hover:bg-textColor/90 transition-colors ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        <p className="mt-4 text-sm text-textColor/60">
          We respect your privacy and will never share your information.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
