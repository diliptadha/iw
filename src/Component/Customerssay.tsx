import { Images, Strings } from "@/constant";

import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";

interface Customerssay {
  h1: string;
  h2: string;
  p: string;
  rating?: number;
  style?: React.CSSProperties;
}
const Customerssay: React.FC<Customerssay> = ({
  h1,
  h2,
  p,
  style,
  rating = 0,
}) => {
  return (
    <div className="customer" style={style}>
      <div className="xs:w-[310px] xs:h-[285px] md:w-[600px] xl:w-[600px] xl:h-[285px] rounded-[10px] bg-[#D2E7EE] xs:p-4 xl:p-12 flex items-center">
        <div>
          <div className="flex justify-between items-center">
            <div className="font-extrabold h-[90px] text-9xl text-white">
              {Strings.C}
            </div>
            <div>
              <StarRating rating={rating} />
            </div>
          </div>
          <div className="text-PictonBlue font-extrabold text-2xl">
            {h1} {h2}
          </div>
          <div className="text-black font-normal text-sm">{p}</div>
        </div>
      </div>
    </div>
  );
};

export default Customerssay;
