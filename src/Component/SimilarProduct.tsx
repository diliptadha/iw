import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";
import "../app/globals.css";
import Image from "next/image";
import StarRating from "./StarRating";

interface SimilarProductsProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating?: number;
  // isBestseller?: boolean;
  colors: any;
}
const SimilarProduct: React.FC<SimilarProductsProps> = ({
  image,
  title,
  description,
  price,
  rating = 0,
  // isBestseller = false,
  colors,
  
}) => {

  const [isFavorite, setIsFavorite] = useState(false);
  const [open, setOpen] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite((prevState) => !prevState);
  };


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
        {/* {isBestseller && (
          <div className="absolute top-0 right-0 bg-[#FF4307] font-extrabold text-xs text-white h-[27px] w-[121px] flex justify-center items-center rounded-[5px]">
            BESTSELLER
          </div>
        )} */}
        <div className="relative">
          <div className="flex justify-center">
            <Image src={image} alt="/" height={158} width={220} />
           
          </div>
          <div className="h-[0.5px] bg-black rounded-xl mt-2"></div>
          <div className="absolute top-[96px] w-full mt-12">
            <h1 className="font-extrabold text-sm text-black">{title}</h1>
            <p className="font-bold text-sm text-black">{description} </p>
            <p className="font-extrabold text-md lg:text-2xl text-black mt-3">{price}</p>
           
          <div className={`absolute top-[100px] md:top-[100px] flex flex-row justify-between w-full`}>
              <StarRating rating={rating} />
              <div className="flex items-center">
              {colors.slice(0, 3).map((color: any, index: number) => (
                 <a
      key={index}
      className="flex items-center mr-1"
      
    >
      <div
        className="w-4 h-4 md:w-5 md:h-5 rounded-full mr-0.5 md:mr-1"
        style={{ backgroundColor: color, cursor: 'pointer' }}
      />
    </a>
  ))}
                {colors.length > 3 && (
                <a href="" className="font-bold">+{colors.length - 3}</a>
              )}
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
