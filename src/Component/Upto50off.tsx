"use client";

import { Images, Strings } from "@/constant";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Upto50off = () => {
  return (
    <div className="flex items-center justify-center xs:mt-10 md:mt-14 xs:mx-[20px] xlg:mx-0">
      <div className="relative flex items-end justify-end">
        <Image
          src={Images.iksanabanner3}
          alt="/"
          height={285}
          width={1278}
          className=""
        />
        <div className="absolute xs:my-2 md:my-3 lg:my-5 xs:mr-2 md:mr-4 xl:mr-5 flex xs:gap-x-[2px] md:gap-x-2 xs:text-[4px] md:text-[8px] lg:text-xs xl:text-sm font-bold text-white">
          <Link href={`/store-location#kemps`}>
            <h1> {Strings.KEMPS_CORNER}</h1>{" "}
          </Link>
          <p className="border-l-2 border-white" />
          <Link href={`/store-location#dadar`}>
            <h1> {Strings.DADAR}</h1>
          </Link>
          <p className="border-l-2 border-white" />
          <Link href={`/store-location#juhu`}>
            <h1> {Strings.JUHU}</h1>
          </Link>
          <p className="border-l-2 border-white" />
          <Link href={`/store-location#andheri`}>
            <h1> {Strings.ANDHERI}</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upto50off;
