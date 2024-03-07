"use client";

import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { Fragment, useRef, useState } from "react";

import Bestsellers from "@/Component/Bestsellers";
import Customerssay from "@/Component/Customerssay";
import Frame from "@/Component/Frame";
import Frameforkids from "@/Component/Frameforkids";
import Frameformen from "@/Component/Frameformen";
import Frameforunisex from "@/Component/Frameforunisex";
import Image from "next/image";
import StarRating from "@/Component/StarRating";
import { Tab } from "@headlessui/react";
import Under500 from "@/Component/Under500";
import { useEffect } from "react";

interface FrameData {
  image: string;
  buttonText: string;
}
interface CustomerssayProps {
  image: string;
  h1: string;
  p: string;
  style?: React.CSSProperties;
}
const Homescreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndex2, setCurrentIndex2] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollStepDesktop = 650;
  const scrollStepMobile = 330;
  const containerRef2 = useRef<HTMLDivElement>(null);
  const containerRef3 = useRef<HTMLDivElement>(null);
  const scrollStep2 = 250;
  const [currIndex, setCurrIndex] = useState(0);

  const imagesData = [
    {
      image: Images.OCEAN,
      title: "OCEAN",
      descreption: "OC-12322-BROWN TORTOISE-50",
      price_: "950",
      price: "700",
      rating: 4,
    },
    {
      image: Images.OCEAN,
      title: "KADIYAM",
      descreption: "A-25172-PINK_GOLD-52-1",
      price_: "900",
      price: "650",
      rating: 3.5,
    },
    {
      image: Images.OCEAN,
      title: "PRATA",
      descreption: "6604-GOLDEN_BROWN-51-1",
      price_: "950",
      price: "600",
      rating: 5,
    },
  ];

  const handleNext2 = () => {
    setCurrIndex((prevIndex) => (prevIndex + 1) % imagesData.length);
  };
  const handlePrev2 = () => {
    setCurrIndex((prevIndex) => (prevIndex - 1) % imagesData.length);
  };

  const currentItem = imagesData[currIndex];

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollRight = () => {
    if (containerRef.current) {
      const step =
        window.innerWidth >= 768 ? scrollStepDesktop : scrollStepMobile;
      containerRef.current.scrollBy({
        left: step,
        behavior: "smooth",
      });
      setVisibleIndex((prevIndex) =>
        prevIndex < CustomerData.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  const handleScrollLeft = () => {
    if (containerRef.current) {
      const step =
        window.innerWidth >= 768 ? scrollStepDesktop : scrollStepMobile;
      containerRef.current.scrollBy({
        left: -step,
        behavior: "smooth",
      });
      setVisibleIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const images = [Images.United, Images.United, Images.United];
  const images2 = [
    Images.iksanabanner2,
    Images.iksanabanner2,
    Images.iksanabanner2,
  ];
  const framesforwomen = [
    {
      image: Images.frame1,
      buttonText: "EYEGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/eyeglasses/women",
    },
    {
      image: Images.frame2,
      buttonText: "SUNGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/sunglasses/women",
    },
    {
      image: Images.frame3,
      buttonText: "CONTACT LENS",
      buttonUrl: "https://www.iksanaopticals.com/contact-lens/women",
    },
    {
      image: Images.frame4,
      buttonText: "READING GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/reading-glasses/women",
    },
    {
      image: Images.frame5,
      buttonText: "COMPUTER GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/computer-glasses/women",
    },
  ];
  const framesformen = [
    {
      image: Images.menframe,
      buttonText: "EYEGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/eyeglasses/men",
    },
    {
      image: Images.menframe,
      buttonText: "SUNGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/sunglasses/men",
    },
    {
      image: Images.menframe,
      buttonText: "CONTACT LENS",
      buttonUrl: "https://www.iksanaopticals.com/contact-lens/men",
    },
    {
      image: Images.menframe,
      buttonText: "READING GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/reading-glasses/men",
    },
    {
      image: Images.menframe,
      buttonText: "COMPUTER GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/computer-glasses/men",
    },
  ];
  const framesforunisex = [
    {
      image: Images.kidsframe1,
      buttonText: "EYEGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/eyeglasses/unisex",
    },
    {
      image: Images.Unisexframe2,
      buttonText: "SUNGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/sunglasses/unisex",
    },
    {
      image: Images.Unisexframe1,
      buttonText: "CONTACT LENS",
      buttonUrl: "https://www.iksanaopticals.com/contact-lens/unisex",
    },
    {
      image: Images.Unisexframe2,
      buttonText: "READING GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/reading-glasses/unisex",
    },
    {
      image: Images.kidsframe1,
      buttonText: "COMPUTER GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/computer-glasses/unisex",
    },
  ];
  const framesforkids = [
    {
      image: Images.kidsframe2,
      buttonText: "EYEGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/eyeglasses/kids",
    },
    {
      image: Images.kidsframe2,
      buttonText: "SUNGLASSES",
      buttonUrl: "https://www.iksanaopticals.com/sunglasses/kids",
    },
    {
      image: Images.kidsframe2,
      buttonText: "CONTACT LENS",
      buttonUrl: "https://www.iksanaopticals.com/contact-lens/kids",
    },
    {
      image: Images.kidsframe2,
      buttonText: "READING GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/reading-glasses/kids",
    },
    {
      image: Images.kidsframe2,
      buttonText: "COMPUTER GLASSES",
      buttonUrl: "https://www.iksanaopticals.com/computer-glasses/kids",
    },
  ];
  const CustomerData = [
    {
      id: 0,
      rating: 3.5,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      id: 1,
      rating: 3,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      id: 2,
      rating: 4.5,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      id: 3,
      rating: 3,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      id: 4,
      rating: 2.5,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
    {
      id: 5,
      rating: 4,
      h1: "NAME SURNAME",
      p: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate.",
    },
  ];
  const Under500products = [
    {
      image: Images.product1,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      rating: 4,
      price: "499",
    },
    {
      image: Images.product2,
      title: "KADIYAM",
      description: "65003-MATTEBLACK_SILVER-52-1",
      rating: 3.5,
      price: "350",
    },
    {
      image: Images.product3,
      title: "KADIYAM ",
      description: "70029-18-BROWN-50-1",
      rating: 2,
      price: "450",
    },
    {
      image: Images.product4,
      title: "K_D ",
      description: "17140-CY-MAROON_SILVER-49-1",
      rating: 5,
      price: "500",
    },
    {
      image: Images.product5,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 4,
      price: "400",
    },
    {
      image: Images.product1,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 3.5,
      price: "400",
    },
    {
      image: Images.product1,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 4.5,
      price: "400",
    },
  ];
  const Bestsellerproducts = [
    {
      image: Images.product1,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      rating: 4,
      price: "499",
    },
    {
      image: Images.product2,
      title: "KADIYAM",
      description: "65003-MATTEBLACK_SILVER-52-1",
      rating: 5,
      price: "350",
    },
    {
      image: Images.product3,
      title: "KADIYAM ",
      description: "70029-18-BROWN-50-1",
      rating: 3.5,
      price: "450",
    },
    {
      image: Images.product4,
      title: "K_D ",
      description: "17140-CY-MAROON_SILVER-49-1",
      rating: 4,
      price: "500",
    },
    {
      image: Images.product5,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 2.5,
      price: "400",
    },
    {
      image: Images.product1,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 4,
      price: "400",
    },
    {
      image: Images.product1,
      title: "K_D ",
      description: "A-25172-PINK_GOLD-52-1",
      rating: 3.5,
      price: "400",
    },
  ];

  const handleScrollRight2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const maxScrollRight = containerWidth - containerScrollWidth;

      if (scrollPosition < maxScrollRight) {
        containerRef2.current.scrollBy({
          left: scrollStep2,
          behavior: "smooth",
        });
        setScrollPosition(scrollPosition + scrollStep2);
      } else {
        containerRef2.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrollPosition(0);
      }
    }
  };
  const handleScrollRight3 = () => {
    if (containerRef3.current) {
      const containerWidth = containerRef3.current.scrollWidth;
      const containerScrollWidth = containerRef3.current.offsetWidth;
      const maxScrollRight = containerWidth - containerScrollWidth;

      if (scrollPosition < maxScrollRight) {
        containerRef3.current.scrollBy({
          left: scrollStep2,
          behavior: "smooth",
        });
        setScrollPosition(scrollPosition + scrollStep2);
      } else {
        containerRef3.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrollPosition(0);
      }
    }
  };

  const handlePrev = (carousel: number) => {
    if (carousel === 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setCurrentIndex2((prevIndex) =>
        prevIndex === 0 ? images2.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = (carousel: number) => {
    if (carousel === 1) {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentIndex2((prevIndex) =>
        prevIndex === images2.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="flex justify-center mt-[40px]  items-center ">
        <div className="xs:w-full xl:w-[1272px]- xl:w-[1289px] overflow-hidden flex rounded-[10px] xs:mx-[20px] xlg:mx-0">
          {images.map(() => (
            <Image
              src={images[currentIndex]}
              alt="/"
              height={358}
              width={1289}
              className="relative transition-transform duration-700 ease-in-out xs:h-[140px]- sm:h-full "
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            />
          ))}
        </div>
        {/* <div className="text-white lg:leading-[60px] text-center absolute font-extrabold xs:text-xl lg:text-[64px]">
          <p>{Strings.We_ensure_your_eyes}</p>
          <p>{Strings.are_taken_care_of}</p>
        </div> */}
        <div className="absolute flex justify-between xs:w-full xl:w-[1289px] ">
          <button
            onClick={() => handlePrev(1)}
            className={`ml-4 ${currentIndex === 0 ? "opacity-50" : ""}`}
            disabled={currentIndex === 0}
          >
            <Image
              src={Images.Lefticon}
              alt="/"
              height={16}
              width={16}
              className="ml-4"
            />
          </button>
          <button
            onClick={() => handleNext(1)}
            className={`mr-4 ${
              currentIndex === images.length - 1 ? "opacity-50 " : ""
            }`}
            disabled={currentIndex === images.length - 1}
          >
            <Image
              src={Images.Righticon}
              alt="/"
              height={16}
              width={16}
              className="mr-4"
            />
          </button>
        </div>
      </div>

      <div className="flex xs:flex-col xl:flex-row md:justify-between mt-10 xs:mx-[20px] xl:mx-[72px] xlg:mx-[129px] items-center">
        <div className="xl:w-[680px]">
          <h1 className="font-extrabold xs:text-xl lg:text-[24px] text-PictonBlue">
            {Strings.Make_life}
          </h1>
          <p className="border border-black my-3 xs:w-full xl:w-[530px] xlg:w-full "></p>
          <h1 className="font-medium text-black  xs:text-lg md:text-2xl xs:block- md:flex- xl:block-">
            <p>{Strings.PARTNERED_WITH}</p>
            <p>{Strings.EYE_SPECIALISTS}</p>
          </h1>
          <p className="font-normal leading-4 text-black text-sm mt-3 xl:w-[350px]">
            {Strings.Lorem}
          </p>
        </div>
        <div className="flex justify-center mt-[40px]  items-center ">
          <div className="xs:w-[340px] sm:w-[410px] md:w-[580px] xl:w-[580px] overflow-hidden flex rounded-[10px]">
            {images2.map(() => (
              <Image
                src={images2[currentIndex2]}
                alt="/"
                height={285}
                width={580}
                className="relative transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex2 * 100}%)` }}
              />
            ))}
          </div>
          <div className="absolute flex justify-between xs:w-[340px] sm:w-[410px] md:w-[580px] xl:w-[580px]">
            <button
              onClick={() => handlePrev(2)}
              className={`ml-2 ${currentIndex2 === 0 ? "opacity-50" : ""}`}
              disabled={currentIndex2 === 0}
            >
              <Image
                src={Images.Lefticon}
                alt="/"
                height={16}
                width={16}
                className="ml-2"
              />
            </button>
            <button
              onClick={() => handleNext(2)}
              className={`mr-2 ${
                currentIndex2 === images.length - 1 ? "opacity-50 " : ""
              }`}
              disabled={currentIndex2 === images.length - 1}
            >
              <Image
                src={Images.Righticon}
                alt="/"
                height={16}
                width={16}
                className="mr-2"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="xs:mx-[20px] lg:mx-[72px] mt-[72px]">
        <h1 className="font-extrabold xs:text-xl md:text-2xl">
          {Strings.SHOP_BY_CATEGORY}
        </h1>

        <Tab.Group>
          <Tab.List className="mt-3 flex xs:space-x-2 md:space-x-16 flex-wrap border-b border-black relative">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={` text-[15px] text-black  ${
                    selected
                      ? "border-b-[5px] border-black p-2 outline-none font-extrabold relative top-[3px]"
                      : "font-normal"
                  }
                  xs:px-2 md:px-4 py-3`}
                >
                  {Strings.MEN}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "border-b-[5px] border-black p-2 outline-none font-extrabold relative top-[3px]"
                      : "font-normal"
                  }
                  xs:px-2 md:px-4 py-3 text-[15px] text-black `}
                >
                  {Strings.WOMEN}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "border-b-[5px] border-black p-2 outline-none font-extrabold relative top-[3px]"
                      : "font-normal"
                  }
                  xs:px-2 md:px-4 py-3 text-[15px] text-black `}
                >
                  {Strings.UNISEX}
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={`${
                    selected
                      ? "border-b-[5px] border-black p-2 outline-none font-extrabold relative top-[3px]"
                      : "font-normal"
                  }
                  xs:px-2 md:px-4 py-3 text-[15px] text-black `}
                >
                  {Strings.KIDS}
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className={""}>
              <div className="mt-5 xs:overflow-x-auto xs:space-x-4 xl:space-x-16 flex xl:justify-between no-scrollbar">
                {framesformen.map((frame, index) => (
                  <Frameformen
                    key={index}
                    image={frame.image}
                    buttonText={frame.buttonText}
                    buttonUrl={frame.buttonUrl}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className={""}>
              <div className="mt-5 xs:overflow-x-auto xs:space-x-4 xl:space-x-16 flex xl:justify-between no-scrollbar">
                {framesforwomen.map((frame, index) => (
                  <Frame
                    key={index}
                    image={frame.image}
                    buttonText={frame.buttonText}
                    buttonUrl={frame.buttonUrl}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className={""}>
              <div className="mt-5 xs:overflow-x-auto xs:space-x-4 xl:space-x-16 flex xl:justify-between no-scrollbar">
                {framesforunisex.map((frame, index) => (
                  <Frameforunisex
                    key={index}
                    image={frame.image}
                    buttonText={frame.buttonText}
                    buttonUrl={frame.buttonUrl}
                  />
                ))}
              </div>
            </Tab.Panel>
            <Tab.Panel className={""}>
              <div className="mt-5 xs:overflow-x-auto xs:space-x-4 xl:space-x-16 flex xl:justify-between no-scrollbar">
                {framesforkids.map((frame, index) => (
                  <Frameforkids
                    key={index}
                    image={frame.image}
                    buttonText={frame.buttonText}
                    buttonUrl={frame.buttonUrl}
                  />
                ))}
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="flex items-center  justify-between xs:mt-10 lg:mt-28">
          <Image
            onClick={handlePrev2}
            src={Images.Lefticon}
            alt="/"
            height={16}
            width={16}
            className={`ml-0 xs:mb-[200px] xl:mb-0 ${
              currIndex === 0
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            style={{ pointerEvents: currIndex === 0 ? "none" : "auto" }}
          />
          <div className="xs:flex-col-reverse xl:flex-row xl:space-x-8 flex items-center justify-center">
            <div className="">
              <h1 className="font-extrabold text-2xl text-black">
                {Strings.NEW_ARRIVALS}
              </h1>
              <p className="text-xl font-extrabold text-PictonBlue">
                {currentItem.title}
                <br />
                {currentItem.descreption}
              </p>
              <div className="flex space-x-2">
                <p className="font-normal text-xl text-black line-through	">
                  ₹{currentItem.price_}
                </p>
                <p className="font-extrabold text-xl text-black">
                  ₹{currentItem.price}
                </p>
              </div>
              <p className="font-normal text-sm text-black mb-6">
                {Strings.Inclusive_of_all_taxes}
              </p>
              <StarRating rating={currentItem.rating} />
              <div className="flex space-x-4 mt-4">
                <button className="border-black border w-[137px] h-[34px] rounded-[5px] font-normal text-xs text-black bg-white">
                  {Strings.ADD_TO_CART}
                </button>
                <button className="border w-[137px] h-[34px] rounded-[5px] font-normal text-xs text-white bg-black">
                  {Strings.BUY_NOW}
                </button>
              </div>
            </div>
            <div className="xs:w-[280px] md:w-[674px] overflow-hidden flex rounded-[0px] bg-black-">
              {imagesData.map(() => (
                <Image
                  src={currentItem.image}
                  alt="/"
                  height={324}
                  width={674}
                  className="relative transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currIndex * 100}%)` }}
                />
              ))}
            </div>
          </div>
          <Image
            onClick={handleNext2}
            src={Images.Righticon}
            alt="/"
            height={16}
            width={16}
            className={`mr-0 xs:mb-[200px] xl:mb-0 ${
              currIndex === imagesData.length - 1
                ? "opacity-60 cursor-not-allowed"
                : "cursor-pointer"
            }`}
            style={{
              pointerEvents:
                currIndex === imagesData.length - 1 ? "none" : "auto",
            }}
          />
        </div>
      </div>
      <div className="h-[512px] py-14 xs:pl-4 md:pl-12 bg-Darkblue overflow-hidden mt-5">
        <h1 className="font-extrabold text-2xl ml-8 text-white space-x-2 flex">
          <p> {Strings.ALL_UNDER}</p>
          <span className="text-[#FFC107]">{Strings.FIVE_HUNDRED}</span>
        </h1>
        <div className="flex items-center">
          <Image
            onClick={handleScrollRight2}
            src={Images.Upicon}
            alt="/"
            height={16}
            width={16}
            className="-rotate-90 mr-4 cursor-pointer"
          />
          <div
            ref={containerRef2}
            className="mt-5 overflow-hidden flex space-x-10- w-full overflow-x-scroll no-scrollbar"
          >
            {Under500products.map((product, index) => (
              <Under500
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
                price={`₹${product.price}`}
                rating={product.rating}
                isBestseller={index === 3}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center xs:mt-10 md:mt-14 xs:mx-[20px] xlg:mx-0">
        <Image src={Images.iksanabanner3} alt="/" height={285} width={1278} />
      </div>

      <div className="xs:my-[40px] xl:my-[110px] xs:mx-[20px] xl:mx-[72px] flex xs:flex-col-reverse xl:flex-row xl:justify-between">
        <div>
          <h1 className="font-extrabold xl:leading-10 xs:text-2xl xl:text-[32px] text-PictonBlue xs:w-full xl:w-[480px] ">
            {Strings.FIND_TRUSTED}
          </h1>
          <p className="text-black mt-2 font-normal text-sm xs:w-full xl:w-[420px]">
            {Strings.BY_2050}
          </p>
          <p className="border border-black my-4"></p>
          <p className="text-black font-normal text-xl">
            {Strings.BOOK_AN_EYE_TEST_TODAY}
          </p>
          <button className="bg-black text-white font-normal text-xs w-[137px] h-[34px] rounded-[5px] mt-2">
            {Strings.BOOK_NOW}
          </button>
        </div>
        <div className="xs:flex xl:hidden justify-center flex">
          <Image
            src={Images.Untitled}
            alt="/"
            height={285}
            width={617}
            className="xs:mb-12 xl:mb-0 w-full"
          />
        </div>
        <div className="flex items-center relative xs:hidden xl:flex">
          <div className="absolute left-[-65px] top-[70px] h-[130px] w-[130px] bg-PictonBlue rounded-full flex text-center px-3 items-center">
            <p className="font-extrabold text-sm text-white">
              {Strings.FOR_OUR_LITTLE_ONES}
            </p>
          </div>
          <Image
            src={Images.iksanabanner4}
            alt="/"
            height={285}
            width={617}
            className="xs:mb-12 xl:mb-0"
          />
        </div>
      </div>
      <div className="relative">
        <Image
          src={Images.iksanabanner5}
          alt="/"
          height={670}
          width={1440}
          className=""
        />
        <div className="absolute xs:bottom-2 xs:left-7 sm:bottom-4 sm:left-16 md:bottom-8 md:left-16 lg:bottom-10 lg:left-20 xl:bottom-20 xl:left-32">
          <h1 className="font-normal xs:text-[10px] sm:text-xl xl:text-2xl text-black">
            {Strings.MODERN_STYLES}
            <br />
            <span className="font-extrabold ">{Strings.ENDLESS_OFFERS}</span>
          </h1>
          <button className="bg-black text-white font-normal text-xs xs:w-[100px] xs:h-[22px] xl:w-[137px] xl:h-[34px] rounded-[5px] xs:mt-1 md:mt-2 xl:mt-4">
            {Strings.SIGN_UP}
          </button>
        </div>
      </div>
      <div className="mt-20 h-[512px] py-14 xs:pl-4 md:pl-12 bg-[#D2E7EE] overflow-hidden">
        <h1 className="font-extrabold text-2xl text-black">
          {Strings.BESTSELLERS}
        </h1>
        <div className="flex items-center">
          <Image
            onClick={handleScrollRight3}
            className="mr-4 cursor-pointer"
            src={Images.Lefticon}
            alt="/"
            height={16}
            width={16}
          />
          <div
            ref={containerRef3}
            className="mt-5 overflow-hidden flex space-x-10- w-full overflow-x-scroll no-scrollbar"
          >
            {Bestsellerproducts.map((product, index) => (
              <Bestsellers
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
                price={`₹${product.price}`}
                rating={product.rating}
                isBestseller={index === 1}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="xs:my-[60px] xl:my-[100px] xs:mx-[20px] xl:mx-[60px]">
        <h1 className="text-black font-extrabold xl:mx-5 xs:text-xl xl:text-2xl mb-7">
          {Strings.What_our_customers_have_to_say}
        </h1>
        <div
          className="flex relative items-center justify-between xs:space-x-[2
          px] xl:space-x-4 "
        >
          <Image
            onClick={handleScrollLeft}
            src={Images.Lefticon}
            alt="/"
            height={16}
            width={16}
            className="xs:hidden md:flex cursor-pointer"
          />
          <Image
            onClick={handleScrollRight}
            src={Images.Lefticon}
            alt="/"
            height={16}
            width={16}
            className="xs:flex md:hidden cursor-pointer"
          />

          <div
            ref={containerRef}
            className="flex xl:overflow-hidden rounded-[10px] xs:space-x-7 md:space-x-10 xs:overflow-x-scroll no-scrollbar"
          >
            {CustomerData.map((Customer, index) => (
              <Customerssay
                key={index}
                rating={Customer.rating}
                h1={Customer.h1}
                p={Customer.p}
                style={{
                  opacity:
                    windowWidth > 768
                      ? index === visibleIndex
                        ? 1
                        : Math.abs(index - visibleIndex) < 3
                        ? 0.5
                        : 0
                      : 1,
                }}
              />
            ))}
          </div>
          <Image
            onClick={handleScrollRight}
            src={Images.Righticon}
            alt="/"
            height={16}
            width={16}
            className="xs:hidden md:flex cursor-pointer"
          />
          <div className="space-y-2 top-64 z-10 right-2 absolute">
            <button
              onClick={handleScrollToTop}
              className="bg-PictonBlue h-12 w-12 rounded-full flex justify-center items-center"
            >
              <Image src={Images.Upicon} alt="/" height={16} width={16} />
            </button>
            <Image src={Images.Whatsapp} alt="/" height={55} width={55} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homescreen;
