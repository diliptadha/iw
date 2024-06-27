import { Images, Strings } from "@/constant";
import LoginModal, { toggleModal } from "@/Component/LoginModal";
import { useEffect, useRef, useState } from "react";

import DynamicTitle from "./DynamicTitle";
import Image from "next/image";
import Link from "next/link";
import RootLayout from "@/app/layout";
import axios from "axios";
import { useCart } from "@/Context/CartContext";
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

interface HeaderProps {
  setSearch: (search: string) => void;
}

interface CardData {
  cartProduct: any;
  quantity: number;
}

const Header: React.FC<HeaderProps> = ({ setSearch }) => {
  const router = useRouter();

  const { cart }: any = useCart();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    "English"
  );
  const [rotateImage, setRotateImage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [cartQuantity, setCartQuantity] = useState<CardData[]>([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [search, setSearchLocal] = useState("");
  const [showTrendingSearches, setShowTrendingSearches] = useState(false);
  const trendingSearches = [
    "Contact Lenses",
    "Eyeglasses for Kids",
    "Eyeglasses for Men",
    "Eyeglasses for Women",
    "Computer Glasses Women",
    "Computer Glasses Men",
    "Myopia Control Zesis Lenses",
    "Myopia Control Zeiss Lenses",
    "Myopia Control Essilor Lenses",
  ];
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("userId");
    }
    return false;
  });

  const openWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?phone=${Strings.Whatsapp_No}&text=Hello, I would like to know more about your services.`,
      "_blank"
    );
  };

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

  const handleButtonClick = () => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setShowLoginModal(true);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedSearch = localStorage.getItem("searchTerm");
    if (storedSearch) {
      setSearchLocal(storedSearch);
    }
  }, []);

  const handleChange = (e: any) => {
    const searchTerm = e.target.value;
    setSearchLocal(e.target.value);
    setSearch(e.target.value);
    if (searchTerm.trim() === "") {
      localStorage.removeItem("searchTerm");
      localStorage.removeItem("search");
    }
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem("searchTerm");
    if (savedSearchTerm) {
      setSearch(savedSearchTerm);
      setSearchLocal(savedSearchTerm);
    }
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      localStorage.setItem("searchTerm", search);
      router.push(
        `/advanced-search?q=${encodeURIComponent(
          search.toLowerCase().replace(/\s+/g, "-")
        )}`
      );
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname !== "/advanced-search") {
        localStorage.removeItem("searchTerm");
        localStorage.removeItem("search");
        setSearch("");
        setSearchLocal("");
      }
    };

    return () => {
      handlePopState();
    };
  }, []);

  let userId: string | null;
  useEffect(() => {
    userId = localStorage.getItem("userId");
  }, []);

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
      )
      .then((response) => {
        setCartQuantity(response?.data?.cartData);
        console.log("resp", response?.data);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  let tQty = 0; // Initialize tQty to 0

  if (Array.isArray(cartQuantity)) {
    tQty = cartQuantity.reduce(
      (total, ele) => total + ele.cartProduct.quantity,
      0
    );
  }
  // console.log("qty", tQty);

  const handleCartPage = () => {
    if (tQty <= 0) {
      router.push("/cartEmpty"); // Replace '/another-page' with the path to the page you want to navigate to// Return null or a loading state while navigating
    } else {
      router.push("/cart");
    }
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowTrendingSearches(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleTrendingSearchClick = (term: string) => {
    setSearch(term);
    setSearchLocal(term);
    localStorage.setItem("searchTerm", term);
    router.push(
      `/advanced-search?q=${encodeURIComponent(
        term.toLowerCase().replace(/\s+/g, "-")
      )}`
    ),
      setShowTrendingSearches(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setShowTrendingSearches(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    if (showMenu && menuData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showMenu && menuData]);

  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [showMenu]);

  // useEffect(() => {
  //   if (!showMenu) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [!showMenu]);

  // const [category, setCategory] = useState("");
  // const [usage, setUsage] = useState("");
  // const [color, setColor] = useState("");
  // const [brand, setBrand] = useState("");

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const getPathParams = () => {
  //       const pathArray = window.location.pathname.split("/").filter(Boolean);
  //       setCategory(pathArray[0] || "");
  //       setUsage(pathArray[1] || "");
  //     };
  //     getPathParams();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const getPathParams2 = () => {
  //       const pathArray2 = window.location.pathname.split("/").filter(Boolean);
  //       setColor(pathArray2[1] || "");
  //     };
  //     getPathParams2();
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     const getPathParams1 = () => {
  //       const pathArray1 = window.location.pathname.split("/").filter(Boolean);
  //       setBrand(pathArray1[1] || "");
  //     };
  //     getPathParams1();
  //   }
  // }, [brand]);

  const [category, setCategory] = useState("");
  const [usage, setUsage] = useState("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getPathParams = () => {
        const pathArray = window.location.pathname.split("/").filter(Boolean);
        setCategory(pathArray[0] || "");
        setUsage(pathArray[1] || "");

        if (pathArray.length >= 3) {
          setColor(pathArray[1] || "");
        }
        if (pathArray.length >= 4) {
          setBrand(pathArray[1] || "");
        }
      };
      getPathParams();
    }
  }, []);

  return (
    <>
      <DynamicTitle
        category={category}
        usage={usage}
        color={color}
        searchTerm={search}
        brand={brand}
      />

      <div className=" max-w-screen-2xl m-auto">
        <div className="fixed top-0 z-index2 bg-PictonBlue  xs:px-[16px] md:px-[46px] h-16 w-full flex justify-between items-center">
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
              <a href="tel:+918291251241">
                <Image src={Images.Phone} alt="/" height={17} width={17} />
              </a>
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
              className="fixed overflow-y-scroll top-0 left-0 right-0 bottom-0 h-full w-full pb-10 bg-[#1A82A4] z-index1"
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
                  {menuData?.map((item, index) => (
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
                  {menuData?.map(
                    (item, index) =>
                      item.megaMenuOpen &&
                      (item.usage.length > 0 ||
                      item.gender.length > 0 ||
                      item.brand.length > 0 ||
                      item.color.length > 0 ||
                      item.style.length > 0 ||
                      item.shape.length > 0 ? (
                        <div
                          key={index}
                          className="w-full h-full bg-[#F2F2F2] absolute top-[80px] p-5 rounded-t-[10px] overflow-y-scroll"
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
                                      {Strings.USAGE.toUpperCase()}
                                    </h1>
                                    <ul className="mt-2">
                                      {item.usage.map((usage, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            href={`/${item.category
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")}/${usage
                                              .toLowerCase()
                                              .replace(
                                                /\s+/g,
                                                "-"
                                              )}-contact-lenses`}
                                          >
                                            {usage.charAt(0).toUpperCase() +
                                              usage.slice(1).toLowerCase()}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                              {item.category !== "Contact Lenses" &&
                                item.gender.length > 0 && (
                                  <div>
                                    <h1 className="font-bold text-black">
                                      {Strings.GENDER}
                                    </h1>
                                    <ul className="mt-2">
                                      {item.gender.map((gender, subIndex) => (
                                        <li key={subIndex}>
                                          <Link
                                            href={`/${item.category
                                              .toLowerCase()
                                              .replace(
                                                /\s+/g,
                                                "-"
                                              )}/${`glasses-for-${gender
                                              .toLowerCase()
                                              .replace(/\s+/g, "-")}`}`}
                                          >
                                            {gender.charAt(0).toUpperCase() +
                                              gender.slice(1).toLowerCase()}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                    <p className="border border-black mt-2"></p>
                                  </div>
                                )}
                            </div>

                            <div>
                              {item.brand && item.brand.length > 0 && (
                                <>
                                  <h1 className="font-bold text-black">
                                    {Strings.BRANDS}
                                  </h1>
                                  <ul
                                    className={
                                      item.category === "Contact Lenses"
                                        ? "mt-2 "
                                        : "grid grid-cols-3 mt-2"
                                    }
                                  >
                                    {item.brand.map((brand, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={`/${item.category
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${brand
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")
                                            .replace(/&/g, "and")}${
                                            item.category.toLowerCase() ===
                                              "contact lenses" ||
                                            item.category.toLowerCase() ===
                                              "myopia control glasses"
                                              ? "-lens"
                                              : "-frames"
                                          }`}
                                        >
                                          {brand.charAt(0).toUpperCase() +
                                            brand.slice(1).toLowerCase()}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="border border-black mt-2"></p>
                                </>
                              )}
                            </div>

                            <div>
                              {item.color && item.color.length > 0 && (
                                <>
                                  <h1 className="font-bold text-black">
                                    {Strings.COLOR}
                                  </h1>
                                  <ul className="mt-2 grid grid-cols-3">
                                    {item.color.map((color, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={`/${item.category
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${color
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}${
                                            item.category.toLowerCase() ===
                                              "contact lenses" ||
                                            item.category.toLowerCase() ===
                                              "myopia control glasses"
                                              ? "-lens"
                                              : "-frames"
                                          }`}
                                        >
                                          {color.charAt(0).toUpperCase() +
                                            color.slice(1).toLowerCase()}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="border border-black mt-2"></p>
                                </>
                              )}
                            </div>

                            <div>
                              {item.style && item.style.length > 0 && (
                                <>
                                  <h1 className="font-bold text-black">
                                    {Strings.STYLE}
                                  </h1>
                                  <ul className="mt-2">
                                    {item.style.map((style, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={`/${item.category
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${style
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}-frames`}
                                        >
                                          {style.charAt(0).toUpperCase() +
                                            style.slice(1).toLowerCase()}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="border border-black mt-2"></p>
                                </>
                              )}
                            </div>

                            <div>
                              {item.shape && item.shape.length > 0 && (
                                <>
                                  <h1 className="font-bold text-black">
                                    {Strings.SHAPE}
                                  </h1>
                                  <ul className="mt-2 grid grid-cols-3">
                                    {item.shape.map((shape, subIndex) => (
                                      <li key={subIndex}>
                                        <Link
                                          href={`/${item.category
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}/${shape
                                            .toLowerCase()
                                            .replace(/\s+/g, "-")}-frames`}
                                        >
                                          {shape.charAt(0).toUpperCase() +
                                            shape.slice(1).toLowerCase()}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ) : null)
                  )}
                </div>
                <div className="space-y-4">
                  <h1 className="flex items-center cursor-pointer   ">
                    <a href="tel:+918291251241">
                      <Image
                        src={Images.Phonewhite}
                        alt="/"
                        height={17}
                        width={17}
                      />
                    </a>
                    <a href="tel:+918291251241">
                      <p className="text-white font-normal text-xs ml-2 ">
                        {Strings.NEED_HELP}
                      </p>
                    </a>
                  </h1>

                  <p className="border"></p>

                  <div className="flex items-center cursor-pointer">
                    <Image
                      src={Images.Locationwhite}
                      alt="/"
                      height={18}
                      width={15}
                    />
                    <Link href={"/store-location"}>
                      <p className="text-white font-normal text-xs ml-2">
                        {Strings.FIND_THE_NEAREST_STORE}
                      </p>
                    </Link>
                  </div>

                  <p className="border"></p>
                  <div
                    onClick={openWhatsApp}
                    className="flex items-center cursor-pointer"
                  >
                    <Image src={Images.vector} alt="/" height={18} width={18} />
                    <p className="text-white font-normal text-xs ml-2">
                      {Strings.TALK_WITH_US}
                    </p>
                  </div>
                  <p className="border"></p>
                  <div className="flex items-center">
                    <Link href={isLoggedIn ? "/profile" : "/"}>
                      <Image
                        src={Images.Userwhite}
                        alt="/"
                        height={18}
                        width={18}
                        className="cursor-pointer"
                      />
                    </Link>
                    <button
                      onClick={handleButtonClick}
                      className={`text-white font-normal text-xs ml-2 ${
                        isLoggedIn ? "cursor-default" : ""
                      } `}
                    >
                      {signInText}
                    </button>
                    <LoginModal
                      showLoginModal={showLoginModal}
                      setShowLoginModal={setShowLoginModal}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />
                  </div>
                  <p className="border"></p>
                </div>
              </div>
            </div>
          )}
          <div className="flex space-x-4 items-center xs:hidden lg:flex">
            <Link href={"/store-location"}>
              <div className="flex items-center cursor-pointer">
                <Image src={Images.Location} alt="/" height={18} width={14} />

                <p className="text-black font-bold text-xs ml-2">
                  {Strings.FIND_THE_NEAREST_STORE}
                </p>
              </div>
            </Link>
            <div
              onClick={openWhatsApp}
              className="flex items-center cursor-pointer"
            >
              <Image src={Images.vector} alt="/" height={18} width={18} />
              <p className="text-black font-bold text-xs ml-2">
                {Strings.TALK_WITH_US}
              </p>
            </div>
            <div className="flex items-center ">
              <Link href={isLoggedIn ? "/profile" : "/"}>
                <Image
                  src={Images.User}
                  alt="/"
                  height={18}
                  width={18}
                  className="cursor-pointer"
                />
              </Link>
              <button
                onClick={handleButtonClick}
                className={`text-black font-bold text-xs ml-2 `}
              >
                {signInText}
              </button>
              <LoginModal
                showLoginModal={showLoginModal}
                setShowLoginModal={setShowLoginModal}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </div>
          </div>
        </div>
        <div className=" flex mt-[94px] xs:flex-col sm:flex-row sm:justify-between xs:space-y-4 md:space-y-0 items-center xs:mx-4 md:mx-12">
          <Link href={"/"}>
            <Image
              src={Images.Logo}
              alt="/"
              height={68}
              width={215}
              className="xs:w-36 md:w-[215px]"
            />
          </Link>
          <div className="xs:space-x-3 sm:space-x-4 flex items-center">
            <div className="relative" ref={dropdownRef}>
              <input
                className="xs:text-sm md:text-base text-black bg-[#E5E5E4] outline-none xs:w-[260px] md:w-56 h-10 p-4 rounded-[10px] flex items-center"
                style={{ paddingRight: "2.5rem" }}
                value={search}
                onChange={handleChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
              {showTrendingSearches && (
                <div className="z-index absolute  w-full bg-white border rounded-md shadow-lg">
                  <p className="p-2 text-gray-500">TRENDING</p>
                  {trendingSearches.map((term, index) => (
                    <div
                      key={index}
                      className="p-2 cursor-pointer hover:bg-gray-100 text-black"
                      onClick={() => handleTrendingSearchClick(term)}
                    >
                      {term}
                    </div>
                  ))}
                </div>
              )}
              <button
                disabled={search.trim() === ""}
                onClick={handleSearch}
                className="absolute right-4 top-3 transition-transform hover:scale-75 transform"
              >
                <Image src={Images.Search} alt="/" height={18} width={18} />
              </button>
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
                  {cart || tQty}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="relative justify-between flex mt-10 mx-12 xs:hidden lg:flex">
            {menuData?.map((item, index) => (
              <div key={index}>
                <div
                  onMouseEnter={() => toggleMegaMenu(index)}
                  // onMouseLeave={() => toggleMegaMenu(index)}
                  // onClick={() => toggleMegaMenu(index)}
                  className={`flex items-center font-semibold text-xs  cursor-pointer ${
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
                        src={Images.DOWN_ARROW}
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
            {menuData?.map(
              (item, index) =>
                item.megaMenuOpen &&
                (item.usage.length > 0 ||
                item.gender.length > 0 ||
                item.brand.length > 0 ||
                item.color.length > 0 ||
                item.style.length > 0 ||
                item.shape.length > 0 ? (
                  <div
                    key={index}
                    className="w-auto z-index3 h-auto bg-[#F2F2F2] absolute top-56 p-5 rounded-[10px] shadow-md"
                    onMouseLeave={() => toggleMegaMenu(index)}
                  >
                    {/* <div className={`flex text-base gap-x-20 font-normal`}> */}
                    <div
                      className={`flex text-base ${
                        item.usage.length === 0 &&
                        item.gender.length === 0 &&
                        item.style.length === 0 &&
                        item.shape.length === 0 &&
                        item.color.length === 0 &&
                        item.power.length === 0
                          ? "gap-x-2"
                          : "gap-x-20"
                      } font-normal`}
                    >
                      <div>
                        {item.category === "Contact Lenses" &&
                          item.usage.length > 0 && (
                            <div>
                              <h1 className="font-bold text-black">
                                {Strings.USAGE.toUpperCase()}
                              </h1>
                              <ul className="space-y-[4px]">
                                {item.usage.map((usage, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="hover:text-PictonBlue cursor-pointer text-black font-medium text-xs"
                                  >
                                    <a
                                      href={`/${item.category
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}/${usage
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}-contact-lenses`}
                                    >
                                      {usage.charAt(0).toUpperCase() +
                                        usage.slice(1).toLowerCase()}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        {item.category !== "Contact Lenses" &&
                          item.gender.length > 0 && (
                            <div>
                              <h1 className="font-bold text-black">
                                {Strings.GENDER}
                              </h1>
                              <ul className="space-y-[4px]">
                                {item.gender.map((gender, subIndex) => (
                                  <li
                                    key={subIndex}
                                    className="hover:text-PictonBlue cursor-pointer text-black font-normal text-xs"
                                  >
                                    <a
                                      href={`/${item.category
                                        .toLowerCase()
                                        .replace(
                                          /\s+/g,
                                          "-"
                                        )}/${`glasses-for-${gender
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`}`}
                                    >
                                      {gender.charAt(0).toUpperCase() +
                                        gender.slice(1).toLowerCase()}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>

                      <div>
                        {item.brand && item.brand.length > 0 && (
                          <>
                            <h1 className="font-bold text-black">
                              {Strings.BRANDS}
                            </h1>
                            <ul
                              className={`${
                                item.brand.length > 11
                                  ? "grid grid-cols-2 gap-x-20"
                                  : ""
                              } space-y-[4px]`}
                            >
                              {/* <ul
                              className={
                                item.category.toLowerCase() === "brands"
                                  ? "grid grid-cols-3 gap-x-20"
                                  : "space-y-[4px]"
                              }
                            > */}
                              {item.brand.map((brand, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer text-black font-medium text-xs"
                                  // onClick={() => handleBrandClick(brand)}
                                >
                                  <a
                                    href={`/${item.category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${brand
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")
                                      .replace(/&/g, "and")}${
                                      item.category.toLowerCase() ===
                                        "contact lenses" ||
                                      item.category.toLowerCase() ===
                                        "myopia control glasses"
                                        ? "-lens"
                                        : "-frames"
                                    }`}
                                  >
                                    {brand.charAt(0).toUpperCase() +
                                      brand.slice(1).toLowerCase()}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      <div>
                        {item.color && item.color.length > 0 && (
                          <>
                            <h1 className="font-bold text-black">
                              {Strings.COLOR}
                            </h1>
                            <ul className="space-y-[4px]">
                              {item.color.map((color, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer text-black font-medium text-xs"
                                  // onClick={() => handleColorClick(color)}
                                >
                                  <a
                                    href={`/${item.category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${color
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}${
                                      item.category.toLowerCase() ===
                                        "contact lenses" ||
                                      item.category.toLowerCase() ===
                                        "myopia control glasses"
                                        ? "-lens"
                                        : "-frames"
                                    }`}
                                  >
                                    {color.charAt(0).toUpperCase() +
                                      color.slice(1).toLowerCase()}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      <div>
                        {item.style && item.style.length > 0 && (
                          <>
                            <h1 className="font-bold text-black">
                              {Strings.STYLE}
                            </h1>
                            <ul className="space-y-[4px]">
                              {item.style.map((style, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer text-black font-medium text-xs"
                                >
                                  <Link
                                    href={`/${item.category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${style
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}-frames`}
                                  >
                                    {style.charAt(0).toUpperCase() +
                                      style.slice(1).toLowerCase()}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      <div>
                        {item.shape && item.shape.length > 0 && (
                          <>
                            <h1 className="font-bold text-black">
                              {Strings.SHAPE}
                            </h1>
                            <ul className="space-y-[4px]">
                              {item.shape.map((shape, subIndex) => (
                                <li
                                  key={subIndex}
                                  className="hover:text-PictonBlue cursor-pointer text-black font-medium text-xs"
                                >
                                  <Link
                                    href={`/${item.category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}/${shape
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}-frames`}
                                  >
                                    {shape.charAt(0).toUpperCase() +
                                      shape.slice(1).toLowerCase()}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null)
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
