import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import StarRating from "./StarRating";

interface BestsellersProps {
  image: string;
  title: string;
  description: string;
  price: string;
  rating?: number;
  isBestseller?: boolean;
}
const Bestsellers: React.FC<BestsellersProps> = ({
  image,
  title,
  description,
  price,
  rating = 0,
  isBestseller = false,
}) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(!open);
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
      <div className="bg-white h-[330px] w-[240px] rounded-[10px] p-8 relative mr-10">
        {isBestseller && (
          <div className="absolute top-0 right-0 bg-[#FF4307] font-extrabold text-xs text-white h-[27px] w-[121px] flex justify-center items-center rounded-[5px]">
            {Strings.BESTSELLER}
          </div>
        )}
        <div className="relative">
          <div className="flex justify-center">
            <Image src={image} alt="/" height={128} width={169} />
          </div>
          <div className="absolute top-[96px] w-full">
            <h1 className="font-extrabold text-sm text-black">{title}</h1>
            <p className="font-normal text-sm text-black">{description} </p>
            <p className="font-extrabold text-sm text-black">{price}</p>
            <p className="font-bold text-xs text-black">
              {Strings.Inclusive_of_all_taxes}
            </p>
            <div className="absolute top-[107px] w-full">
              <div>
                <StarRating rating={rating} />
              </div>
              <div className="flex justify-between items-center mt-3">
                <button className=" flex justify-center items-center border-black border w-[130px] h-[34px] rounded-[5px] font-bold text-xs text-black bg-white">
                  {Strings.KNOW_MORE}
                </button>
                <Image
                  src={Images.Zoom}
                  alt="/"
                  height={28.5}
                  width={28.5}
                  className="cursor-pointer"
                  onClick={openModal}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
          <div className="relative p-8 rounded-md bg-white xs:h-[420px] xs:w-[310px] md:h-[420px] md:w-[460px] xl:h-[430px] xl:w-[400px] ">
            {isBestseller && (
              <div className="absolute top-0 left-0 bg-[#FF4307] font-extrabold text-xs text-white h-[30px] w-[125px] flex justify-center items-center rounded-[5px]">
                BESTSELLER
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Image
                src={Images.Close}
                alt="/"
                height={24}
                width={24}
                className="cursor-pointer"
                onClick={openModal}
              />
            </div>
            <div className="flex justify-center relative ">
              <Image src={image} alt="/" height={256} width={338} />

              <div className="absolute top-[170px] text-center">
                <div className="">
                  <h1 className="font-extrabold text-lg text-black">{title}</h1>
                  <p className="font-semibold text-sm text-black">
                    {description}
                  </p>

                  <p className="font-extrabold text-xl text-black mt-2">
                    {price}
                  </p>
                  <p className="font-bold text-sm text-black">
                    {Strings.Inclusive_of_all_taxes}
                  </p>
                  <div className="flex justify-center">
                    <div>
                      <div>
                        <StarRating rating={rating} />
                      </div>
                      <button className="flex justify-center items-center border-black border w-[137px] h-[36px] rounded-[5px] font-bold text-sm text-black bg-white">
                        {Strings.ADD_TO_CART}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bestsellers;
