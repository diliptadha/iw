import { Images, Strings } from "@/constant";

import Image from "next/image";
import React from "react";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";

interface BestsellersProps {
  image: string;
  title: string;
  SKU: string;
  Brand: string;
  salePrice: number;
  rating?: number;
  isBestseller?: boolean;
  productId: string;
  subProductId: string;
  originalPrice: number;
  color: string;
  shape: string;
  gender: string;
  category: string;
  size: string;
  onZoomClick: () => void; // Define the prop for Zoom click handling
}

const Bestsellers: React.FC<BestsellersProps> = ({
  image,
  title,
  SKU,
  salePrice,
  Brand,
  rating = 0,
  isBestseller = false,
  productId,
  subProductId,
  originalPrice,
  color,
  shape,
  gender,
  category,
  size,
  onZoomClick,
}) => {
  const router = useRouter();

  const handleProductPage = () => {
    const lowercaseBrand = Brand.toLowerCase().replace(/\s+/g, "-");
    const lowercaseColor = color.toLowerCase().replace(/\s+/g, "-");
    const lowercaseShape = shape.toLowerCase().replace(/\s+/g, "-");
    const lowercaseCategory = category.toLowerCase().replace(/\s+/g, "-");
    const lowercaseGender = gender.toLowerCase().replace(/\s+/g, "-");
    const lowercaseSKU = SKU.toLowerCase().replace(/\s+/g, "-");

    const actualRoute = `/eyewear/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;
    const url = `/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;

    localStorage.setItem("productId", productId);
    localStorage.setItem("subProductId", subProductId);

    router.push(actualRoute);
  };

  return (
    <div>
      <div className="bg-white h-[330px] w-[240px] rounded-[10px] p-8 relative mr-10">
        {isBestseller && (
          <div className="absolute top-0 right-0 bg-[#FF4307] font-extrabold text-xs text-white h-[27px] w-[121px] flex justify-center items-center rounded-[5px]">
            {Strings.BESTSELLER}
          </div>
        )}
        <div className="relative">
          <div className="flex justify-center my-0 mx-auto w-[100px]">
            <img src={image} alt="/" />
          </div>
          <div className="absolute top-[96px] w-full">
            <h1 className="font-extrabold text-sm text-black">{title}</h1>
            <p className="font-normal text-sm text-black">{SKU} </p>
            <p className="font-extrabold text-sm text-black">
              {salePrice ? salePrice : originalPrice}
            </p>
            <p className="font-bold text-xs text-black">
              {Strings.Inclusive_of_all_taxes}
            </p>
            <div className="absolute top-[107px] w-full">
              <div>
                <StarRating rating={rating} />
              </div>
              <div className="flex justify-between items-center mt-3">
                <button
                  onClick={handleProductPage}
                  className="hover:border-PictonBlue hover:text-PictonBlue flex justify-center items-center border-black border w-[130px] h-[34px] rounded-[5px] font-bold text-xs text-black bg-white"
                >
                  {Strings.KNOW_MORE}
                </button>
                <Image
                  src={Images.Zoom}
                  alt="/"
                  height={28.5}
                  width={28.5}
                  className="cursor-pointer"
                  onClick={onZoomClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bestsellers;
