import Image from "next/image";
import { Images } from "@/constant";
import PuffLoader from "react-spinners/PuffLoader";
import React from "react";

const MainLoader = () => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-white bg-opacity-50 backdrop-blur-sm">
      <PuffLoader
        color="#42B7E9"
        size={132}
        speedMultiplier={1}
        className="relative"
      />
      <div className="absolute">
        <Image
          src={Images.Logo}
          alt="Loading"
          height={28}
          width={200}
          className="h-[30px] w-[100px]"
        />
      </div>
    </div>
  );
};

export default MainLoader;
