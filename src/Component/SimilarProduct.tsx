import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";

interface SimilarProductsProps {
  productImage: string;
  title: string;
  description: string;
  salePrice: string;
  rating?: number;
  color: any;
  productId: string;
  subProductId: string;
  showLoginModal: boolean;
  isAuthenticated: boolean;
  handleToggleFavorite: () => void;
  isFavorite: boolean;
  catogory?: string;
  brands?: string;
  frameColor?: string;
  frameShape?: string;
  gender?: string;
  SKU?: string;
}
const SimilarProduct: React.FC<SimilarProductsProps> = ({
  productImage,
  title,
  description,
  salePrice,
  rating = 0,
  color,
  productId,
  subProductId,
  showLoginModal,
  isAuthenticated,
  handleToggleFavorite,
  isFavorite,
  catogory,
  brands,
  frameColor,
  frameShape,
  gender,
  SKU,
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const lowercaseBrand = brands?.toLowerCase().replace(/\s+/g, "-");
  const lowercaseColor = frameColor?.toLowerCase().replace(/\s+/g, "-");
  const lowercaseShape = frameShape?.toLowerCase().replace(/\s+/g, "-");
  const lowercaseCategory = catogory?.toLowerCase().replace(/\s+/g, "-");
  const lowercaseGender = gender?.toLowerCase().replace(/\s+/g, "-");
  const lowercaseSKU = SKU?.toLowerCase().replace(/\s+/g, "-");
  const actualRoute = `/eyewear/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;

  const handleProductClick = () => {
    localStorage.setItem("productId", productId);
    localStorage.setItem("subProductId", subProductId);
    router.push(actualRoute);
    window.location.reload();
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
        <div className="relative">
          <div className="flex justify-center">
            <Link href={actualRoute} onClick={handleProductClick}>
              <Image
                src={productImage}
                alt="/"
                height={140}
                width={220}
                className="h-32 object-cover"
              />
            </Link>
          </div>
          <div className="h-[0.5px] bg-black rounded-xl mt-2"></div>
          <div className="absolute top-[96px] w-full mt-12">
            <Link href={actualRoute} onClick={handleProductClick}>
              <h1 className="font-normal text-[16px]">{title}</h1>
            </Link>
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
