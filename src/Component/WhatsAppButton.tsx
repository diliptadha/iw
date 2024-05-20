"use client";

import Image from "next/image";
import { Images } from "@/constant";
import React from "react";
import ReactWhatsapp from "react-whatsapp";

const WhatsAppButton = ({ phoneNumber, message }: any) => {
  return (
    <ReactWhatsapp
      number={phoneNumber}
      message={message}
      element="div"
      className="cursor-pointer"
    >
      <Image
        src={Images.Whatsapp}
        alt="/"
        height={55}
        width={55}
        className="h-[56px] w-[56px]"
      />
    </ReactWhatsapp>
  );
};

export default WhatsAppButton;
