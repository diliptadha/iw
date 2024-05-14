import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import SimilarProduct from "@/Component/SimilarProduct";
import axios from "axios";
import { useRouter } from "next/router";

interface ProductData {
  color: any;
  rating: number | undefined;
  salePrice: any;
  description: string;
  title: string;
  productImage: string;
  isFavorite: boolean;
  productId: string;

  data: {
    // createdAt: number;
    variantImage: string[] | undefined;
    otherColors: any;
    subProductId: string;
    color: string;
    productImage: string;
    title: string;
    description?: string;
    price: number;
    rating: number;
    isBestSeller?: boolean;
    createdAt: string;
    isNew?: boolean;
  };
}
const SimilarProductPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [similarProductData, setSimilarProductData] = useState<ProductData[]>(
    []
  );

  const router = useRouter();

  useEffect(() => {
    async function fetchSimilarProductData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}product/getSimilarProductData?productId=${productId}`
        );
        const similarProductData = response.data.similarProductData;
        setSimilarProductData(similarProductData);
      } catch (error) {
        console.error("Error fetching similar product data:", error);
      }
    }

    fetchSimilarProductData();
  }, []);

  const handleScrollRight2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const maxScrollRight = containerWidth - containerScrollWidth;

      const scrollStep = containerScrollWidth; // Example adjustment, you can adjust this value as needed

      if (scrollPosition < maxScrollRight) {
        containerRef2.current.scrollBy({
          left: scrollStep,
          behavior: "smooth",
        });
        setScrollPosition(scrollPosition + scrollStep);
      } else {
        containerRef2.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrollPosition(0);
      }
    }
  };

  const handleScrollLeft2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const scrollStep = containerScrollWidth;

      if (scrollPosition > 0) {
        const newScrollPosition = Math.max(scrollPosition - scrollStep, 0);
        containerRef2.current.scrollBy({
          left: -scrollStep, // Negative value for scrolling left
          behavior: "smooth",
        });
        setScrollPosition(newScrollPosition);
      } else {
        // If already scrolled to the beginning, scroll to the end
        const maxScrollRight = containerWidth - containerScrollWidth;
        containerRef2.current.scrollTo({
          left: maxScrollRight,
          behavior: "smooth",
        });
        setScrollPosition(maxScrollRight);
      }
    }
  };

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [lastInteractedProductId, setLastInteractedProductId] = useState<
    string | null
  >(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const storedUserId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [userId, setUserId] = useState<string | null>(storedUserId);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userId);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const handleEmailChange = (e: { target: { value: any } }) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(emailValue);
    setIsValidEmail(isValidEmail);
  };

  const handleOtpChange = (e: { target: { value: any } }) => {
    const otpValue = e.target.value;

    if (!isNaN(otpValue)) {
      setOtp(otpValue);
    }
  };

  const handleSendOtp = async () => {
    try {
      let data = JSON.stringify({
        emailId: email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/sendOTP?emailId=${email}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setIsShow(true);
    } catch (error) {
      console.log(error);
    }
  };

  const verifyOTP = async () => {
    try {
      let data = JSON.stringify({
        Otp: otp,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/verifyOTP`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setOtpValid(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId && lastInteractedProductId) {
      addToFavorite(lastInteractedProductId, userId);
    }
  }, [userId, lastInteractedProductId]);

  const loginUser = async () => {
    try {
      let data = JSON.stringify({
        emailId: email,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      const userData = response.data.signInData.userData;
      const accessToken = response.data.signInData.access_token;

      localStorage.setItem("userId", userData.userId);
      localStorage.setItem("accessToken", accessToken);
      setShowLoginModal(false);
      setIsAuthenticated(true);
      setUserId(response.data.signInData.userData.userId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      setLastInteractedProductId(productId);
      return;
    }
    if (userId) {
      if (favoriteStatus[productId]) {
        // If product is already favorited, remove it
        removeFavoriteProduct(productId, userId);
      } else {
        // If product is not favorited, add it
        addToFavorite(productId, userId);
      }
    } else {
      console.log("User ID is null. Cannot add to favorites.");
    }
  };

  const addToFavorite = async (productId: string, userId: string) => {
    try {
      let data = JSON.stringify({
        userId: userId,
        productId: productId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/addToFavorite?userId=${userId}&productId=${productId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(
        "addToFavorite DATA:",
        data,
        JSON.stringify(response.data.similarProductData)
      );

      setFavoriteStatus((prevState) => ({
        ...prevState,
        [productId]: !prevState[productId],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteProduct = async (productId: string, userId: string) => {
    try {
      let data = JSON.stringify({
        userId: userId,
        productId: productId,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/removeFavoriteProduct?userId=${userId}&productId=${productId}`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.similarProductData));
      setFavoriteStatus((prevState) => {
        const newState = { ...prevState };
        delete newState[productId];
        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoginModal]);

  return (
    <div className="h-[520px] px-[1rem] md:px-[2rem] xl:px-[4rem] w-full  overflow-hidden bg-[#F2F2F2]">
      <div className=""></div>
      <p className="mt-8 px-[2rem] md:px-[2rem] font-bold text-[12px] lg:text-[16px]">
        {Strings.SIMILAR_PRODUCTS}
      </p>
      <div className="flex items-center">
        <Image
          onClick={handleScrollLeft2}
          src={Images.DOWN_ARROW}
          alt="/"
          height={16}
          width={16}
          className="rotate-90 cursor-pointer text-blue-300"
          loading="lazy"
        />
        <div
          ref={containerRef2}
          className="mt-5 mx-3 overflow-hidden flex space-x-10- w-full overflow-x-scroll no-scrollbar"
        >
          <div className="">
            <div className="relative h-[335px] w-[320px] rounded-[10px] mr-5 md:mr-10">
              <Image
                src={Images.EXPLORE}
                alt="/"
                height={345}
                width={330}
                className="relative"
              />
              <div className="absolute inset-0 flex flex-col items-center">
                <p className="mt-[160px] text-[64px] text-white font-extrabold"></p>
                <p className="mt-[-20px] text-[20px] font-medium"></p>
                <button className="mt-4 w-[136px] h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue">
                  {Strings.EXPLORE}
                </button>
              </div>
            </div>
          </div>
          {similarProductData &&
            Array.isArray(similarProductData) &&
            similarProductData.map((product, index) => (
              <SimilarProduct
                key={product.productId}
                productImage={product.productImage}
                title={product.title}
                description={product.description}
                salePrice={`₹ ${product.salePrice.toLocaleString("en-IN")}`}
                rating={product.rating}
                color={product.color}
                productId={product.productId}
                showLoginModal={showLoginModal}
                isAuthenticated={isAuthenticated}
                handleToggleFavorite={() =>
                  handleToggleFavorite(product.productId)
                }
                isFavorite={favoriteStatus[product.productId] || false}
                // isBestseller={index === 3}
              />
            ))}

          {showLoginModal && !isAuthenticated && (
            <div className="fixed left-0 top-0 z-50 flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
              <div className=" mt-10 items-center- justify-center- flex- rounded-md bg-white p-5 xs:h-[270px]- xs:w-[310px] md:h-[270px]- md:w-[460px] ">
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-base font-medium text-black">
                      {Strings.SIGN_IN}
                    </h1>
                    <button
                      className="outline-none"
                      onClick={() => setShowLoginModal(false)}
                    >
                      <Image
                        src={Images.Closeblack}
                        alt=""
                        height={20}
                        width={20}
                      />
                    </button>
                  </div>
                  <p className="border my-4"></p>
                  <h1 className="text-base font-normal text-black">
                    {Strings.Email}
                  </h1>
                  <input
                    id="emailInput"
                    className="outline-none w-full"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isShow}
                  />
                  {!isValidEmail && (
                    <p className="text-red-500 text-xs">
                      Please enter a valid email address.
                    </p>
                  )}
                  <p className="border border-black my-2"></p>
                  {isShow && (
                    <div className="mt-4">
                      <h1 className="text-base font-normal text-black">
                        {Strings.OTP}
                      </h1>
                      <input
                        className="outline-none w-full"
                        value={otp}
                        onChange={handleOtpChange}
                      />
                      <p className="border border-black mt-2"></p>
                    </div>
                  )}
                  <div>
                    {isShow ? (
                      otpValid ? (
                        <button
                          onClick={loginUser}
                          disabled={!isValidEmail || email.trim() === ""}
                          className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                        >
                          {Strings.Login}
                        </button>
                      ) : (
                        <button
                          onClick={verifyOTP}
                          disabled={!isValidEmail || email.trim() === ""}
                          className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                        >
                          {Strings.Verify_OTP}
                        </button>
                      )
                    ) : (
                      <button
                        onClick={handleSendOtp}
                        disabled={!isValidEmail || email.trim() === ""}
                        className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                      >
                        {Strings.Send_OTP}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Image
          onClick={handleScrollRight2}
          src={Images.DOWN_ARROW}
          alt="/"
          height={16}
          width={16}
          className="rotate-270  cursor-pointer hover:text-PictonBlue"
        />
      </div>
    </div>
  );
};

export default SimilarProductPage;
