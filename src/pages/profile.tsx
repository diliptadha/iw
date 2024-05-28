"use client";

import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { Footer } from "@/Component/footer";
import Header from "@/Component/header";
import Image from "next/image";
import LoginModal from "@/Component/LoginModal";
import Product from "@/Component/Product";
import axios from "axios";

interface FavoriteProduct {
  productInfo: any;
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  productId: string;
  product: any;
}

const Profile = () => {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [myfavorites, setMyfavorites] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("General");
  const [myFavorites, setMyFavorites] = useState<FavoriteProduct[]>([]);
  const [userId, setUserId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPinCode] = useState("");
  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: string]: boolean;
  }>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favoriteStatus");
      return storedFavorites ? JSON.parse(storedFavorites) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoriteStatus", JSON.stringify(favoriteStatus));
    }
  }, [favoriteStatus]);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("userId");
    }
    return false;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    const storedLastName = localStorage.getItem("lastName");
    const storedCity = localStorage.getItem("city");
    const storedAddress = localStorage.getItem("address");
    const storedPincode = localStorage.getItem("pincode");

    if (storedFirstName) setFirstName(storedFirstName);
    if (storedLastName) setLastName(storedLastName);
    if (storedCity) setCity(storedCity);
    if (storedAddress) setAddress(storedAddress);
    if (storedPincode) setPinCode(storedPincode);
  }, []);

  useEffect(() => {
    localStorage.setItem("firstName", firstName);
    localStorage.setItem("lastName", lastName);
    localStorage.setItem("city", city);
    localStorage.setItem("address", address);
    localStorage.setItem("pincode", pincode);
  }, [firstName, lastName, city, address, pincode]);

  const [userProfile, setUserProfile] = useState([]);

  const getUserProfile = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/userProfile?userId=${userId}`,
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJJSzAwMDAwMDciLCJpYXQiOjE3MTY2MjQ3NzN9.EOZzIGqWTTeFzukISmzFyc-_OA4pYEgE7_bWhrASviw",
        },
      };

      const response = await axios.request(config);
      console.log("rrrrrrrrrrr", JSON.stringify(response.data));
      setUserProfile(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getUserProfile();
    }
  }, [userId]);

  const updateUserProfile = async () => {
    try {
      let data = JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        city: city,
        address: address,
        pincode: pincode,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/userProfileUpdate?userId=${userId}`,
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJJSzAwMDAwMDciLCJpYXQiOjE3MTY2MjQ3NzN9.EOZzIGqWTTeFzukISmzFyc-_OA4pYEgE7_bWhrASviw",
          "Content-Type": "application/json",
        },
        data: data,
      };

      let response = await axios.request(config);
      console.log("jdksss", JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getFavoriteProduct = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/getFavoriteProduct?userId=${userId}`,
        headers: {},
      };
      // console.log("uuuuuu", userId);
      const response = await axios.request(config);
      console.log("Favorite products:", response.data.data);
      setMyFavorites(response.data.data);
      const favoriteStatus = response.data.data.reduce(
        (acc: { [key: string]: boolean }, product: FavoriteProduct) => {
          acc[product.productInfo.productId] = true;
          return acc;
        },
        {}
      );
      setFavoriteStatus(favoriteStatus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      getFavoriteProduct();
    }
  }, [userId]);

  const handleToggleFavorite = (productId: string) => {
    if (userId) {
      if (favoriteStatus[productId]) {
        removeFavoriteProduct(productId, userId);
      } else {
        addFavoriteProduct(productId, userId);
      }
    } else {
      console.log("User ID is null. Cannot add to favorites.");
    }
  };

  const removeFavoriteProduct = async (productId: string, userId: string) => {
    try {
      const data = JSON.stringify({ userId, productId });
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/removeFavoriteProduct?userId=${userId}&productId=${productId}`,
        headers: {},
        data,
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.productData));
      setFavoriteStatus((prevState) => {
        const newState = { ...prevState };
        delete newState[productId];
        return newState;
      });
      setMyFavorites((prevFavorites) =>
        prevFavorites.filter(
          (product) => product.productInfo.productId !== productId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  const addFavoriteProduct = async (productId: string, userId: string) => {
    // Implementation for adding a favorite product
    // Ensure this function updates both favoriteStatus and myFavorites
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
    if (buttonName === "General") {
      setShowProfile(true);
      setShowEditProfile(false);
      setMyfavorites(false);
    } else if (buttonName === "EditProfile") {
      setShowProfile(false);
      setMyfavorites(false);
      setShowEditProfile(true);
    } else if (buttonName === "My favorites") {
      setShowProfile(false);
      setShowEditProfile(false);
      setMyfavorites(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
    router.push("/");
  };

  return (
    <div className="max-w-screen-2xl m-auto">
      <div>
        <LoginModal
          showLoginModal={showLoginModal}
          setShowLoginModal={setShowLoginModal}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
        <Header setSearch={setSearch} />
        <div className=" mt-10 bg-[#f2f2f2] border-t-[1.5px] border-gray-300 border-x-[1.5px] xs:mx-[20px] xl:mx-[70px] rounded-t-lg p-7">
          <div className="flex items-center justify-between ">
            <Image
              src={Images.Logo}
              alt="/"
              height={60}
              width={215}
              className="xs:w-36 md:w-[215px] "
            />
            <button
              onClick={handleLogout}
              className={`flex items-center hover:text-PictonBlue`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
              <p className="font-semibold xs:text-sm md:text-base">
                {Strings.LOG_OUT}
              </p>
            </button>
          </div>
        </div>
        <div className="mb-28 bg-[#f2f2f2] border-[1.5px] border-slate-300 xs:mx-[20px] xl:mx-[70px] rounded-b-lg xs:p-3 xl:p-7 flex  xs:flex-col lg:flex-row  lg:justify-between">
          <div className="flex text-black xs:mb-6 lg:mb-0 xs:flex-row lg:flex-col xs:justify-between lg:justify-normal lg:space-y-6 lg:w-[140px]">
            <button
              className={`flex items-center hover:text-PictonBlue  ${
                activeButton === "General" ? "text-PictonBlue" : ""
              }`}
              onClick={() => handleButtonClick("General")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="xs:h-5 xs:w-5 md:w-6 md:h-6   "
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
              <p className="font-semibold xs:text-sm md:text-base">
                {Strings.GENERAL}
              </p>
            </button>
            <button
              className={`flex items-center hover:text-PictonBlue ${
                activeButton === "EditProfile" ? "text-PictonBlue" : ""
              }`}
              onClick={() => handleButtonClick("EditProfile")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="xs:h-[18px] xs:w-5 md:w-6 md:h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>

              <p className="font-semibold xs:text-sm md:text-base">
                {Strings.Edit_Profile}
              </p>
            </button>
            <button
              className={`flex items-center hover:text-PictonBlue ${
                activeButton === "My favorites" ? "text-PictonBlue" : ""
              }`}
              onClick={() => handleButtonClick("My favorites")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="xs:h-4 xs:w-5 md:w-6 md:h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              <p className="font-semibold xs:text-sm md:text-base">
                {Strings.My_Favorites}
              </p>
            </button>
          </div>
          <div className="w-full xs:px-0 md:px-5 ">
            {showProfile && (
              <div className="space-y-4 text-black ">
                <div className="space-y-2">
                  <h1 className="text-black font-semibold text-base">
                    {Strings.POFILE}
                  </h1>
                  <p>{Strings.PROFILE_SUB}</p>
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                {Object.keys(userProfile).length > 0 && (
                  <>
                    <div className="flex overflow-x-auto ">
                      <h1 className=" w-24">First Name :</h1>
                      <p>{firstName}</p>
                    </div>
                    <p className="border-t-[1.5px] border-slate-300" />
                    <div className="flex overflow-x-auto ">
                      <h1 className=" w-24">Last Name :</h1>
                      <p>{lastName}</p>
                    </div>
                    <p className="border-t-[1.5px] border-slate-300" />
                    <div className="flex overflow-x-auto ">
                      <h1 className=" w-24">City :</h1>
                      <p>{city}</p>
                    </div>
                    <p className="border-t-[1.5px] border-slate-300" />
                    <div className="flex  overflow-x-auto">
                      <h1 className=" w-24">Address :</h1>
                      <p>{address}</p>
                    </div>
                    <p className="border-t-[1.5px] border-slate-300" />
                    <div className="flex">
                      <h1 className=" w-24">Pin code :</h1>
                      <p>{pincode}</p>
                    </div>
                  </>
                )}
              </div>
            )}
            {showEditProfile && (
              <div className="space-y-4 text-black">
                <div className="space-y-2">
                  <h1 className="text-black font-semibold text-base">
                    {Strings.Edit_Profile}
                  </h1>
                  <p>{Strings.Edit_Profile_Sub}</p>
                </div>
                <p className="border-t-[1.5px] border-slate-300" />

                <div className="flex">
                  <h1 className=" w-24">First Name :</h1>
                  <input
                    type="text"
                    className="flex bg-[#f2f2f2] justify-center outline-none border-b border-gray-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <div className="flex ">
                  <h1 className=" w-24">Last Name :</h1>
                  <input
                    type="email"
                    className="flex bg-[#f2f2f2] justify-center outline-none border-b border-gray-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <div className="flex">
                  <h1 className=" w-24">City :</h1>
                  <input
                    type="tel"
                    className="flex bg-[#f2f2f2] justify-center outline-none border-b border-gray-500"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <div className="flex">
                  <h1 className=" w-24">Address :</h1>
                  <input
                    type="tel"
                    className="flex bg-[#f2f2f2] justify-center outline-none border-b border-gray-500"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <div className="flex">
                  <h1 className=" w-24">Pin Code :</h1>
                  <input
                    type="tel"
                    className="flex bg-[#f2f2f2] justify-center outline-none border-b border-gray-500"
                    value={pincode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <button
                  onClick={updateUserProfile}
                  className="hover:bg-PictonBlue border w-[137px] h-[34px] rounded-[5px] font-normal text-sm text-white bg-black"
                >
                  {Strings.Update}
                </button>
              </div>
            )}
            {myfavorites && (
              <div className="space-y-4 ">
                <div className="space-y-2">
                  <h1 className="text-black font-semibold text-base">
                    {Strings.My_Favorites}
                  </h1>
                  <p>
                    {myFavorites?.length > 0 ? Strings.My_Favorites_Sub : " "}
                  </p>
                </div>
                <p className="border-t-[1.5px] border-slate-300" />
                <div className="flex justify-center- ">
                  <div className="flex-wrap xs:justify-center xl:justify-normal flex sm:gap-x-10 lg:gap-x-20 ">
                    {myFavorites?.length > 0 ? (
                      myFavorites?.map((favoriteProduct, index) => {
                        const product = favoriteProduct.productInfo;
                        return (
                          <Product
                            key={index}
                            image={product?.productImage}
                            title={product?.title}
                            color={product?.color}
                            description={""}
                            rating={product?.rating}
                            price={product?.salePrice}
                            productId={product?.productId}
                            showLoginModal={false}
                            isAuthenticated={false}
                            handleToggleFavorite={() =>
                              handleToggleFavorite(product.productId)
                            }
                            isFavorite={
                              favoriteStatus[product.productId] || true
                            }
                            subProductId={product?.subProductId}
                          />
                        );
                      })
                    ) : (
                      <p>No favorite products found.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Profile;
