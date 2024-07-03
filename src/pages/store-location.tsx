import "../app/globals.css";

import React, { useEffect, useState } from "react";

import { Footer } from "@/Component/footer";
import Header from "@/Component/header";
import Image from "next/image";
import { Images } from "@/constant";
import Link from "next/link";
import StarRating from "./StarRating";
import axios from "axios";

interface storeData {
  id: string;
  title: string;
  description: string;
  address: string;
  hours: string;
  number: number;
  rating: number;
  isVisible: boolean;
  createdAt: string;
  updatedAt: string;
  image: string;
}

const StoreLocation = () => {
  const [search, setSearch] = useState("");
  const [storeData, setStoreData] = useState<storeData[]>([]);

  const fetchStoreLocation = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}home/getStoreLocation`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      setStoreData(response.data.storeData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStoreLocation();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    if (hash && storeData.length > 0) {
      console.log(`Scrolling to element with ID: ${hash}`);
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          const headerOffset = 9 * 9;
          const elementPosition = element.offsetTop - headerOffset;
          console.log(
            `Element found, scrolling to position: ${elementPosition}`
          );
          window.scrollTo({
            top: elementPosition,
            behavior: "smooth",
          });
        } else {
          console.log("Element not found");
        }
      }, 100);
    }
  }, [storeData]);

  return (
    <>
      <div className="">
        <Header setSearch={setSearch} />
      </div>
      <div className=" px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] ">
        {storeData.length > 0 ? (
          storeData.map((ele, index) => (
            <div
              id={
                ele.id === "66741a679b461fcecbe847fe"
                  ? "dadar"
                  : ele.id === "66741a469b461fcecbe847fd"
                  ? "andheri"
                  : ele.id === ""
                  ? "juhu"
                  : ele.id === "66741a859b461fcecbe847ff"
                  ? "kemps-corner"
                  : ""
              }
              key={index}
              className="border shadow-md rounded-[10px] mb-[15px] lg:max-w-[80%] md:max-w-[90%] xl:max-w-[70%] md:mt-0 md:mx-auto flex-wrap md:flex-none text-justify tracking-[0.5px] text-[12px] md:text-[15px] p-[20px] flex lg:transition-transform lg:hover:scale-105 lg:transform"
              style={{ scrollMarginTop: "5rem" }}
            >
              <div className="md:w-[250px] md:h-[250px] h-[220px] w-[100%] md:mr-[20px] mb-[10px] lg:mb-0">
                <img
                  src={ele.image}
                  alt="shopImage"
                  className="w-[100%] h-[100%] rounded-[4px] object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="mb-[15px] font-bold flex justify-between items-center ">
                  <h2 className="text-[15px] md:text-[18px] lg:text-[20px]">
                    {ele.title}
                  </h2>
                  <div className="flex items-center gap-[2px]">
                    <StarRating rating={ele.rating} />
                  </div>
                </div>
                <h3 className="mb-[6px] md:mb-[16px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
                  {ele.address}
                </h3>
                <h4 className="mb-[10px] md:mb-[20px] md:text-[14px] lg:text-[16px] xl:text-[18px]">
                  {ele.hours}
                </h4>
                <div className="flex gap-[10px] mb-[20px] items-center">
                  <Image
                    src={Images.PHONE_LOGO_BLUE}
                    width={20}
                    height={20}
                    alt="PhoneIcon"
                    className="h-[20px] w-[20px]"
                  />
                  <Link
                    href={`tel:-${ele.number}`}
                    className="underline text-[#000000] hover:text-[#42b7e9] md:text-[14px] lg:text-[16px] xl:text-[18px]"
                  >
                    +91 {ele.number}
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <Footer />
    </>
  );
};

export default StoreLocation;
