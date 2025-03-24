import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-textColor"></div>
      <span className="ml-4 text-lg font-medium">Loading products...</span>
    </div>
  );
};

export default LoadingSpinner;
