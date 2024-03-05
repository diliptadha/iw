import { Images, Strings } from "@/constant";

import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";

interface Customerssay {
  image: string;
  h1: string;
  p: string;
  rating?: number;
  style?: React.CSSProperties;
}
const Customerssay: React.FC<Customerssay> = ({
  image,
  h1,
  p,
  style,
  rating = 0,
}) => {
  return (
    <div className="customer" style={style}>
      <div className="xs:w-[310px] xs:h-[285px] md:w-[600px] xl:w-[600px] xl:h-[285px] rounded-[10px] bg-[#D2E7EE] xs:p-4 xl:p-12 flex items-center">
        <div>
          <div className="flex justify-between items-center">
            <p className="font-extrabold h-[90px] text-9xl text-white">“</p>
            <div>
              <StarRating rating={rating} />
            </div>
          </div>
          <h1 className="text-PictonBlue font-extrabold text-2xl">{h1}</h1>
          <p className="text-black font-normal text-sm">{p}</p>
        </div>
      </div>
    </div>
  );
};

export default Customerssay;
