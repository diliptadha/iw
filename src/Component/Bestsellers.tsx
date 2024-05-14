import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";
import axios from "axios";

interface BestsellersProps {
  image: string;
  title: string;
  SKU: string;
  Brand: string;
  salePrice: any;
  rating?: number;
  isBestseller?: boolean;
  productId: string;
  subProductId: string;
  originalPrice: any;
  color: any;
  shape: any;
  gender: any;
  category: any;
  size: any;
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

  const router = useRouter();
  const handleProductPage = () => {
    const lowercaseBrand = Brand.toLowerCase().replace(/\s+/g, "-");
    const lowercaseColor = color.toLowerCase().replace(/\s+/g, "-");
    const lowercaseShape = shape.toLowerCase().replace(/\s+/g, "-");
    const lowercaseCategory = category.toLowerCase().replace(/\s+/g, "-");
    const lowercaseGender = gender.toLowerCase().replace(/\s+/g, "-");
    const lowercaseSKU = SKU.toLowerCase().replace(/\s+/g, "-");

    // Construct the actual route with all lowercase words
    const actualRoute = `/eyeglasses/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseCategory}-${lowercaseGender}-${lowercaseSKU}`;

    localStorage.setItem("productId", productId);
    localStorage.setItem("subProductId", subProductId);

    router.push(actualRoute);
  };

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}product/addToCartProduct?userId=IK0000002`,
        {
          cartProducts: [
            {
              productId: productId,
              subProductId: subProductId,
              size: size,
              quantity: 1,
              salePrice: salePrice,
              originalPrice: originalPrice,
              productImage: image,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
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
                  className=" flex justify-center items-center border-black border w-[130px] h-[34px] rounded-[5px] font-bold text-xs text-black bg-white"
                >
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
                {Strings.BESTSELLER}
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Image
                src={Images.Closeblack}
                alt="/"
                height={24}
                width={24}
                className="cursor-pointer"
                onClick={openModal}
              />
            </div>
            <div className="flex justify-center relative w-[100px] my-0 mx-auto">
              <img src={image} alt="/" />

              <div className="absolute top-[170px] text-center">
                <div className="">
                  <h1 className="font-extrabold text-lg text-black">{title}</h1>
                  <p className="font-semibold text-sm text-black">{SKU}</p>
                  <p className="font-extrabold text-sm text-black">
                    ₹
                    {salePrice
                      ? salePrice.toLocaleString("en-IN")
                      : originalPrice.toLocaleString("en-IN")}
                  </p>
                  <p className="font-bold text-sm text-black">
                    {Strings.Inclusive_of_all_taxes}
                  </p>
                  <div className="flex justify-center">
                    <div>
                      <div>
                        <StarRating rating={rating} />
                      </div>
                      <button
                        onClick={addToCart}
                        className="flex justify-center items-center border-black border w-[137px] h-[36px] rounded-[5px] font-bold text-sm text-black bg-white"
                      >
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
