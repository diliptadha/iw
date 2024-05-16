import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Images } from "@/constant";
import Link from "next/link";
import StarRating from "./StarRating";
import axios from "axios";

interface ProductData {
  FilteredSubProductData: any;
  SKU: string;
  boxImage: string[];
  brands: string;
  category: string;
  color: string;
  frameStyle: string;
  frameMaterial: string;
  frameShape: string;
  frameColor: string;
  frameSize: string;
  width: number;
  height: number;
  length: number;
  frameWeight: string;
  modelNumber: string;
  title: string;
  productImage: string;
  variantImage: string[];
  fullDesc: string;
  productId: string;
  subProductId: string;
}
interface SubProduct {
  subProductId: string;
  color: string;
  frameColor: string;
  productImage: string;
  variantImage: string;
}
interface ProductProps {
  image: string;
  title: string;
  color: string;
  description: string;
  price: string;
  rating?: number;
  colors?: string[];
  otherColors?: string[];
  productId?: string;
  variantImages?: string[];
  showLoginModal: boolean;
  isAuthenticated: boolean;
  handleToggleFavorite: () => void;
  isFavorite: boolean;
}

const Product: React.FC<ProductProps> = ({
  image,
  title,
  description,
  price,
  rating = 0,
  color,
  otherColors = [],
  colors = [],
  productId,

  variantImages = [],
  showLoginModal,
  isAuthenticated,
  handleToggleFavorite,
  isFavorite,
}) => {
  // const maxColorCount = 3;
  // const additionalColorCount = colors.length - maxColorCount;

  // const parsedColors = colors.map((color) => {
  //   return color.replace(/[\[\]]/g, "").split(",");
  // });

  const [displayColors, setDisplayColors] = useState<string[]>([]);
  const [remainingCount, setRemainingCount] = useState<number>(0);

  useEffect(() => {
    if (otherColors.length > 2) {
      setDisplayColors(otherColors.slice(0, 2));
      setRemainingCount(otherColors.length - 2);
    } else {
      setDisplayColors(otherColors);
    }
  }, [otherColors]);

  const [productData, setProductData] = useState<ProductData | null>(null);

  const getProductData = async () => {
    try {
      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/getProductData?productId=SC5355&subProductId=PS0000001`,
        headers: {},
        data: data,
      };

      axios.request(config).then((response: { data: any }) => {
        setProductData(response?.data?.productData?.ProductData);
        setCurrentImage(response?.data?.productData?.ProductData?.productImage);
        // console.log(JSON.stringify(response?.data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  const [originalImage, setOriginalImage] = useState(image);
  const [currentImage, setCurrentImage] = useState(image);
  const alternateImage = "/Images/CANNA-2068-BROWN TORTOISE-52-2.png";
  const handleImageClick = () => {
    if (
      productData &&
      productData?.variantImage &&
      productData?.variantImage.length > 0
    ) {
      setCurrentImage((prevImage) =>
        prevImage === originalImage
          ? productData?.variantImage[0]
          : originalImage
      );
    }
    console.log("dghrhtyhtthtyhrthrt", productData);
  };

  // const handleSendOtp = () => {
  //   setIsShow(true);
  // };

  // const [isValidEmail, setIsValidEmail] = useState(true);
  // const [email, setEmail] = useState("");
  // const [otp, setOtp] = useState("");
  // const [otpValid, setOtpValid] = useState(false);
  // const [isShow, setIsShow] = useState(false);
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const handleEmailChange = (e: { target: { value: any } }) => {
  //   const emailValue = e.target.value;
  //   setEmail(emailValue);

  //   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   const isValidEmail = emailRegex.test(emailValue);
  //   setIsValidEmail(isValidEmail);
  // };

  // const handleOtpChange = (e: { target: { value: any } }) => {
  //   const otpValue = e.target.value;

  //   if (!isNaN(otpValue)) {
  //     setOtp(otpValue);
  //   }
  // };

  // const handleSendOtp = async () => {
  //   try {
  //     let data = JSON.stringify({
  //       emailId: email,
  //     });

  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: `http://localhost:4000/user/sendOTP?emailId=${email}`,
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };
  //     const response = await axios.request(config);
  //     console.log(JSON.stringify(response.data));
  //     setIsShow(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const verifyOTP = async () => {
  //   try {
  //     let data = JSON.stringify({
  //       Otp: otp,
  //     });
  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "http://localhost:4000/user/verifyOTP",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };
  //     const response = await axios.request(config);
  //     console.log(JSON.stringify(response.data));
  //     setOtpValid(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const loginUser = async () => {
  //   try {
  //     let data = JSON.stringify({
  //       emailId: email,
  //     });
  //     let config = {
  //       method: "post",
  //       maxBodyLength: Infinity,
  //       url: "http://localhost:4000/user/login",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       data: data,
  //     };
  //     const response = await axios.request(config);
  //     console.log(JSON.stringify(response.data));
  //     setShowLoginModal(false);
  //     setIsFavorite(true);
  //     setIsAuthenticated(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const [isFavorite, setIsFavorite] = useState(false);
  // const [showLoginModal, setShowLoginModal] = useState(false);

  // const handleToggleFavorite = () => {
  //   if (!isAuthenticated) {
  //     setShowLoginModal(true);
  //     return;
  //   }
  //   setIsFavorite((prevState) => !prevState);
  // };

  // useEffect(() => {
  //   if (showLoginModal) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "";
  //   }
  // }, [showLoginModal]);
  // const [isFavorite, setIsFavorite] = useState(false);
  // const handleToggleFavorite = () => {
  //   setIsFavorite((prevState) => !prevState);
  // };

  return (
    <div>
      <div className="relative h-[315px] w-[280px] rounded-[10px] bg-white p-6 my-3 hover:shadow-lg">
        {/*  iksana.in/eyeglasses/brand-sku-color */}
        <Link href={`/eye-glasses/${productId}`}>
          <Image
            src={currentImage}
            height={140}
            width={220}
            className="h-32 object-cover"
            alt="/"
          // className="h-[144px] w-[243px]"
          />
        </Link>
        <div className="absolute- bottom-0- ">
          <p className="border-[.5px] border-black mt-[24px] mb-[10px]"></p>
          {/* <h1 className="font-extrabold text-[16px]">
            {title?.split("-").map((part, index) => (
              <React.Fragment key={index}>
                <span
                  className={index === 0 ? "font-extrabold" : "font-normal"}
                >
                  {part}
                </span>
                {index !== title.split("-").length - 1 && <br />}
              </React.Fragment>
            ))}
          </h1> */}
          <h1 className="font-normal text-[16px]">{title}</h1>
          <p>{description}</p>
          <p className="mt-[10px] font-extrabold text-[22px]">{price}</p>
          <div className="flex mt-[10px] justify-between items-center font-extrabold ">
            <StarRating rating={rating} />
            <div className="flex space-x-1 items-center ">
              <button
                onClick={handleImageClick}
                style={{
                  backgroundColor: color,
                  width: "16px",
                  height: "16px",
                  borderRadius: "100%",
                }}
              ></button>
              {displayColors.map((color, index) => (
                <button
                  key={index}
                  onClick={handleImageClick}
                  style={{
                    backgroundColor: color,
                    width: "16px",
                    height: "16px",
                    borderRadius: "100%",
                  }}
                ></button>
              ))}
              {remainingCount > 0 && (
                <div className="font-extrabold text-xs">+{remainingCount}</div>
              )}
            </div>
          </div>
        </div>
        <button
          className="absolute top-4 right-4"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <Image src={Images.heartfill} alt="/" height={24} width={24} />
          ) : (
            <Image src={Images.heart} alt="/" height={24} width={24} />
          )}
        </button>
      </div>

      {/* {showLoginModal && !isAuthenticated && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
          <div className=" mt-10 items-center- justify-center- flex- rounded-md bg-white p-5 xs:h-[270px]- xs:w-[310px] md:h-[270px]- md:w-[460px] ">
            <div>
              <div className="flex justify-between">
                <h1 className="text-base font-medium text-black">Sign in</h1>
                <button
                  className="outline-none"
                  onClick={() => setShowLoginModal(false)}
                >
                  <Image src={Images.Close} alt="" height={20} width={20} />
                </button>
              </div>
              <p className="border my-4"></p>
              <h1 className="text-base font-normal text-black">Email*</h1>
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
                  <h1 className="text-base font-normal text-black">OTP*</h1>
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
                      Login
                    </button>
                  ) : (
                    <button
                      onClick={verifyOTP}
                      disabled={!isValidEmail || email.trim() === ""}
                      className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                    >
                      Verify OTP
                    </button>
                  )
                ) : (
                  <button
                    onClick={handleSendOtp}
                    disabled={!isValidEmail || email.trim() === ""}
                    className="mt-5 w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                  >
                    Send OTP
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Product;
