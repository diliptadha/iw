"use client";

import { Images, Strings } from "@/constant";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

interface MenuItem {
  category: string;
  id: number;
  menu: string;
  image: string;
  megaMenuOpen: boolean;
  data: {
    gender: { submenuData: string[]; genderheading: string[] };
    framestyle: { submenuData: string[]; framestyleheading: string[] };
    brands: { submenuData: string[]; brandsheading: string[] };
    framecolor: { submenuData: string[]; framecolorheading: string[] };
    frameshape: { submenuData: string[]; frameshapeheading: string[] };
  };

  usage: string[];
  gender: string[];
  style: string[];
  brand: string[];
  shape: string[];
  color: string[];
  power: string[];
  createdAt: string;
  updatedAt: string;
}

interface CardData {
  quantity: number;
}

const Header = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    "English"
  );
  const [rotateImage, setRotateImage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [cartQuantity, setCartQuantity] = useState<CardData[]>([]);
  const [stringsArray, setStringsArray] = useState([
    {
      id: 0,
      menu: Strings.EYEGLASSES,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["Men", "Women", "Unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [
            "Iksana",
            "Tom Ford",
            "Maybach",
            "Scott",
            "K&D",
            "Visibilla",
            "Zoe Miller",
            "Page 4",
            "Swarovski",
            "Origin Virgin",
            "Maverick",
            "Femina Flaunt",
            "Gotti",
            "Kosch",
            "Gucci",
            "prada",
            "Moleskine",
            "Carrera",
            "Mozzati",
            "Intense Focus",
            "Esprit",
          ],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [
            "Black",
            "Gold",
            "Transparent",
            "Brown",
            "Voilet",
            "Blue",
            "Silver",
            "Gunmetal",
            "Pink",
            "Yellow",
            "Red",
            "Green",
            "Tortoise",
            "Maroon",
            "Grey",
            "Purple",
            "Rosegold",
            "White",
          ],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [
            "Avaiator",
            "Butterfly",
            "Cat Eye",
            "Club Master",
            "Hexagon",
            "Oval",
            "Rectangle",
            "Round",
            "Square",
            "Geometric",
            "Wayfarer",
          ],
        },
      },
    },
    {
      id: 1,
      menu: Strings.SUNGLASSES,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
    {
      id: 2,
      menu: Strings.CONTACTLENS,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Usage"],
          genderheading: ["Daily", "Monthly", "Quarterly", "Yearly"],
        },
        framestyle: {
          submenuData: [],
          framestyleheading: [],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [
            "Celebration",
            "Johnson & Johnson",

            "Seed",
            "Cooper vision",
            "Bausch and lomb",

            "Alcon",
          ],
        },
        framecolor: {
          submenuData: ["Color"],
          framecolorheading: ["White", " Blue"],
        },
        frameshape: {
          submenuData: ["Power"],
          frameshapeheading: [
            "Spherical",
            "Cylindrical",
            "Multifocal",
            "Toric ",
            "Monofocal",
          ],
        },
      },
    },
    {
      id: 3,
      menu: Strings.KIDSWEAR,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
    {
      id: 4,
      menu: Strings.SWIMMING_GLASSES,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
    {
      id: 5,
      menu: Strings.READING_GLASS,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
    {
      id: 6,
      menu: Strings.COMPUTER_GLASS,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
    {
      id: 7,
      menu: Strings.BRANDS,
      image: Images.Downiconblack,
      megaMenuOpen: false,
      data: {
        gender: {
          submenuData: ["Gender"],
          genderheading: ["men", "women", "unisex"],
        },
        framestyle: {
          submenuData: ["Frame Style"],
          framestyleheading: ["Full Frame", "Half Frame", "Rimless "],
        },
        brands: {
          submenuData: ["Brands"],
          brandsheading: [],
        },
        framecolor: {
          submenuData: ["Frame Color"],
          framecolorheading: [],
        },
        frameshape: {
          submenuData: ["Frame Shape"],
          frameshapeheading: [],
        },
      },
    },
  ]);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=IK0000002`
      )
      .then((response) => {
        console.log(response.data);
        setCartQuantity(response?.data?.cartData);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  const tQty = cartQuantity.reduce((total, ele) => total + ele.quantity, 0);

  const router = useRouter();

  const handleCartPage = () => {
    if (tQty <= 0) {
      router.push("/cartEmpty"); // Replace '/another-page' with the path to the page you want to navigate to// Return null or a loading state while navigating
    } else {
      router.push("/cart");
    }
  };

  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  const fetchData = async () => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "http://localhost:4000/home/getMenu",
        headers: {},
      };

      const response = await axios.request(config);
      setMenuData(response.data.menu);
      // console.log("MENU DATA :", JSON.stringify(response.data.menu));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleMegaMenu = (index: number) => {
    const updatedMenuData = menuData.map((item, i) => ({
      ...item,
      megaMenuOpen: i === index ? !item.megaMenuOpen : false,
    }));
    setMenuData(updatedMenuData);
    setRotateImage(!rotateImage);
  };

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage((prevLanguage) =>
      prevLanguage === language ? null : language
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = () => {
    setShowMenu(false);
    const updatedMenuData = menuData.map((item) => ({
      ...item,
      megaMenuOpen: false,
    }));
    setMenuData(updatedMenuData);
  };

  const handleClose = () => {
    const updatedMenuData = menuData.map((item) => ({
      ...item,
      megaMenuOpen: false,
    }));
    setMenuData(updatedMenuData);
    setRotateImage(!rotateImage);
  };

  const toCamelCase = (str: string) => {
    return str
      .toLowerCase()
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word: string, index: number) => {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
      })
      .replace(/\s+/g, "");
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  return (
    <div className="max-w-screen-2xl m-auto">
      <div className="bg-PictonBlue xs:px-[16px] md:px-[46px] h-16 w-full flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex bg-[#F2F2F2] h-7 w-[150px] rounded-[5px] items-center text-black">
            <button
              className={` h-7 w-[90px] rounded-[5px] flex items-center justify-center ${
                selectedLanguage === "English"
                  ? "bg-[#1A82A4] text-white font-extrabold text-xs"
                  : "font-normal text-xs"
              }`}
              onClick={() => handleLanguageClick("English")}
              disabled={selectedLanguage === "English"}
            >
              {Strings.ENGLISH}
            </button>
            <button
              className={`h-7 w-[90px] rounded-[5px]  flex items-center justify-center ${
                selectedLanguage === "Hindi"
                  ? "bg-[#1A82A4] text-white font-extrabold text-xs"
                  : "font-normal text-xs"
              }`}
              onClick={() => handleLanguageClick("Hindi")}
              disabled={selectedLanguage === "Hindi"}
            >
              {Strings.हिन्दी}
            </button>
          </div>
          <div className="flex items-center cursor-pointer xs:hidden lg:flex">
            <Image src={Images.Phone} alt="/" height={17} width={17} />
            <p className="text-black font-bold text-xs ml-2">
              {Strings.NEED_HELP1}
            </p>
          </div>
        </div>
        <div className="flex items-center xs:block lg:hidden">
          <button onClick={toggleMenu}>
            <Image src={Images.Menu} alt="/" height={28} width={28} />
          </button>
        </div>
        {showMenu && (
          <div
            ref={menuRef}
            className="absolute overflow-y-scroll right-0 top-0 z-10 h-screen w-screen bg-[#1A82A4]"
          >
            <Image
              onClick={handleMenuItemClick}
              src={Images.Close}
              alt="/"
              height={28}
              width={28}
              className="absolute top-4 right-4"
            />
            <div className="space-y-2 px-5 mt-20 w-full">
              <div className="space-y-2">
                {menuData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      onClick={() => toggleMegaMenu(index)}
                      className="flex justify-between font-normal text-xs text-white my-4"
                    >
                      {item.category.toUpperCase()}

                      <button>
                        <Image
                          src={Images.Downicon1}
                          alt="/"
                          height={16}
                          width={16}
                          className="mr-4 "
                        />
                      </button>
                    </div>
                    <p className=" border "></p>
                  </div>
                ))}
              </div>
              <div className="flex justify-center">
                {menuData.map(
                  (item, index) =>
                    item.megaMenuOpen && (
                      <div
                        key={index}
                        className="w-full h-screen bg-[#F2F2F2] absolute top-[80px] p-5 rounded-t-[10px] overflow-y-scroll"
                      >
                        <div className="flex justify-end">
                          <Image
                            onClick={handleClose}
                            src={Images.Closeblack}
                            alt=""
                            height={16}
                            width={16}
                            className=""
                          />
                        </div>
                        <div className="font-normal text-sm text-black space-y-4">
                          <div>
                            {item.category === "Contact Lenses" &&
                              item.usage.length > 0 && (
                                <div>
                                  <h1 className="font-bold text-black">
                                    Usage
                                  </h1>
                                  <ul className="mt-2">
                                    {item.usage.map((usage, subIndex) => (
                                      <li key={subIndex}>
                                        {usage.toUpperCase()}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            {item.category !== "Contact Lenses" &&
                              item.gender.length > 0 && (
                                <div>
                                  <h1 className="font-bold text-black">
                                    Gender
                                  </h1>
                                  <ul className="mt-2">
                                    {item.gender.map((gender, subIndex) => (
                                      <li key={subIndex}>
                                        {gender.toUpperCase()}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                          </div>

                          <p className="border border-black"></p>
                          <div>
                            {item.brand && item.brand.length > 0 && (
                              <>
                                <h1 className="font-bold text-black">Brand</h1>
                                <ul
                                  className={
                                    item.category === "Contact Lenses"
                                      ? "mt-2 "
                                      : "grid grid-cols-3 mt-2"
                                  }
                                >
                                  {item.brand.map((brand, subIndex) => (
                                    <li key={subIndex}>
                                      {brand.toUpperCase()}
                                    </li>
                                  ))}
                                </ul>
                              </>
                            )}
                          </div>

                          {/* <p className="border border-black"></p> */}
                          <div>
                            <h1 className="font-bold text-black">
                              {item.data?.framecolor.submenuData.map(
                                (framecolor, index) => (
                                  <h1 key={index}>{framecolor}</h1>
                                )
                              )}
                            </h1>
                            <ul className="grid grid-cols-3">
                              {item.data?.framecolor.framecolorheading.map(
                                (framecolor, subIndex) => (
                                  <li key={subIndex}>{framecolor}</li>
                                )
                              )}
                            </ul>
                          </div>
                          <p className="border border-black"></p>
                          <div>
                            <h1 className="font-bold text-black">
                              {item.data?.framestyle.submenuData.map(
                                (framestyle, index) => (
                                  <h1 key={index}>{framestyle}</h1>
                                )
                              )}
                            </h1>
                            <ul className="flex space-x-4">
                              {item.data?.framestyle.framestyleheading.map(
                                (framestyle, subIndex) => (
                                  <li key={subIndex}>{framestyle}</li>
                                )
                              )}
                            </ul>
                          </div>
                          <p className="border border-black"></p>
                          <div>
                            <h1 className="font-bold text-black">
                              {item.data?.frameshape.submenuData.map(
                                (frameshape, index) => (
                                  <h1 key={index}>{frameshape}</h1>
                                )
                              )}
                            </h1>
                            <ul className="grid grid-cols-3">
                              {item.data?.frameshape.frameshapeheading.map(
                                (frameshape, subIndex) => (
                                  <li key={subIndex}>{frameshape}</li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center cursor-pointer   ">
                  <Image
                    src={Images.Phonewhite}
                    alt="/"
                    height={17}
                    width={17}
                  />
                  <p className="text-white font-normal text-xs ml-2 ">
                    {Strings.NEED_HELP}
                  </p>
                </div>
                <p className="border"></p>
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={Images.Locationwhite}
                    alt="/"
                    height={18}
                    width={15}
                  />
                  <p className="text-white font-normal text-xs ml-2">
                    {Strings.FIND_THE_NEAREST_STORE}
                  </p>
                </div>
                <p className="border"></p>
                <div className="flex items-center cursor-pointer">
                  <Image src={Images.Eyewhite} alt="/" height={14} width={20} />
                  <p className="text-white font-normal text-xs ml-2">
                    {Strings.BOOK_AN_APPOINTMENT}
                  </p>
                </div>
                <p className="border"></p>
                <div className="flex items-center cursor-pointer">
                  <Image
                    src={Images.Userwhite}
                    alt="/"
                    height={18}
                    width={18}
                  />
                  <p className="text-white font-normal text-xs ml-2">
                    {Strings.SIGN_IN}
                  </p>
                </div>
                <p className="border"></p>
              </div>
            </div>
          </div>
        )}
        <div className="flex space-x-4 items-center xs:hidden lg:flex">
          <div className="flex items-center cursor-pointer">
            <Image src={Images.Location} alt="/" height={18} width={14} />
            <p className="text-black font-bold text-xs ml-2">
              {Strings.FIND_THE_NEAREST_STORE}
            </p>
          </div>
          <div className="flex items-center cursor-pointer">
            <Image src={Images.Eye} alt="/" height={14} width={22} />
            <p className="text-black font-bold text-xs ml-2">
              {Strings.BOOK_AN_APPOINTMENT}
            </p>
          </div>
          <div className="flex items-center cursor-pointer">
            <Image src={Images.User} alt="/" height={18} width={18} />
            <p className="text-black font-bold text-xs ml-2">
              {Strings.SIGN_IN}
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-8 xs:flex-col sm:flex-row sm:justify-between xs:space-y-4 md:space-y-0 items-center xs:mx-4 md:mx-12">
        <Image
          src={Images.Logo}
          alt="/"
          height={68}
          width={215}
          className="xs:w-36 md:w-[215px]"
        />
        <div className="xs:space-x-3 sm:space-x-4 flex items-center">
          <div className="relative">
            <input
              className="xs:text-sm md:text-base bg-[#E5E5E4] outline-none xs:w-[260px] md:w-56 h-10 p-4 rounded-[10px] flex items-center"
              style={{ paddingRight: "2.5rem" }}
            />
            <Image
              src={Images.Search}
              alt="/"
              height={18}
              width={18}
              className="absolute right-4 top-3 "
            />
          </div>

          <div className="relative" onClick={handleCartPage}>
            <button>
              <Image
                src={Images.Bag}
                alt="/"
                height={21}
                width={19}
                className="w-[24px]"
              />
            </button>
            <div className="rounded-full h-5 w-5 bg-[#FF4307] absolute top-0 right-[-7px] translate-x-0 translate-y-[-50%]">
            <span className="absolute text-[11px] top-[50%] right-[50%] text-white translate-x-[50%] translate-y-[-50%]">
              {tQty}
            </span>
            </div>
            
          </div>
        </div>
      </div>
      <div>
        <div className="relative justify-between flex  my-10 mx-12  xs:hidden lg:flex">
          {menuData.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => toggleMegaMenu(index)}
                className={`flex items-center font-normal lg:text-[11.5px] xl:text-xs  cursor-pointer ${
                  item.megaMenuOpen
                    ? "text-PictonBlue font-semibold"
                    : "text-black"
                }`}
              >
                {item.category.toUpperCase()}
                <button>
                  {item.megaMenuOpen ? (
                    <Image
                      src={Images.DownArrow}
                      alt="/"
                      height={12}
                      width={12}
                      className={`lg:ml-1 xl:ml-2 
                      ${
                        item.megaMenuOpen
                          ? "rotate-180 duration-300 transform"
                          : ""
                      }`}
                    />
                  ) : (
                    <Image
                      src={Images.Downiconblack}
                      alt="/"
                      height={12}
                      width={12}
                      className="lg:ml-1 xl:ml-2 "
                    />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center xs:hidden lg:flex">
          {menuData.map(
            (item, index) =>
              item.megaMenuOpen && (
                <div
                  key={index}
                  className="w-[700px] z-50 h-auto bg-[#F2F2F2] absolute top-56 p-5 rounded-[10px] shadow-md"
                >
                  <div className="flex text-base justify-between font-normal">
                    <div>
                      {item.category === "Contact Lenses" &&
                        item.usage.length > 0 && (
                          <div>
                            <h1 className="font-bold text-black">Usage</h1>
                            <ul>
                              {item.usage.map((usage, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer"
                                >
                                  <Link
                                    href={`${baseUrl}${encodeURIComponent(
                                      item.category
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                    )}/${encodeURIComponent(
                                      usage.toLowerCase().replace(/\s+/g, "-")
                                    )}-contact-lenses`}
                                  >
                                    {usage.toUpperCase()}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                      {item.category !== "Contact Lenses" &&
                        item.gender.length > 0 && (
                          <div>
                            <h1 className="font-bold text-black">Gender</h1>
                            <ul>
                              {item.gender.map((gender, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer"
                                >
                                  <Link
                                    href={`${baseUrl}${encodeURIComponent(
                                      item.category
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")
                                    )}/glasses-for-${gender
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`}
                                  >
                                    {gender.toUpperCase()}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                    </div>

                    <div>
                      {item.brand && item.brand.length > 0 && (
                        <>
                          <h1 className="font-bold text-black">Brand</h1>
                          <ul>
                            {item.brand.map((brand, subIndex) => (
                              <li
                                key={subIndex}
                                className="hover:text-PictonBlue cursor-pointer"
                              >
                                <Link
                                  href={`${baseUrl}${encodeURIComponent(
                                    item.category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                  )}/${encodeURIComponent(
                                    brand
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                      .replace(/&/g, "and")
                                  )}${
                                    item.category.toLowerCase() ===
                                    "contact lenses"
                                      ? "-lens"
                                      : "-glasses"
                                  }`}
                                >
                                  {brand.toUpperCase()}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>

                    <div>
                      <h1 className="font-bold text-black">
                        {item.data?.framecolor.submenuData.map(
                          (framecolor, index) => (
                            <h1 key={index}>{framecolor}</h1>
                          )
                        )}
                      </h1>
                      <ul>
                        {item.data?.framecolor.framecolorheading.map(
                          (framecolor, subIndex) => (
                            <li
                              key={subIndex}
                              className="hover:text-PictonBlue cursor-pointer"
                            >
                              {framecolor}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h1 className="font-bold text-black">
                        {item.data?.framestyle.submenuData.map(
                          (framestyle, index) => (
                            <h1 key={index}>{framestyle}</h1>
                          )
                        )}
                      </h1>
                      <ul>
                        {item.data?.framestyle.framestyleheading.map(
                          (framestyle, subIndex) => (
                            <li
                              key={subIndex}
                              className="hover:text-PictonBlue cursor-pointer"
                            >
                              {framestyle}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                    <div>
                      <h1 className="font-bold text-black">
                        {item.data?.frameshape.submenuData.map(
                          (frameshape, index) => (
                            <h1 key={index}>{frameshape}</h1>
                          )
                        )}
                      </h1>
                      <ul>
                        {item.data?.frameshape.frameshapeheading.map(
                          (frameshape, subIndex) => (
                            <li
                              key={subIndex}
                              className="hover:text-PictonBlue cursor-pointer"
                            >
                              {frameshape}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
