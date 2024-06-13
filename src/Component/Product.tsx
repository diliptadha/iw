import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Images } from "@/constant";
import Link from "next/link";
import StarRating from "./StarRating";
import axios from "axios";
import { useRouter } from "next/router";

interface ProductData {
  FilteredSubProductData: any;
  SKU: string;
  boxImage: string[];
  brands: string;
  category: string;
  color: string;
  frameStyle: string;
  frameMaterial: string;
  frameShape: string;
  frameColor: string;
  frameSize: string;
  width: number;
  height: number;
  length: number;
  frameWeight: string;
  modelNumber: string;
  title: string;
  productImage: string;
  variantImage: string[];
  fullDesc: string;
  productId: string;
  subProductId: string;
  gender: string;
}
interface SubProduct {
  subProductId: string;
  color: string;
  frameColor: string;
  productImage: string;
  variantImage: string;
}
interface ProductProps {
  image: string;
  title: string;
  color: string;
  description: string;
  price: string;
  rating?: number;
  colors?: string[];
  otherColors?: string[];
  productId: string;
  variantImages?: string[];
  showLoginModal: boolean;
  isAuthenticated: boolean;
  handleToggleFavorite: () => void;
  isFavorite: boolean;
  subProductId: string;
}

const Product: React.FC<ProductProps> = ({
  image,
  title,
  description,
  price,
  rating = 0,
  color,
  otherColors = [],
  colors = [],
  productId,
  subProductId,
  variantImages = [],
  showLoginModal,
  isAuthenticated,
  handleToggleFavorite,
  isFavorite,
}) => {
  const [displayColors, setDisplayColors] = useState<string[]>([]);
  const [remainingCount, setRemainingCount] = useState<number>(0);
  const router = useRouter();
  useEffect(() => {
    if (otherColors.length > 2) {
      setDisplayColors(otherColors.slice(0, 2));
      setRemainingCount(otherColors.length - 2);
    } else {
      setDisplayColors(otherColors);
    }
  }, [otherColors]);

  const [productData, setProductData] = useState<ProductData | null>(null);

  const getProductData = async () => {
    try {
      let data = "";

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/getProductData?productId=${productId}&subProductId=${subProductId}`,
        headers: {},
        data: data,
      };

      axios.request(config).then((response: { data: any }) => {
        setProductData(response?.data?.productData?.ProductData);
        setCurrentImage(response?.data?.productData?.ProductData?.productImage);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  const [originalImage, setOriginalImage] = useState(image);
  const [currentImage, setCurrentImage] = useState(image);
  const alternateImage = "/Images/CANNA-2068-BROWN TORTOISE-52-2.png";
  const handleImageClick = () => {
    if (
      productData &&
      productData?.variantImage &&
      productData?.variantImage.length > 0
    ) {
      setCurrentImage((prevImage) =>
        prevImage === originalImage
          ? productData?.variantImage[0]
          : originalImage
      );
    }
    console.log("dghrhtyhtthtyhrthrt", productData);
  };

  const lowercaseBrand = productData?.brands.toLowerCase().replace(/\s+/g, "-");
  const lowercaseColor = productData?.frameColor
    .toLowerCase()
    .replace(/\s+/g, "-");
  const lowercaseShape = productData?.frameShape
    .toLowerCase()
    .replace(/\s+/g, "-");
  const lowercaseCategory = productData?.category
    .toLowerCase()
    .replace(/\s+/g, "-");
  const lowercaseGender = productData?.gender
    .toLowerCase()
    .replace(/\s+/g, "-");
  const lowercaseSKU = productData?.SKU.toLowerCase().replace(/\s+/g, "-");

  const actualRoute = `/eyewear/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;

  const handleProductClick = () => {
    localStorage.setItem("productId", productId);
    localStorage.setItem("subProductId", subProductId);
    router.push(actualRoute);
  };

  return (
    <div>
      <div className="relative h-[315px]   w-[280px] rounded-[10px] bg-white p-6 my-3 hover:shadow-lg">
        <Link href={actualRoute} onClick={handleProductClick}>
          <Image
            src={currentImage}
            height={140}
            width={220}
            className="h-32 object-cover"
            alt="/"
          />
        </Link>
        <div className="absolute- bottom-0- ">
          <p className="border-[.5px] border-black mt-[24px] mb-[10px]"></p>
          <Link href={actualRoute} onClick={handleProductClick}>
            <h1 className="font-normal text-[16px] truncate">{title}</h1>
          </Link>

          <p>{description}</p>
          <p className="mt-[10px] font-extrabold text-[22px]">{price}</p>
          <div className="flex mt-[10px] justify-between items-center font-extrabold ">
            <StarRating rating={rating} />
            <div className="flex space-x-1 items-center ">
              <button
                onClick={handleImageClick}
                style={{
                  backgroundColor: color,
                  width: "16px",
                  height: "16px",
                  borderRadius: "100%",
                }}
              ></button>
              {displayColors.map((color, index) => (
                <button
                  key={index}
                  onClick={handleImageClick}
                  style={{
                    backgroundColor: color,
                    width: "16px",
                    height: "16px",
                    borderRadius: "100%",
                  }}
                ></button>
              ))}
              {remainingCount > 0 && (
                <div className="font-extrabold text-xs">+{remainingCount}</div>
              )}
            </div>
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
