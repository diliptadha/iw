import "../app/globals.css";

import { ContactUs, Images, Strings } from "@/constant";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Footer } from "@/Component/footer";
import Header from "@/Component/header";
import Image from "next/image";
import WhatsAppButton from "@/Component/WhatsAppButton";
import axios from "axios";

interface IFormInput {
  firstname: string;
  lastname: string;
  email: string;
  phone: number;
  message: string;
}

const Contactus = () => {
  const [search, setSearch] = useState("");
  const [sumbmitted, setSumbitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) =>
    sendEmail(data);

  const sendEmail = async (data: IFormInput) => {
    try {
      setSumbitted(false);
      console.log(data);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}contact/emailSend`,
        data
      );
      reset();
      setSumbitted(true);
    } catch (error) {
      setSumbitted(false);
      console.log(error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-screen-2xl m-auto">
      <Header setSearch={setSearch} />
      <div className="m-5 md:my-10">
        <h1 className="py-5 text-center text-3xl">{ContactUs.CONTACT_US}</h1>
      </div>
      <div className="md:flex md:justify-center xl:gap-16">
        <div className="m-1 flex flex-col justify-center px-10 py-5 ">
          <p className="mb-4">{ContactUs.FORM}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <input
                placeholder="First Name"
                className="w-full border p-2 focus:outline-none md:p-4 md:text-xl"
                {...register("firstname", { required: true })}
              />
              <br />
              {errors.firstname && (
                <span className="text-red-500">{Strings.FIELD_REQUIRED}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                placeholder="Last Name"
                className="w-full border p-2 focus:outline-none md:p-4 md:text-xl"
                {...register("lastname", { required: true })}
              />
              <br />
              {errors.lastname && (
                <span className="text-red-500">{Strings.FIELD_REQUIRED}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="number"
                placeholder="Contact Number"
                className="w-full border p-2 focus:outline-none md:p-4 md:text-xl"
                {...register("phone", { required: true })}
              />
              <br />
              {errors.phone && (
                <span className="text-red-500">{Strings.FIELD_REQUIRED}</span>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full border p-2 focus:outline-none md:p-4 md:text-xl"
                {...register("email", { required: true })}
              />
              <br />
              {errors.email && (
                <span className="text-red-500">{Strings.FIELD_REQUIRED}</span>
              )}
            </div>
            <div className="mb-4">
              <textarea
                placeholder="Message"
                className="w-full border p-2 focus:outline-none md:p-4 md:text-xl"
                {...register("message", { required: true })}
              />
              <br />
              {errors.message && (
                <span className="text-red-500">{Strings.FIELD_REQUIRED}</span>
              )}
            </div>
            <input
              className="w-full cursor-pointer rounded-md bg-black hover:bg-PictonBlue px-3 py-2 text-white md:text-2xl"
              type="submit"
            />
            {sumbmitted && (
              <p className="text-center w-[70%] mx-auto text-green-500">
                {ContactUs.CONTACT_MSG}
              </p>
            )}
          </form>
        </div>
        <hr />
        <div className="m-1 flex flex-col justify-center gap-3 px-8 py-5">
          <div>
            <h3 className=" text-lg font-bold">{ContactUs.OUR_LOCATION}</h3>
            <p>{ContactUs.ADDRESS}</p>
          </div>
          <div>
            <h3 className=" text-lg font-bold">{ContactUs.EMAIL}</h3>
            <a
              href="mailto:support@iksanaopticals.in"
              className="text-blue-400"
            >
              {ContactUs.SUPPORT_EMAIL}
            </a>
            <a
              href="mailto:eyesolutions@iksanaopticals.in"
              className="block text-blue-400"
            >
              {ContactUs.EMAIL_ID}
            </a>
            <p>{ContactUs.AVAILABLE}</p>
          </div>
          <div>
            <h3 className=" text-lg font-bold">{ContactUs.PHONE_NO}</h3>
            <p>
              <a
                href="https://wa.me/7977994474"
                target="_blank"
                className="text-blue-400"
              >
                {ContactUs.WHATSAPP_NO}
              </a>
            </p>
            <p>
              <a href="tel:+918291251241" className="text-blue-400">
                {ContactUs.MOBILE_NO}
              </a>
            </p>
            <p>{ContactUs.TIMING_1}</p>
            <p>{ContactUs.TIMING_2}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end xs:mx-[20px] xl:mx-[70px] my-10">
        <div className=" space-y-2 ">
          <button
            onClick={handleScrollToTop}
            className="bg-PictonBlue h-12 w-12 rounded-full flex justify-center items-center"
          >
            <Image src={Images.Upicon} alt="/" height={16} width={16} />
          </button>
          <WhatsAppButton
            phoneNumber={Strings.Whatsapp_No}
            message="Hello, I would like to know more about your services."
          />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default Contactus;
