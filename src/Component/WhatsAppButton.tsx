"use client";

import { Images, Strings } from "@/constant";

import Image from "next/image";
import React from "react";
import ReactWhatsapp from "react-whatsapp";

const WhatsAppButton = ({ phoneNumber, message }: any) => {
  return (
    <ReactWhatsapp
      number={phoneNumber || Strings.Whatsapp_No}
      message={
        message || "Hello, I would like to know more about your services."
      }
      element="div"
      className="cursor-pointer"
    >
      <Image
        src={Images.WHATSAPP}
        alt="/"
        height={55}
        width={55}
        className="h-[56px] w-[56px]"
      />
    </ReactWhatsapp>
  );
};

export default WhatsAppButton;
