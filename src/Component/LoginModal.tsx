import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Loader from "./Loader";
import axios from "axios";

export const toggleModal = (
  showLoginModal: boolean,
  setShowLoginModal: {
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): void;
  }
) => {
  setShowLoginModal(!showLoginModal);
};

const LoginModal = ({
  showLoginModal,
  setShowLoginModal,
  isLoggedIn,
  setIsLoggedIn,
}: {
  showLoginModal: boolean;
  setShowLoginModal: React.Dispatch<React.SetStateAction<boolean>>;
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [otpErr, setOtpErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isShow, setIsShow] = useState(false);
  const [lastInteractedProductId, setLastInteractedProductId] = useState<
    string | null
  >(null);

  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: string]: boolean;
  }>({});
  const storedUserId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  const [userId, setUserId] = useState<string | null>(storedUserId);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userId);
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer === 0) {
      if (intervalId) clearInterval(intervalId);
      setIsResendEnabled(true);
    }
  }, [timer, intervalId]);

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", userId);
      setShowLoginModal(false);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId, setShowLoginModal]);

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
    setIsLoading(true);
    setIsResendEnabled(false);
    setTimer(60);
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setIntervalId(newIntervalId);

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
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
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
      setOtpErr("");
    } catch (error) {
      console.log(error);
      setOtpErr("OTP does not match. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const loginUser = async () => {
    setIsLoading(true);
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
      //   setIsAuthenticated(true);
      setUserId(response.data.signInData.userData.userId);
      setShowLoginModal(false);
      setIsLoggedIn(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleToggleFavorite = (productId: string) => {
  //     if (!isAuthenticated) {
  //       setShowLoginModal(true);
  //       setLastInteractedProductId(productId);
  //       return;
  //     }
  //     if (userId) {
  //       if (favoriteStatus[productId]) {
  //         // If product is already favorited, remove it
  //         removeFavoriteProduct(productId, userId);
  //       } else {
  //         // If product is not favorited, add it
  //         addToFavorite(productId, userId);
  //       }
  //     } else {
  //       console.log("User ID is null. Cannot add to favorites.");
  //     }
  //   };

  //   const addToFavorite = async (productId: string, userId: string) => {
  //     try {
  //       let data = JSON.stringify({
  //         userId: userId,
  //         productId: productId,
  //       });
  //       let config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url: `http://localhost:4000/product/addToFavorite?userId=${userId}&productId=${productId}`,
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         data: data,
  //       };
  //       const response = await axios.request(config);
  //       console.log(
  //         "addToFavorite DATA:",
  //         data,
  //         JSON.stringify(response.data.productData)
  //       );

  //       setFavoriteStatus((prevState: { [x: string]: any }) => ({
  //         ...prevState,
  //         [productId]: !prevState[productId],
  //       }));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   const removeFavoriteProduct = async (productId: string, userId: string) => {
  //     try {
  //       let data = JSON.stringify({
  //         userId: userId,
  //         productId: productId,
  //       });

  //       let config = {
  //         method: "post",
  //         maxBodyLength: Infinity,
  //         url: `http://localhost:4000/product/removeFavoriteProduct?userId=${userId}&productId=${productId}`,
  //         headers: {},
  //         data: data,
  //       };

  //       const response = await axios.request(config);
  //       console.log(JSON.stringify(response.data.productData));
  //       setFavoriteStatus((prevState: any) => {
  //         const newState = { ...prevState };
  //         delete newState[productId];
  //         return newState;
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoginModal]);

  return (
    <div>
      {showLoginModal && (
        <div className="fixed left-0 top-0 z-index flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
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
                  {otpErr && <p className="text-red-500 text-xs">{otpErr}</p>}
                  <p className="border border-black mt-2"></p>
                </div>
              )}
              <div>
                {isShow ? (
                  otpValid ? (
                    <button
                      onClick={loginUser}
                      disabled={!isValidEmail || email.trim() === ""}
                      className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                    >
                      {isLoading ? <Loader /> : Strings.Login}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={verifyOTP}
                        disabled={!isValidEmail || email.trim() === ""}
                        className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                      >
                        {isLoading ? <Loader /> : Strings.Verify_OTP}
                      </button>
                      {timer > 0 ? (
                        <p className="flex justify-center mt-2">
                          {Strings.Resend_Otp} {timer} {Strings.seconds}
                        </p>
                      ) : (
                        <button
                          onClick={handleSendOtp}
                          disabled={!isValidEmail || email.trim() === ""}
                          className="mt-4 flex items-center justify-center w-full  hover:text-PictonBlue text-black text-base font-semibold underline"
                        >
                          {isLoading ? <Loader /> : Strings.Resend_OTP}
                        </button>
                      )}
                    </>
                  )
                ) : (
                  <button
                    onClick={handleSendOtp}
                    disabled={!isValidEmail || email.trim() === ""}
                    className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                  >
                    {isLoading ? <Loader /> : Strings.Send_OTP}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
