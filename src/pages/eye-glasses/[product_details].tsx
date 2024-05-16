"use client";

import "../../../src/app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useRef, useState } from "react";

import GiveRatings from "@/Component/GiveRatings";
import Header from "@/Component/header";
import Image from "next/image";
import Link from "next/link";
import LoginModal from "@/Component/LoginModal";
import Review from "@/Component/reviews";
import ShareOptions from "@/Component/share";
import SimilarProductPage from "../similar_products";
import axios from "axios";
import { useRouter } from "next/router";
interface ProductData {
  ProductData: any;
  FilteredSubProductData: any;
  originalPrice: any;
  brands: any;
  category: any;
  frameStyle: any;
  frameMaterial: any;
  frameShape: any;
  frameColor: any;
  frameSize: any;
  width: any;
  height: any;
  length: any;
  frameWeight: any;
  modelNumber: any;
  title: any;
  productImage: any;
  variantImage: any;
  fullDesc: any;
  boxImage: any;
  color: any;
  productId: any;
  subProductId: any;
  SKU: any;
  salePrice: any;
}

interface ExpectedDelivery {
  expected: any;
}

interface Recent {
  length: number;
  userImage: any;
  fName: any;
  lName: any;
  createdAt: any;
  rating: any;
  comment: any;
}

const ProductDetails = () => {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pincode, setPincode] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [isPincodeValid, setIsPincodeValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isOpenReview, setIsOpenReview] = useState(false);
  const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const textareaRef = useRef(null);
  const [message, setMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [rating, setRating] = useState(0);
  const [showRatingWarning, setShowRatingWarning] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const reviewContainerRef = useRef(null);
  const [buttonsMarginTop, setButtonsMarginTop] = useState(0);
  const [nextDivMarginTop, setNextDivMarginTop] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const [productData, setProductData] = useState<ProductData | null>(null);
  const [expectedDelivery, setExpectedDelivery] =
    useState<ExpectedDelivery | null>(null);
  const [recentReviews, setRecentReviews] = useState<Recent[]>([]);
  const [selectedSubProduct, setSelectedSubProduct] = useState<{
    ProductData: any;
    FilteredSubProductData?: any;
    originalPrice?: any;
    brands?: any;
    category?: any;
    frameStyle?: any;
    frameMaterial?: any;
    frameShape?: any;
    frameColor?: any;
    frameSize?: any;
    width?: any;
    salePrice?: any;
  } | null>(null);

  let productId: string | null;
  let subProductId: string | null;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("userId");
    }
    return false;
  });

  useEffect(() => {
    productId = localStorage.getItem("productId");
    subProductId = localStorage.getItem("subProductId");
    if (productId && subProductId) {
      productdata();
    }
  }, []);

  const productdata = async () => {
    if (!productId || !subProductId) {
      console.error("productId or subProductId is null.");
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getProductData?productId=${productId}&subProductId=${subProductId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      if (responseData.productData) {
        setProductData(responseData.productData);
        setSelectedSubProduct(responseData.productData); // Set selected subProduct initially
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  const handleColorClick = (subProduct: { subProductId: any }) => {
    const selectedVariant = productData?.FilteredSubProductData.find(
      (variant: any) => variant.subProductId === subProduct.subProductId
    );
    if (selectedVariant) {
      setSelectedSubProduct({
        ...productData,
        ProductData: {
          ...productData?.ProductData,
          ...selectedVariant,
          color: productData?.ProductData.color,
        },
      });
    }
  };

  // useEffect(() => {
  //   async function fetchRecentReviews() {
  //     try {
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_API_URL}home/getRecenetReviews`
  //       );
  //       const recentReviewsData = response.data.recentReviews;
  //       setRecentReviews(recentReviewsData.slice(0, 2));
  //     } catch (error) {
  //       console.error("Error fetching recent reviews:", error);
  //     }
  //   }

  //   fetchRecentReviews();
  // }, []);

  const handleSubmit = async () => {
    if (pincode.length !== 6 || isNaN(parseInt(pincode, 10))) {
      setPincodeError("Please enter a valid 6-digit Pincode.");
      setIsSubmitted(true);
      return;
    }

    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getExpectedDeliveryDate`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = response.data;
      const expectedDeliveryData = responseData.expectedDeliveryData;

      setExpectedDelivery(expectedDeliveryData);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error fetching expected delivery date:", error);
    }
  };

  // const handleToggleFavorite = () => {
  //   setIsFavorite((prevState) => !prevState);
  // };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdownReview = () => {
    setIsOpenReview(!isOpenReview);
  };

  const closeWriteReviewModal = () => {
    setIsOpenWriteReview(false);
    setShowThankYouMessage(false);
  };

  useEffect(() => {
    if (reviewContainerRef.current) {
      const containerHeight = (reviewContainerRef.current as HTMLDivElement)
        .clientHeight;
      setButtonsMarginTop(containerHeight);
      setNextDivMarginTop(containerHeight + 50);
    }
  }, [isOpenReview]);

  const handlePincodeChange = (e: any) => {
    let { value } = e.target;
    const sanitizedValue = value.replace(/\D/g, "").slice(0, 6);
    setPincode(sanitizedValue);
    setPincodeError("");
    setIsSubmitted(false);

    value = sanitizedValue;

    if (value.length === 6) {
      setIsPincodeValid(true);
    } else {
      setIsPincodeValid(false);
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handleScrollRight2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const maxScrollRight = containerWidth - containerScrollWidth;

      const scrollStep = containerScrollWidth + 0.4;

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
      const scrollStep = containerScrollWidth + 0.4;

      if (scrollPosition > 0) {
        const newScrollPosition = Math.max(scrollPosition - scrollStep, 0);
        containerRef2.current.scrollBy({
          left: -scrollStep,
          behavior: "smooth",
        });
        setScrollPosition(newScrollPosition);
      } else {
        const maxScrollRight = containerWidth - containerScrollWidth;
        containerRef2.current.scrollTo({
          left: maxScrollRight,
          behavior: "smooth",
        });
        setScrollPosition(maxScrollRight);
      }
    }
  };

  const handleTextarea = (e: any) => {
    const inputValue = e.target.value;

    setMessage(inputValue);
  };

  const handleRatingChange = (newRating: React.SetStateAction<number>) => {
    4;
    setRating(newRating);
  };

  const openModal = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (isOpenWriteReview || open) {
      document.body.classList.add("modal-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("modal-open");
      document.body.style.overflow = "";
    }
  }, [isOpenWriteReview, open]);

  const handleReviewSubmit = async () => {
    if (message.trim().length === 0 || rating === 0) {
      setShowWarning(message.trim().length === 0);
      setShowRatingWarning(rating === 0);
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}home/addReview?userId=${userId}&productId=${productId}`,
          {
            fname: "John",
            lname: "Doe",
            rating: rating,
            comment: message,
          }
        );
        console.log("Review submitted successfully:", response.data);

        setMessage("");
        setRating(0);
        setShowThankYouMessage(true);
      } catch (error) {
        console.error("Error submitting review:", error);
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: { target: any }) => {
      if (
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleShareClick = () => {
    setShowOptions(!showOptions);
  };
  const handleOptionClick = (url: any) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    var userId: string | null;
    userId = localStorage.getItem("userId");
  }, []);

  const addToCart = async () => {
    try {
      if (!userId) {
        setShowLoginModal(true);
        return;
      } else {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}product/addToCartProduct?userId=${userId}`,
          {
            cartProducts: [
              {
                productId: selectedSubProduct?.ProductData.productId,
                subProductId: selectedSubProduct?.ProductData.subProductId,
                size: selectedSubProduct?.ProductData.frameSize,
                quantity: 1,
                salePrice: selectedSubProduct?.ProductData.salePrice,
                originalPrice: selectedSubProduct?.ProductData.originalPrice,
                productImage: selectedSubProduct?.ProductData.productImage,
              },
            ],
          },

          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        showCartMessage("Product added to cart successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // const router = useRouter();

  const handleBuyNow = async () => {
    try {
      if (!userId) {
        setShowLoginModal(true);
        return;
      }
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}product/addToCartProduct?userId=${userId}`,
        {
          cartProducts: [
            {
              productId: selectedSubProduct?.ProductData.productId,
              subProductId: selectedSubProduct?.ProductData.subProductId,
              size: selectedSubProduct?.ProductData.frameSize,
              quantity: 1,
              salePrice: selectedSubProduct?.ProductData.salePrice,
              originalPrice: selectedSubProduct?.ProductData.originalPrice,
              productImage: selectedSubProduct?.ProductData.productImage,
            },
          ],
        },

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showCartMessage("Product added to cart successfully!");
      window.location.href = "/cart";
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const [cartMessage, setCartMessage] = useState<string | null>(null);

  const showCartMessage = (message: string) => {
    setCartMessage(message);
    setTimeout(() => {
      setCartMessage(null);
    }, 5000);
  };
  const [search, setSearch] = useState("");

  const [review, setReview] = useState<Recent[]>([]);

  const fetchReviews = async () => {
    try {
      console.log("Product ID:", productId);
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}home/getReviewsByProductId?productId=${productId}`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setReview(response.data.productReviews);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [lastInteractedProductId, setLastInteractedProductId] = useState<
    string | null
  >(null);
  const [showLoginModal1, setShowLoginModal1] = useState(false);

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
      setShowLoginModal1(false);
      setIsAuthenticated(true);
      setUserId(response.data.signInData.userData.userId);
    } catch (error) {
      console.log(error);
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

  const handleToggleFavorite = (productId: any) => {
    if (!isAuthenticated) {
      setShowLoginModal1(true);
      setLastInteractedProductId(productId);
      return;
    }
    if (userId) {
      if (favoriteStatus[productId]) {
        removeFavoriteProduct(productId, userId);
      } else {
        addToFavorite(productId, userId);
      }
    } else {
      console.log("User ID is null. Cannot add to favorites.");
    }
  };

  useEffect(() => {
    if (showLoginModal1) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoginModal1]);

  return (
    <>
      <div>
        <Header setSearch={setSearch} />
        {selectedSubProduct && (
          <div className="bg-white px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] p-black mx-auto- md:w-[50%]- lg:w-full-">
            <div className="p-1 bg-white w-full text-lato text-[14px] ">
              <span>Eyewear </span> <span> /</span>
              <span> {selectedSubProduct.ProductData?.category} </span>{" "}
              <span> /</span>
              <span> {selectedSubProduct.ProductData?.gender} </span>{" "}
              <span> /</span>
              <span> {selectedSubProduct.ProductData?.productId} </span>{" "}
              <span> / </span>
              <span className="text-PictonBlue">
                {selectedSubProduct.ProductData?.title}
              </span>
            </div>
            <>
              <div className="bg-red-200- mt-2 flex flex-col md:flex-row gap-[30px]">
                {selectedSubProduct?.ProductData?.variantImage.length > 0 ? (
                  <div className="bg-blue-200- flex flex-row md:flex-col items-center ">
                    <Image
                      onClick={handleScrollLeft2}
                      src={Images.Lefticon}
                      alt="/"
                      height={40}
                      width={40}
                      className=" h-[24px] [w-24px] cursor-pointer text-blue-300  flex md:hidden"
                    />

                    <div
                      ref={containerRef2}
                      className="overflow-x-auto flex md:flex-wrap mx-0 lg:mx-1 "
                    >
                      <Image
                        height={500}
                        width={500}
                        src={selectedSubProduct.ProductData?.productImage}
                        alt="productImage"
                        className="image2 md:mb-1 lg:mb-2 md:mr-1 lg:mr-2 border border-black rounded"
                        loading="lazy"
                      />
                      {Array.isArray(
                        selectedSubProduct.ProductData?.variantImage
                      ) &&
                        selectedSubProduct.ProductData.variantImage.map(
                          (image: any, index: any) => (
                            <Image
                              height={500}
                              width={500}
                              key={index}
                              src={image}
                              alt="variant"
                              className={`image2 ${
                                index === 0
                                  ? "md:mb-1 md:mr-1 lg:mb-2"
                                  : "md:mr-1 md:mb-1 lg:mb-0 lg:mr-2"
                              } border border-black rounded`}
                              loading="lazy"
                            />
                          )
                        )}
                    </div>

                    <Image
                      onClick={handleScrollRight2}
                      src={Images.Righticon}
                      alt="/"
                      height={40}
                      width={40}
                      className=" h-[24px] [w-24px]  cursor-pointer hover:text-PictonBlue flex md:hidden"
                    />
                  </div>
                ) : (
                  <div className="w-[100%]">
                    <img
                      src={selectedSubProduct.ProductData?.productImage}
                      alt="productImage"
                      className=" w-[100%] h-auto md:mb-1 lg:mb-2 md:mr-1 lg:mr-2 border border-black rounded"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="bg-blue-200- text-lato flex flex-col w-full  lg:w-[410px] xl:w-[520px] mt-4 md:mt-0  lg:ml-6 lg:ml-[-80px]- xl:ml-[-50px]-  relative">
                  <div className="flex justify-between">
                    <p className="text-md lg:text-[34px] xl:text-[40px] font-bold flex-start">
                      {selectedSubProduct.ProductData?.productId}
                    </p>
                    <div className="flex justify-end">
                      <button
                        className=""
                        onClick={() =>
                          handleToggleFavorite(
                            selectedSubProduct.ProductData?.productId
                          )
                        }
                      >
                        {favoriteStatus[
                          selectedSubProduct.ProductData?.productId
                            ? Array.isArray(
                                selectedSubProduct.ProductData?.productId
                              )
                              ? selectedSubProduct.ProductData?.productId[0]
                              : selectedSubProduct.ProductData?.productId
                            : ""
                        ] ? (
                          <Image
                            src={Images.WISHLIST}
                            alt="/"
                            height={24}
                            width={24}
                          />
                        ) : (
                          <Image
                            src={Images.FILLWISHLIST}
                            alt="/"
                            height={24}
                            width={24}
                          />
                        )}
                      </button>
                      {showLoginModal1 && !isAuthenticated && (
                        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
                          <div className=" mt-10 items-center- justify-center- flex- rounded-md bg-white p-5 xs:h-[270px]- xs:w-[310px] md:h-[270px]- md:w-[460px] ">
                            <div>
                              <div className="flex justify-between">
                                <h1 className="text-base font-medium text-black">
                                  {Strings.SIGN_IN}
                                </h1>
                                <button
                                  className="outline-none"
                                  onClick={() => setShowLoginModal1(false)}
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
                                      disabled={
                                        !isValidEmail || email.trim() === ""
                                      }
                                      className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                                    >
                                      {Strings.Login}
                                    </button>
                                  ) : (
                                    <button
                                      onClick={verifyOTP}
                                      disabled={
                                        !isValidEmail || email.trim() === ""
                                      }
                                      className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                                    >
                                      {Strings.Verify_OTP}
                                    </button>
                                  )
                                ) : (
                                  <button
                                    onClick={handleSendOtp}
                                    disabled={
                                      !isValidEmail || email.trim() === ""
                                    }
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
                      <button
                        className="ml-4 mr-2 p-0"
                        onClick={handleShareClick}
                      >
                        <Image
                          src={Images.SHARE}
                          width={23}
                          height={23}
                          alt="share"
                          className="w-[18px] h-[18px] lg:w-[23px] lg:h-[23px]"
                        />
                      </button>
                      {showOptions && (
                        <ShareOptions onOptionClick={handleOptionClick} />
                      )}
                    </div>
                  </div>

                  <p className=" text-PictonBlue text-md lg:text-[24px] font-medium w-[200px] lg:w-[300px] ">
                    {selectedSubProduct?.ProductData?.title} /{" "}
                    {selectedSubProduct?.ProductData?.subProductId}
                  </p>
                  <p className="text-[14px] font-medium">FRAME + LENS</p>

                  <div className="flex mt-4 text-md lg:text-[34px] xl:text-[40px] font-bold">
                    <p>
                      ₹{" "}
                      {selectedSubProduct?.ProductData?.originalPrice?.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                  <p className="text-[14px] font-medium">
                    {Strings.INCLUSIVE_TAXES}
                  </p>
                  <div className="mt-4 space-x-6">
                    <button
                      className="product-color-button"
                      style={{
                        backgroundColor: selectedSubProduct?.ProductData?.color
                          .toLowerCase()
                          .replace(/\s/g, ""),
                      }}
                      onClick={() => productdata()}
                    ></button>
                    {productData &&
                      productData.FilteredSubProductData.map(
                        (subProduct: any, index: number) => (
                          <button
                            key={index}
                            className="product-color-button"
                            style={{
                              backgroundColor: subProduct.color
                                .toLowerCase()
                                .replace(/\s/g, ""),
                            }}
                            onClick={() => handleColorClick(subProduct)}
                          ></button>
                        )
                      )}
                  </div>

                  {/* addto cart button  */}
                  <div className="mt-2 lg:mt-4 flex flex-row items-center">
                    <button
                      onClick={() => addToCart()}
                      className="w-[136px] h-38 rounded-md text-sm text-black bg-white flex items-center justify-center border border-black outline-none px-2 lg:px-4 py-2 hover:text-PictonBlue hover:border-PictonBlue hover:font-bold"
                    >
                      {Strings.ADD_TO_CART}
                    </button>
                    <LoginModal
                      showLoginModal={showLoginModal}
                      setShowLoginModal={setShowLoginModal}
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                    />

                    <button
                      onClick={() => handleBuyNow()}
                      className="ml-2 lg:ml-4 w-[136px] h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue"
                    >
                      {Strings.BUY_NOW}
                    </button>
                  </div>

                  {cartMessage && (
                    <div className="mt-4 text-sm text-green-600">
                      {cartMessage}
                    </div>
                  )}
                  <div className="mt-6 flex flex-row text-[12px] xl:text-[14px]">
                    <div className="flex flex-col lg:flex-row items-center justify-center xs:items-center xs:justify-start">
                      <Image
                        src={Images.GUARANTEE}
                        width={50}
                        height={46}
                        alt="GUARANTEE"
                        className="w-[40px] h-[44px]  lg:w-[40px] lg:h-[46px] "
                      />
                      <p className=" mt-2 lg:mt-1 lg:ml-2  w-[85px] md:w-[100px] text-center">
                        {Strings.GUARANTEE}
                      </p>
                    </div>
                    <div className="ml-2 xl:ml-4 md:ml-0 flex flex-col lg:flex-row items-center xs:items-center justify-center xs:justify-start">
                      <Image
                        src={Images.RETURNS}
                        width={40}
                        height={40}
                        alt="RETURNS"
                        className="w-[40px] h-[40px] "
                      />
                      <p className=" mt-2 lg:mt-1 lg:ml-2  w-[85px] md:w-[100px] text-center">
                        {Strings.RETURNS_POLICY}
                      </p>
                    </div>
                    <div className="ml-2 xl:ml-4 md:ml-0 flex flex-col lg:flex-row items-center xs:items-center justify-center xs:justify-start">
                      <Image
                        src={Images.TEST_EXCHANGE}
                        width={27}
                        height={36}
                        alt="TEST_EXCHANGE"
                        className="w-[36px] h-[40px]"
                      />
                      <p className="testwidth mt-2 lg:mt-1 lg:ml-2 w-[110px] lg:w-[140px] text-center">
                        {Strings.TEST_EXCHANGE}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-4 lg:mt-6 flex justify-between mb-4 lg:mb-6 w-full lg:w-[410px] xl:w-[520px]">
                    <p className="text-[14px] font-bold">
                      {Strings.PRODUCT_INFORMATION}
                    </p>
                    <div className="">
                      <button
                        className={`focus:outline-none transition-transform duration-400 ease-in-out ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        onClick={toggleDropdown}
                      >
                        <Image
                          height={12}
                          width={12}
                          src={Images.DOWN_ARROW}
                          alt="Dropdown Arrow"
                        />
                      </button>
                      {isOpen && (
                        <ul
                          id="dropdown-menu"
                          className="bg-red-300'
                         absolute right-0 bg-white mt-2 w-full text-[14px]"
                        >
                          <li className="flex justify-between">
                            <p className="font-bold">{Strings.BRAND_NAME}</p>
                            <p>
                              {selectedSubProduct.ProductData?.brands || "-"}
                            </p>
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.PRODUCT_TYPE}</p>
                            <p>
                              {selectedSubProduct.ProductData?.category || "-"}
                            </p>
                          </li>
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.FRAME_STYLE}</p>
                            <p>
                              {selectedSubProduct.ProductData?.frameStyle ||
                                "-"}
                            </p>
                          </li>
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">
                              {Strings.FRAME_MATERIAL}
                            </p>
                            <p>
                              {selectedSubProduct.ProductData?.frameMaterial ||
                                "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.FRAME_SHAPE}</p>
                            <p>
                              {selectedSubProduct.ProductData?.frameShape ||
                                "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.FRAME_COLOR}</p>
                            <p>
                              {selectedSubProduct.ProductData?.frameColor ||
                                "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">
                              {Strings.SIZE_DIMENSIONS}
                            </p>
                            <p className="text-black ">
                              {selectedSubProduct?.ProductData?.frameSize ||
                                "-"}{" "}
                              / {selectedSubProduct?.ProductData?.width || "-"}{" "}
                              x {selectedSubProduct?.ProductData?.height || "-"}{" "}
                              x {selectedSubProduct?.ProductData?.length || "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.WEIGHT}</p>
                            <p>
                              {selectedSubProduct.ProductData.frameWeight ||
                                "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                          <li className="common-style">
                            <p className="font-bold">{Strings.MODEL_NUMBER}</p>
                            <p>
                              {selectedSubProduct.ProductData.SKU || "-"}
                            </p>{" "}
                          </li>{" "}
                          <div className="common-divider"></div>
                        </ul>
                      )}
                    </div>
                  </div>
                  <div style={{ marginTop: isOpen ? "230px" : "0" }}>
                    <p className="text-[14px] font-bold">
                      {Strings.CHECK_DELIVERY_DATE}
                    </p>
                    <div className="mt-2 flex justify-row relative">
                      <input
                        type="Pincode"
                        placeholder="Enter your pincode"
                        value={pincode}
                        onChange={handlePincodeChange}
                        className="border-Cod_Gray rounded-lg text-[14px]  text-black placeholder-black bg-[#E5E5E4] px-4 py-2 outline-none dark:border-white dark:bg-[#000] w-full xs:text-base lg:text-md md:w-[280px] lg:w-[260px]"
                      />
                      <button
                        onClick={handleSubmit}
                        className="absolute inset-y-0 right-0 flex  items-center px-2 md:left-60 lg:left-56"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6 text-black hover:text-PictonBlue cursor-pointer"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                          />
                        </svg>
                      </button>
                    </div>
                    {isSubmitted && (
                      <>
                        {!isPincodeValid ? (
                          <p className="m-2 text-md text-red-500">
                            {pincodeError}
                          </p>
                        ) : (
                          <>
                            {expectedDelivery ? (
                              <div className="flex flex-row mt-2 text-sm md:text-md border border-green-500 text-green-500 p-2 rounded w-full lg:w-[400px] xl:w-[550px]">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2.5"
                                  stroke="#75F94D"
                                  className="w-5 h-5"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                                <p>
                                  {" "}
                                  {Strings.PRODUCT_WILL_DELIVER}{" "}
                                  {expectedDelivery.expected}
                                </p>
                              </div>
                            ) : (
                              <p className="mt-2 text-sm md:text-md border border-red-500 text-red-500 p-2 rounded w-full lg:w-[325px]">
                                {pincodeError}
                              </p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>{" "}
            </>

            <div className="mt-4 lg:mt-6  w-full lg:w-[600px] xl:w-[775px]">
              <div className="flex flex-col md:flex-row items-center md:items-end ">
                <p id="content">
                  {expanded
                    ? selectedSubProduct.ProductData?.fullDesc
                    : selectedSubProduct?.ProductData?.fullDesc?.substring(
                        0,
                        260
                      )}
                </p>
                {!expanded && (
                  <button
                    id="readMoreBtn"
                    className="ml-0 md:ml-12 mt-1 md:mt-0 w-[138px] h-17 md:w-[240px] h-10 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue"
                    onClick={toggleExpanded}
                  >
                    {Strings.READ_MORE}
                  </button>
                )}
              </div>
              <div className="relative mt-4 lg:mt-6 flex justify-between items">
                <div className="font-bold text-[12px] lg:text-[14px]">
                  {Strings.REVIEWS}
                </div>
                <div className="">
                  <button
                    className={`focus:outline-none h-4 w-4 flex items-center transition-transform duration-400 ease-in-out ${
                      isOpenReview ? "rotate-180" : ""
                    }`}
                    onClick={toggleDropdownReview}
                  >
                    <Image
                      height={12}
                      width={12}
                      src={Images.DOWN_ARROW}
                      alt="Dropdown Arrow"
                    />
                  </button>
                  {isOpenReview && (
                    <div
                      className="absolute right-0 w-full lg:w-[600px] xl:w-[775px]"
                      ref={reviewContainerRef}
                    >
                      {review?.slice(0, 2)?.map((review: any, index: any) => {
                        const createdAtDate = new Date(review?.createdAt);

                        const formattedDate = createdAtDate
                          .toISOString()
                          .split("T")[0];
                        return (
                          <div key={index}>
                            <Review
                              userImage={review?.userImage}
                              fName={review?.fName}
                              lName={review?.lName}
                              createdAt={formattedDate}
                              rating={review?.rating}
                              comment={review?.comment}
                              index={index}
                              totalReviews={review.length}
                            />
                            {index !== 1 && (
                              <div className="h-[0.5px] bg-black rounded-xl mt-[2px]"></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {open && (
                    <div className="fixed top-0 left-0 z-50 flex justify-center items-center h-full w-full bg-gray-500 bg-opacity-80">
                      <div className="relative bg-white h-[500px] w-[300px] md:w-[600px] lg:w-[700px] lg:h- overflow-y-auto py-4  md:py-5  rounded">
                        <div className="flex flex-row justify-between px-4 md:px-16">
                          <p className=" text-lg w-full md:text-xl lg:text-2xl font-bold">
                            {Strings.REVIEWS}
                          </p>
                          <div className="fixed ml-[240px] md:ml-[540px] lg:ml-[640px] ">
                            <button
                              onClick={openModal}
                              className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                width="20px"
                                height="20px"
                              >
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="bg-[#f2f2f2] shadow-md rounded-md mt-2 px-4 py-[1px] mb-1">
                          {review?.slice(2)?.map((review, index) => {
                            const createdAtDate = new Date(review?.createdAt);

                            const formattedDate = createdAtDate
                              .toISOString()
                              .split("T")[0];

                            return (
                              <div key={index}>
                                <Review
                                  userImage={review?.userImage}
                                  fName={review?.fName}
                                  lName={review?.lName}
                                  createdAt={formattedDate}
                                  rating={review?.rating}
                                  comment={review?.comment}
                                  index={index}
                                  totalReviews={review.length}
                                />
                                {index < review.length - 1 && (
                                  <div className="h-[0.5px] bg-black rounded-xl mt-[2px]"></div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {isOpenReview && (
                <div
                  style={{ marginTop: buttonsMarginTop }}
                  className=" lg:mt-4 flex flex-row absolute"
                >
                  <button
                    onClick={openModal}
                    className={`${
                      review.length <= 2 ? "hidden" : "flex"
                    } w-[126px] h-[34px]  md:w-[136px] md:h-38 rounded-md text-sm text-black bg-white flex items-center justify-center border-2 border-black outline-none px-1 lg:px-2 py-2 hover:text-PictonBlue hover:border-PictonBlue hover:font-bold`}
                  >
                    {Strings.MORE_REVIEWS}
                  </button>

                  {isOpenWriteReview && !showThankYouMessage && (
                    <div className="fixed top-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-500 bg-opacity-[80%]">
                      <div className="relative bg-white h-[320px] md:h-[340px] lg:h-[360px] w-[300px] md:w-[500px] overflow-y-auto py-4 px-4 md:py-8 md:px-16 rounded">
                        <div className="flex flex-row justify-between">
                          <p className=" text-lg md:text-xl lg:text-2xl font-bold">
                            {Strings.WRITE_A_REVIEW}
                          </p>
                          <div className="fixed ml-[240px] md:ml-[440px] lg:ml-[440px] lg:mt-[-20px]">
                            {" "}
                            <button
                              onClick={closeWriteReviewModal}
                              className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 50 50"
                                width="20px"
                                height="20px"
                              >
                                <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex flex-row items-center">
                          {" "}
                          <p className="text-lg">
                            {Strings.RATE_THIS_PRODUCT}
                          </p>{" "}
                          <div className="ml-2">
                            <GiveRatings
                              giverating={rating}
                              onRatingChange={handleRatingChange}
                            />
                          </div>{" "}
                        </div>
                        <textarea
                          id="message"
                          rows={4}
                          ref={textareaRef}
                          className="mt-2 w-full border-Cod_Gray focus:ring-Cod_Gray focus:border-Cod_Gray dark:focus:ring-Cod_Gray dark:focus:border-Cod_Gray block rounded-lg border-[1px] border-[#000] bg-white p-2.5 outline-none dark:border-white dark:bg-[#000] dark:text-white dark:placeholder-gray-400 xs:text-base lg:text-lg"
                          placeholder="What did you like about this product write here...."
                          name="Massage"
                          value={message}
                          onChange={handleTextarea}
                        ></textarea>
                        <div className="mt-2 flex-start">
                          {showRatingWarning && (
                            <p className=" font-outfit text-red-500">
                              {Strings.PLEASE_GIVE_RATING}
                            </p>
                          )}
                          {showWarning && (
                            <p className=" font-outfit text-red-500">
                              {Strings.PLEASE_WRITE_ABOUT_PRODUCT}
                            </p>
                          )}
                        </div>
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => {
                              if (message.trim().length === 0 || rating === 0) {
                                setShowWarning(message.trim().length === 0);
                                setShowRatingWarning(rating === 0);
                              } else {
                                handleReviewSubmit();
                              }
                            }}
                            className="text-black  mt-5 hover:text-PictonBlue hover:border-PictonBlue rounded-full  border-2 bg-gradient-to-t px-5 py-2 text-md md:text-lg font-semibold  border-black border:red-600 "
                          >
                            {Strings.SUBMIT}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {showThankYouMessage && (
                    <div className="fixed top-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-500 bg-opacity-[80%]">
                      <div className="relative bg-white h-[320px] md:h-[340px] lg:h-[360px] w-[300px] md:w-[500px] overflow-y-auto py-4 px-4 md:py-8 md:px-16 rounded">
                        <div className="fixed ml-[240px] md:ml-[440px] lg:ml-[440px] ">
                          {" "}
                          <button
                            onClick={closeWriteReviewModal}
                            className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 50 50"
                              width="20px"
                              height="20px"
                            >
                              <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
                            </svg>
                          </button>
                        </div>
                        <p className="flex items-center justify-center text-lg text-green-600  font-semibold">
                          {Strings.THANK_YOU_FOR_REVIEW}
                        </p>
                      </div>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      if (!isLoggedIn) {
                        setShowLoginModal(true);
                      } else {
                        setIsOpenWriteReview(true);
                      }
                    }}
                    className="ml-2 lg:ml-4 w-[126px] h-[34px]  md:w-[136px] md:h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-1 lg:px-2 py-2 hover:bg-PictonBlue"
                  >
                    {Strings.WRITE_A_REVIEW}
                  </button>
                  <LoginModal
                    showLoginModal={showLoginModal}
                    setShowLoginModal={setShowLoginModal}
                    isLoggedIn={isLoggedIn}
                    setIsLoggedIn={setIsLoggedIn}
                  />
                </div>
              )}
              {selectedSubProduct?.ProductData?.boxImage?.length > 0 && (
                <div
                  style={{
                    marginTop: isOpenReview ? nextDivMarginTop : "40px",
                  }}
                  className="font-bold text-[12px] lg:text-[14px]"
                >
                  {Strings.WHAT_COMES}
                </div>
              )}
              <div className="flex items-center">
                {Array.isArray(selectedSubProduct?.ProductData?.boxImage) &&
                  selectedSubProduct.ProductData.boxImage.map(
                    (imageUrl: any, index: any) => (
                      <React.Fragment key={index}>
                        <div>
                          <Image
                            src={imageUrl}
                            width={200}
                            height={200}
                            alt={`image-${index}`}
                            className={index === 2 ? "mx-2 md:mx-6" : ""}
                            loading="lazy"
                          />
                        </div>
                        {index <
                          selectedSubProduct.ProductData.boxImage.length -
                            1 && (
                          <span
                            className={index === 0 ? "mx-4 md:mx-6" : "mr-2"}
                          >
                            +
                          </span>
                        )}
                      </React.Fragment>
                    )
                  )}
              </div>
            </div>
          </div>
        )}
        <div style={{ marginTop: isOpenReview ? nextDivMarginTop : "40px" }}>
          <SimilarProductPage />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
