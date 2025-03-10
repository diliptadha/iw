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

const Headerforfaqs: React.FC<HeaderProps> = ({ setSearch }) => {
  const router = useRouter();

  const { cart }: any = useCart();
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    "English"
  );
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [rotateImage, setRotateImage] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
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
  const handleMenuItemClick = () => {
    setShowMenu(false);
  };

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

  const handleLanguageClick = (language: string) => {
    setSelectedLanguage((prevLanguage) =>
      prevLanguage === language ? null : language
    );
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
        <div className=" max-w-screen-2xl m-auto fixed top-0 z-index2 bg-PictonBlue xs:px-[16px] md:px-[46px] h-16 w-full flex justify-between items-center">
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
                className={`h-7 w-[90px] rounded-[5px] flex items-center justify-center ${
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
                <div className="space-y-4">
                  <div className="flex items-center cursor-pointer">
                    <Image height={16} width={16} alt="/" src={Images.home} />
                    <Link href={"/"}>
                      <p className="text-white font-normal text-xs ml-2">
                        {Strings.HOME}
                      </p>
                    </Link>
                  </div>
                  <p className="border-[0.5px] border-white"></p>
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

                  <p className="border-[0.5px] border-white"></p>

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

                  <p className="border-[0.5px] border-white"></p>
                  <div
                    onClick={openWhatsApp}
                    className="flex items-center cursor-pointer"
                  >
                    <Image src={Images.vector} alt="/" height={18} width={18} />
                    <p className="text-white font-normal text-xs ml-2">
                      {Strings.TALK_WITH_US}
                    </p>
                  </div>
                  <p className="border-[0.5px] border-white"></p>
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
      </div>
    </>
  );
};

export default Headerforfaqs;
