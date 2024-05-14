import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import StarRating from "./StarRating";

interface SimilarProductsProps {
  productImage: string;
  title: string;
  description: string;
  salePrice: string;
  rating?: number;
  color: any;
  productId?: string;
  showLoginModal: boolean;
  isAuthenticated: boolean;
  handleToggleFavorite: () => void;
  isFavorite: boolean;
}
const SimilarProduct: React.FC<SimilarProductsProps> = ({
  productImage,
  title,
  description,
  salePrice,
  rating = 0,
  color,
  productId,
  showLoginModal,
  isAuthenticated,
  handleToggleFavorite,
  isFavorite,
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  return (
    <div>
      <div className="bg-white h-[335px] w-[280px] rounded-[10px] px-5 py-7 relative mr-5 md:mr-10">
        <div className="relative">
          <div className="flex justify-center">
            <Image
              src={productImage}
              alt="/"
              height={140}
              width={220}
              className="h-32 object-cover"
            />
          </div>
          <div className="h-[0.5px] bg-black rounded-xl mt-2"></div>
          <div className="absolute top-[96px] w-full mt-12">
            <h1 className="font-extrabold text-[16px]">
              {title?.split("-").map((part, index) => (
                <React.Fragment key={index}>
                  <span
                    className={index === 0 ? "font-extrabold" : "font-normal"}
                  >
                    {part}
                  </span>
                  {index !== title.split("-").length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            <p className="font-extrabold text-md lg:text-2xl text-black mt-3">
              {salePrice}
            </p>
            <div
              className={`absolute top-[100px] md:top-[100px] flex flex-row justify-between w-full`}
            >
              <StarRating rating={rating} />
              <div className="flex items-center">
                <div className="flex items-center">
                  <div
                    className="w-4 h-4 rounded-full mr-1"
                    style={{ backgroundColor: color }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button
          className="absolute top-6 right-6"
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <Image src={Images.WISHLIST} alt="/" height={24} width={24} />
          ) : (
            <Image src={Images.FILLWISHLIST} alt="/" height={24} width={24} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SimilarProduct;
