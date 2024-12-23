import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <div className="flex items-center">
          <h1 className="font-bold text-8xl xl:text-9xl bg-clip-text bg-gradient-to-r  from-themeAccent drop-shadow-2xl to-black text-transparent">
            404{" "}
          </h1>
          <img src="/alert.svg" alt="" className="w-32 xl:w-40" />
        </div>
        <h1 className="my-4 text-3xl  text-textColor/90 underline">
          This page doesn't exist
        </h1>
        <Link
          to={"/"}
          className="my-4 p-4 rounded-lg bg-textColor text-accentHighlight hover:bg-textColor/70 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </>
  );
};

export default NotFound;
