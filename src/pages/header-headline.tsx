import { Images, Strings } from "@/constant";
import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

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

const HeaderHeadline = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    "English"
  );
  const [rotateImage, setRotateImage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuData, setMenuData] = useState<MenuItem[]>([]);

  const fetchData = async () => {
    try {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}home/getMenu`,
        headers: {},
      };

      const response = await axios.request(config);
      setMenuData(response.data.menu);
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

  const [signInText, setSignInText] = useState("Sign In");
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedFirstName = localStorage.getItem("firstName");
    if (userId && storedFirstName) {
      setSignInText(storedFirstName);
      setFirstName(storedFirstName);
    } else if (userId) {
      setSignInText("User");
    }
  }, []);

  useEffect(() => {
    if (firstName) {
      setSignInText(firstName);
      localStorage.setItem("firstName", firstName);
    }
  }, [firstName]);

  const openWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${Strings.Whatsapp_No}&text=Hello, I would like to know more about your services.`,
      "_blank"
    );
  };

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
            <a href="tel:+918291251241">
              <p className="text-black font-bold text-xs ml-2">
                {Strings.NEED_HELP1}
              </p>
            </a>
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
                                    {Strings.USAGE}
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
                                    {Strings.Gender}
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
            <Link href={"/store-location"}>
              <p className="text-black font-bold text-xs ml-2">
                {Strings.FIND_THE_NEAREST_STORE}
              </p>
            </Link>
          </div>
          <div className="flex items-center cursor-pointer">
            <Image src={Images.Eye} alt="/" height={14} width={22} />
            <p className="text-black font-bold text-xs mx-2">
              {Strings.TALK_WITH_US}
            </p>
            <Image
              onClick={openWhatsApp}
              src={Images.vector}
              alt="/"
              height={18}
              width={18}
            />
          </div>
          <div className="flex items-center cursor-pointer">
            <Link href={"/profile"}>
              <Image
                src={Images.User}
                alt="/"
                height={18}
                width={18}
                className="cursor-pointer"
              />
            </Link>
            <button
              className={`text-black font-bold text-xs ml-2 
                  
            `}
            >
              {signInText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHeadline;
