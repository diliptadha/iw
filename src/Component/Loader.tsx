import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center">
      <div
        className="inline-block h-5 w-5 animate-spin animate-spin-fast rounded-full border-4 border-black border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_0.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

export default Loader;
