import { Images, Strings } from "@/constant";
import React, { useEffect } from "react";

import Image from "next/image";
import StarRating from "./StarRating";
import { useRouter } from "next/navigation";

interface ModalProps {
  Open: boolean;
  Close: () => void;
  product: any | null;
}

const Under500Modal: React.FC<ModalProps> = ({ Open, Close, product }) => {
  const router = useRouter();

  useEffect(() => {
    if (Open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [Open]);

  const handleProductPage = () => {
    const lowercaseBrand = (product.Brand || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const lowercaseColor = (product.color || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const lowercaseShape = (product.shape || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const lowercaseCategory = (product.category || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const lowercaseGender = (product.gender || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");
    const lowercaseSKU = (product.SKU || "unknown")
      .toLowerCase()
      .replace(/\s+/g, "-");

    const actualRoute = `/eyewear/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;
    const url = `/${lowercaseCategory}/${lowercaseBrand}-${lowercaseColor}-${lowercaseShape}-${lowercaseGender}-${lowercaseSKU}`;

    localStorage.setItem("productId", product.productId);
    localStorage.setItem("subProductId", product.subProductId);

    router.push(actualRoute);
    Close();
  };

  if (!Open || !product) return null;

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-20 backdrop-blur-sm">
      <div className="relative p-5 rounded-md bg-white xs:w-[310px] md:w-[400px]">
        {product.isBestseller && (
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
            className="cursor-pointer text-[black]"
            onClick={Close}
          />
        </div>
        <div className="flex justify-center">
          <div className="space-y-4">
            <img
              src={product.productImage}
              alt="/"
              className="h-[160px] w-[280px] object-cover"
            />

            <div className="space-y-2 text-center">
              <h1 className="font-extrabold text-lg text-black">
                {product.Brand}
              </h1>
              <p className="font-semibold text-sm text-black">{product.SKU}</p>
              <p className="font-extrabold text-sm text-black">
                ₹
                {product.salePrice
                  ? product.salePrice.toLocaleString("en-IN")
                  : product.originalPrice.toLocaleString("en-IN")}
              </p>
              <p className="font-bold text-sm text-black">
                {Strings.Inclusive_of_all_taxes}
              </p>
              <div className="flex justify-center">
                <div>
                  <div>
                    <StarRating rating={product.rating} />
                  </div>
                  <button
                    onClick={handleProductPage}
                    className="hover:border-PictonBlue hover:text-PictonBlue flex justify-center items-center border-black border w-[130px] h-[34px] rounded-[5px] font-bold text-xs text-black bg-white"
                  >
                    {Strings.KNOW_MORE}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Under500Modal;
