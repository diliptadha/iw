import "../app/globals.css";

import React, { useState } from "react";

import { Footer } from "@/Component/footer";
import Header from "@/Component/header";
import Image from "next/image";
import { Images } from "@/constant";
import Product from "@/Component/Product";

const Profile = () => {
  const [showProfile, setShowProfile] = useState<boolean>(true);
  const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
  const [myfavorites, setMyfavorites] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<string>("General");

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
  };

  return (
    <div>
      <Header
        setSearch={function (search: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="mt-10 bg-[#f2f2f2] border-t-[1.5px] border-x-[1.5px] xs:mx-[20px] xl:mx-[70px] rounded-t-lg p-7">
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
            <p className="font-semibold xs:text-sm md:text-base">Log out</p>
          </button>
        </div>
      </div>
      <div className="mb-28 bg-[#f2f2f2] border-[1.5px] xs:mx-[20px] xl:mx-[70px] rounded-b-lg xs:p-3 xl:p-7 flex  xs:flex-col md:flex-row  md:justify-between">
        <div className="flex text-black bg-red-300- xs:mb-6 md:mb-0 xs:flex-row md:flex-col xs:justify-between md:justify-normal md:space-y-6">
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
            <p className="font-semibold xs:text-sm md:text-base">General</p>
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
              Edit Profile
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
              My Favorites
            </p>
          </button>
        </div>
        <div className="xs:w-full bg-PictonBlue- md:w-[45rem] lg:w-[50rem] xl:w-[65rem] xs:px-0 md:px-5 ">
          {showProfile && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-black font-semibold text-base">Pofile</h1>
                <p>
                  This information will be displayed publicly so be careful what
                  you share.
                </p>
              </div>
              <p className="border-t-[1.5px]" />

              <div className="flex  overflow-x-auto space-x-4">
                <h1>Full name : </h1>
                <p>Tom cook</p>
              </div>
              <p className="border-t-[1.5px]" />
              <div className="flex  space-x-12 overflow-x-auto">
                <h1>Email : </h1>
                <p>tom.cook@example.com</p>
              </div>
              <p className="border-t-[1.5px]" />
              <div className="flex space-x-10">
                <h1>Phone : </h1>
                <p>02667-77777</p>
              </div>
            </div>
          )}
          {showEditProfile && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-black font-semibold text-base">
                  Edit Profile
                </h1>
                <p>Update your personal details here.</p>
              </div>
              <p className="border-t-[1.5px]" />

              <div className="flex space-x-4">
                <h1>Full name :</h1>
                <input
                  type="text"
                  className="flex justify-center outline-none border-b border-gray-500"
                  defaultValue="Tom cook"
                />
              </div>
              <p className="border-t-[1.5px]" />
              <div className="flex space-x-12">
                <h1>Email :</h1>
                <input
                  type="email"
                  className="flex justify-center outline-none border-b border-gray-500"
                  defaultValue="tom.cook@example.com"
                />
              </div>
              <p className="border-t-[1.5px]" />
              <div className="flex space-x-10">
                <h1>Phone :</h1>
                <input
                  type="tel"
                  className="flex justify-center outline-none border-b border-gray-500"
                  defaultValue="02667-77777"
                />
              </div>
              <p className="border-t-[1.5px]" />
              <button className="hover:bg-PictonBlue border w-[137px] h-[34px] rounded-[5px] font-normal text-sm text-white bg-black">
                Update
              </button>
            </div>
          )}
          {myfavorites && (
            <div className="space-y-4 ">
              <div className="space-y-2">
                <h1 className="text-black font-semibold text-base">
                  My Favorites
                </h1>
                <p>Here are your Favourites.</p>
              </div>
              <p className="border-t-[1.5px]" />
              <Product
                image={""}
                title={""}
                color={""}
                description={""}
                price={""}
                showLoginModal={false}
                isAuthenticated={false}
                handleToggleFavorite={function (): void {
                  throw new Error("Function not implemented.");
                }}
                isFavorite={false}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
