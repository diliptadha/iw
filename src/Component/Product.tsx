import React, { useState } from "react";

import Image from "next/image";
import { Images } from "@/constant";
import StarRating from "./StarRating";

interface ProductProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating?: number;
  colors?: string[];
}

const Product: React.FC<ProductProps> = ({
  image,
  title,
  description,
  price,
  rating = 0,
  colors = [],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const maxColorCount = 3;
  const additionalColorCount = colors.length - maxColorCount;

  const handleToggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };
  return (
    <div>
      <div className="relative h-[334px] w-[282px] rounded-[10px] bg-white p-6 my-3 hover:shadow-lg">
        <Image src={image} height={144} width={243} alt="/" className="" />
        <p className="border-[.5px] border-black mt-[24px] mb-[10px]"></p>
        <h1 className="font-extrabold text-[16px]">{title}</h1>
        <p>{description}</p>
        <p className="mt-[10px] font-extrabold text-[22px]">{price}</p>
        <div className="flex justify-between items-center font-extrabold ">
          <StarRating rating={rating} />
          <div className="flex items-center">
            {colors.slice(0, maxColorCount).map((color, index) => (
              <div
                key={index}
                className="w-4 h-4 rounded-full mr-1"
                style={{ backgroundColor: color }}
              ></div>
            ))}
            {colors.length > maxColorCount && (
              <div className=" w-4 h-4 flex items-center justify-center text-xs">
                +{additionalColorCount}
              </div>
            )}
          </div>
        </div>
        <button
          className="absolute top-4 right-4"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <Image src={Images.heartfill} alt="/" height={24} width={24} />
          ) : (
            <Image src={Images.heart} alt="/" height={24} width={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default Product;
