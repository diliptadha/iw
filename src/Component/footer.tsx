import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

export const Footer = () => {
  const [Email, setEmail] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("userId");
    }
    return false;
  });
  const validateEmail = (companyEmail: string) => {
    const companyEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return companyEmailRegex.test(companyEmail);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
    setIsSubmitted(false);
    if (Email.trim() === " ") {
      setEmailError("Please enter an email address.");
      setIsEmailValid(true);
    } else if (!validateEmail(value)) {
      setEmailError("Please enter a valid email address.");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const handleSubmit = () => {
    if (Email.trim() === "") {
      setEmailError("Please enter an email address.");
      setIsSubmitted(true);
      clearErrorMessageAfterDelay();
      return;
    }

    if (!validateEmail(Email)) {
      setEmailError("Please enter a valid email address.");
      setIsSubmitted(true);
      clearErrorMessageAfterDelay();
      return;
    }

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}home/sendSubscriptionMail?emailId=${Email}`
      )
      .then((response) => {
        setIsSubmitted(true);
        setEmail("");
      })
      .catch((error) => {
        console.error("Error subscribing:", error);
      });
  };

  const clearErrorMessageAfterDelay = () => {
    setTimeout(() => {
      setEmailError("");
      setIsSubmitted(false);
    }, 5000);
  };

  return (
    <div className="bg-black px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] text-white">
      <div className="flex flex-col lg:flex-row justify-between ">
        <div className="flex flex-col text-left w-full md: lg:w-[530px] xl:w-[700px]">
          <div className="items-center- lg:flext-start- xs:w-[300px] md:w-[400px]- lg:w-full-">
            <Link href={"/"}>
              <img
                src={Images.IKSANA_LOGO}
                width={220}
                height={75}
                alt="logo"
                className=""
              />
            </Link>
          </div>
          <div className="font-lato font-base xs:text-[18px] text-[26px] text-white mt-8">
            <div>{Strings.THE_BEST_QUALITY}</div>
            <div>{Strings.THE_BEST_GUARANTEES}</div>
          </div>
          <div className="mt-4 font-lato text-[14px] text-white font-light">
            {Strings.PARAGRAPH1}
          </div>
        </div>

        <div className="flex flex-col   text-white mt-6 lg:mt-8 xs:ml-2 lg:ml-14 xl:ml-20  lg:w-[470px] xl:w-[600px]">
          <div className=" font-lato text-12 font-bold text-PictonBlue">
            {Strings.SERVICES}
          </div>
          <div className="mt-4">
            <Link
              href="/eye-testing"
              className=" font-lato font-light text-12 hover:opacity-[0.6]"
            >
              {Strings.EYE_TESTING}
            </Link>
          </div>
          <div>
            <Link
              href="/expert-doctor"
              className="font-lato font-light text-12 hover:opacity-[0.6]"
            >
              {Strings.EXPERT_DOCTOR}
            </Link>
          </div>

          <div className="mt-6 font-lato text-12 font-bold text-PictonBlue">
            {Strings.ACCOUNT}
          </div>
          <div className="mt-4">
            <Link
              href={isLoggedIn ? "/profile" : "/"}
              className=" font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.PROFILE}
            </Link>
          </div>
          {/* <div>
            <Link
              href="/appoinments"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.APPOINTMENTS}
            </Link>
          </div> */}
          <div>
            <Link
              href="/my-order"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.ORDERS}
            </Link>
          </div>
          <div>
            <Link
              href="/payment"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.PAYMENT}
            </Link>
          </div>
          <div>
            <Link
              href="/refund-policy"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.RETURNS_REFUNDS}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-6 lg:mt-8 lg:ml-2 xl:ml-6 text-white w-full lg:w-[400px] xl:w-[500px]">
          <div className=" font-lato text-12 font-bold text-PictonBlue">
            {Strings.ABOUT_US}
          </div>
          <div className="mt-4">
            <Link
              href="/our-history"
              className="font-lato text-base text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.OUR_HISTORY}
            </Link>
          </div>
          {/* <div>
            <Link
              href="/blog"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.BLOG}
            </Link>
          </div> */}
          <div>
            <Link
              href="/contact-us"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.CONTACT_US}
            </Link>
          </div>

          <div className="mt-6 font-lato text-12 font-bold text-PictonBlue">
            {Strings.USEFUL_LINKS}
          </div>
          <div className="mt-4">
            <Link
              href="/store-location"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.STORE_LOCATION}
            </Link>
          </div>
          <div>
            <Link
              href="/business-partners"
              className="font-lato text-base  text-12 font-light hover:opacity-[0.6]"
            >
              {Strings.BUSINESS_PARTNERS}
            </Link>
          </div>
        </div>

        <div className="flex flex-col mt-8 lg:ml-4 text-white w-full lg:w-[240px] xl:w-[300px]">
          <div className=" font-lato text-12 font-bold text-PictonBlue">
            {Strings.SUBSCRIBE_NEWSLETTER}
          </div>
          <div className="mt-4 flex justify-row font-lato relative">
            <input
              type="email"
              placeholder="Enter your email ID"
              value={Email}
              onChange={handleEmailChange}
              className="rounded-lg font-lato text-black placeholder-black bg-white px-4 py-2 outline-none w-full xs:text-base lg:text-md md:w-[280px] lg:w-[260px] xl:w-[380px]"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="absolute inset-y-0 right-0 flex items-center px-2 md:left-60 lg:left-48 xl:left-64"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6 text-black hover:text-PictonBlue cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          {isSubmitted && isEmailValid && (
            <div className="m-2 font-lato text-md text-green-500">
              {Strings.SUBSCRIBED_SUCCESSFULLY}
            </div>
          )}
          {isSubmitted && !isEmailValid && (
            <div className="m-2 font-lato text-md text-red-500">
              {EmailError}
            </div>
          )}
          <div className="mt-4 lg:mt-12 flex flex-row">
            <div className="flex items-center">
              <Image
                src={Images.PHONE_LOGO_WHITE}
                width={20}
                height={20}
                alt="phone"
                className=""
              />
            </div>
            <div className="pl-2">
              <div className="font-lato text-base  text-12 font-light">
                {Strings.NEED_HELP}
              </div>

              <div className="flex lg:flex-col xl:flex-row gap-[7px] ">
                <div className="font-lato text-base  text-12 font-light">
                  {Strings.CALL_US}
                </div>
                <Link
                  href="tel: +91 8291251241"
                  className={
                    "font-lato font-bold text-14 hover:text-PictonBlue "
                  }
                >
                  {Strings.PHONE}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex gap-x-2 mt-4 lg:mt-8 font-lato xs:text-xs md:text-12 font-bold text-white">
        <h1> {Strings.BRANCHES}</h1>
        <p className="border-l-2 border-white" />
        <Link href={`/store-location?id=1`}>
          <h1> {Strings.DADAR}</h1>
        </Link>
        <p className="border-l-2 border-white" />
        <Link href={`/store-location?id=2`}>
          <h1> {Strings.JUHU}</h1>
        </Link>
        <p className="border-l-2 border-white" />
        <Link href={`/store-location?id=3`}>
          <h1> {Strings.ANDHERI}</h1>
        </Link>
      </div>
      <div className="h-[1px] md:mx-0 md:w-full bg-white rounded-xl mt-3"></div>
      <div className="flex flex-col lg:flex-row mt-2">
        <div className="flex xs:flex-col- lg:flex-row- xs:justify-start- lg:justify-start- lg:flex-auto- font-lato text-white font-light text-12">
          {Strings.ALL_RIGHTS}
        </div>
        <div className="flex flex-row lg:flex-row- xs:justify-start- lg:justify-end lg:flex-auto mt-2 lg:mt-0">
          <div>
            <Link
              href="/faq"
              className="pl-0 lg:pl-[8px] pr-[4px] lg:pr-[8px] text-white cursor-pointer font-lato md:text-xs lg:text-base xs:text-[7px]  font-medium hover:opacity-[0.6]"
            >
              {Strings.FAQ}
            </Link>
          </div>
          <div>
            {" "}
            <Link
              href="/terms-conditions"
              className=" border-l pl-[4px] lg:pl-[8px] lg:pr-[8px] ml-[10px] text-white cursor-pointer font-lato md:text-xs lg:text-base xs:text-[7px]  font-medium hover:opacity-[0.6]"
            >
              {Strings.TERMS}
            </Link>
          </div>
          <div>
            {" "}
            <Link
              href="/privacy-policy"
              className="border-l pl-[4px] lg:pl-[8px] pr-[4px] lg:pr-[8px] ml-[10px] text-white cursor-pointer font-lato md:text-xs lg:text-base xs:text-[7px]  font-medium hover:opacity-[0.6]"
            >
              {Strings.PRIVACY}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
