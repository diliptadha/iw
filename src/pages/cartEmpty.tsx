import "../app/globals.css";

import { Images, Strings } from "@/constant";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartEmpty = () => {
  return (
    <div className="max-w-screen-2xl m-auto ">
      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem]">
        <div className="flex items-center justify-between mb-9">
          <Link href={"/"}>
            <Image
              src={Images.Logo}
              alt="/"
              height={68}
              width={215}
              className="xs:w-36 md:w-[215px]"
            />
          </Link>
          <h2 className="text-[20px] font-bold ">{Strings.YOUR_CART}</h2>
        </div>
        <div className="card py-6 px-3 mb-4 shadow-box">
          <h3 className="text-center">{Strings.YOUR_CART_EMPTY}</h3>
          <div className="w-[270px] my-0 mx-auto">
            <img src={Images.ShopCart} alt="shopcart" className="w-[100%]" />
          </div>
          <h5 className="text-center text-[14px] my-4">
            {Strings.ADD_ITEMS_NOW}
          </h5>
          <Link href="/Home-screen">
            <button className="flex justify-center my-0 mx-auto text-center w-[200px] p-3 hover:bg-opacity-80 duration-200 bg-PictonBlue text-[#fff] text-[14px] rounded-[6px]">
              {Strings.SHOP_EYEGLASSES}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartEmpty;
