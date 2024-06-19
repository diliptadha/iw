import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useId, useState } from "react";

import CartEmpty from "./cartEmpty";
import HeaderHeadline from "./header-headline";
import axios from "axios";
import { useRouter } from "next/router";

interface CardData {
  totalQuantity: any;
  frameStyle: string;
  category: string;
  frameShape: string;
  cartProduct: any;
  id: any;
  title: any;
  productId: any;
  originalPrice: number;
  salePrice: number;
  productImage: any;
  quantity: number;
}

interface AddressData {
  city: any;
  fullName: any;
  houseNo: any;
  landmark: any;
  locality: any;
  mobileNo: any;
  pinCode: any;
  state: any;
  id: any;
}

interface CouponData {
  id: any;
  couponCode: String;
  discountAmount: any;
  validUntil: any;
  maxAmount: any;
  discountType: any;
}

const ProductADD = () => {
  const [quantity, setQuantity] = useState<number | null>(1);
  const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [addGet, setAddGet] = useState<AddressData[]>([]);
  const [couponData, setCouponData] = useState<CouponData[]>([]);
  const [handleDel, setHandleDel] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [userId, setUserId] = useState<string | null>();

  const groupedCardDetails = Object.values(
    cardDetails.reduce((acc: { [key: string]: CardData }, ele: CardData) => {
      const key = `${ele.cartProduct.productId}-${ele.cartProduct.subproductId}`;
      if (!acc[key]) {
        acc[key] = { ...ele, totalQuantity: ele.cartProduct.quantity };
      } else {
        acc[key].totalQuantity += ele.cartProduct.quantity;
      }
      return acc;
    }, {})
  );

  // Cart Data Api
  const gettingData = (userId: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
      )
      .then((response) => {
        const cartData = response?.data?.cartData || [];
        setCardDetails(cartData);
        if (!cartData.length) {
          setCardDetails([]);
          router.push("/cartEmpty");
        }
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  // Calculate total original price
  let toOrPr = cardDetails.reduce(
    (total, ele) =>
      total + ele.cartProduct.originalPrice * ele.cartProduct.quantity,
    0
  );

  // Calculate total discounted price
  let toDiPr = cardDetails.reduce(
    (total, ele) =>
      total + ele.cartProduct.salePrice * ele.cartProduct.quantity,
    0
  );

  // Calculate total discount
  let toDi = toOrPr - toDiPr;

  // Calculate total price after discount
  let toDiAfPr = toOrPr - toDi;

  const tQty = cardDetails.reduce(
    (total, ele) => total + ele.cartProduct.quantity,
    0
  );

  const router = useRouter();

  // API of Address
  const fetchAddressData = (userId: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}user/getAddressDataById?userId=${userId}`
      )
      .then((response) => {
        setAddGet(response?.data?.addressList);
      })
      .catch((error) => {
        console.log("Error fetching address data", error);
      });
  };

  const handleProceedToCheckout = () => {
    if (addGet.length > 0) {
      router.push({
        pathname: "/add-adress",
      });
    } else {
      router.push({
        pathname: "/shipping-address",
      });
    }
  };
  const handleIncrementButtonClick = (productId: any, quantity: number) => {
    axios
      .post(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }product/updateCartProduct?userId=${userId}&cartProductid=${productId}&quantity=${
          quantity + 1
        }`
      )
      .then((response) => {
        setQuantity(quantity + 1);
        gettingData(userId);
      })
      .catch((error) => {
        console.log("Error updating product quantity:", error);
      });
  };

  const handleDecrementButtonClick = (productId: any, quantity: number) => {
    if (quantity > 1) {
      axios
        .post(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }product/updateCartProduct?userId=${userId}&cartProductid=${productId}&quantity=${
            quantity - 1
          }`
        )
        .then((response) => {
          setQuantity(quantity - 1);
          gettingData(userId);
        })
        .catch((error) => {
          console.log("Error updating product quantity:", error);
        });
    } else {
      console.log("Quantity cannot be less than 1");
    }
  };

  const deleteAddress = () => {
    // Make a delete request to the backend API to delete the address
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}product/removeCartData?userId=${userId}&cartId=${selectedAddressId}`
      )
      .then((response) => {
        // After successful deletion, fetch the updated address data
        fetchAddressData(userId);
        gettingData(userId);

        setHandleDel(false);
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  // Delete popup
  const handleDeleteCartItem = (addressId: any) => {
    setSelectedAddressId(addressId);

    setHandleDel(true);
  };

  // Coupon API
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}coupon/getCouponListData`)
      .then((response) => {
        setCouponData(response?.data?.couponList);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    gettingData(userId);
    fetchAddressData(userId);
  }, []);

  return (
    <>
      <HeaderHeadline />

      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem] ">
        <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap">
          <div className="left-card sm:min-w-[65%] w-full">
            <h2 className="mb-[15px] font-semibold">{Strings.REVIEW_ORDER}</h2>
            {groupedCardDetails.map((groupedItem, index) => {
              return (
                <div
                  className="card py-6 px-3 sm:flex mb-4 shadow-box"
                  key={index}
                >
                  <div className="border py-[10px] h-[50px] w-[60px] md:h-[90px] md:w-[150px] lg:h-[110px] lg:w-[180px] mr-3 mb-2 sm:mb-0">
                    <img
                      src={groupedItem.cartProduct.productImage}
                      alt="gog"
                      className="w-[100%] h-[100%] object-contain"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between w-full border-b items-center pb-2">
                      <div>
                        <h3 className="frame-name text-[13px] sm:text-[14px] font-semibold">
                          {groupedItem.title}
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div>
                          {groupedItem.salePrice !== 0 &&
                          groupedItem.salePrice !== undefined ? (
                            <div className="relative">
                              <h4 className="text-[7px] md:text-[9px] rounded pr-4 text-white bg-green-600 p-1">
                                Save{" "}
                                {(
                                  ((groupedItem.cartProduct.originalPrice -
                                    groupedItem.cartProduct.salePrice) /
                                    groupedItem.cartProduct.originalPrice) *
                                  100
                                ).toFixed(1)}
                                %
                              </h4>
                              <div className="box-save"></div>
                            </div>
                          ) : null}
                        </div>

                        {groupedItem.cartProduct.originalPrice ? (
                          <p className="ml-1 cut-amt text-[12px] sm:text-[13px] text-[#8c8c8ccf]">
                            <s>
                              MRP{" "}
                              {groupedItem.cartProduct.originalPrice.toLocaleString()}
                            </s>
                          </p>
                        ) : null}
                        {groupedItem.cartProduct.salePrice ? (
                          <p className="amt text-[13px] sm:text-[14px] font-semibold">
                            ₹
                            {(
                              groupedItem.cartProduct.salePrice *
                              groupedItem.totalQuantity
                            ).toLocaleString()}
                          </p>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-2 pt-[10px]">
                      <h3 className="text-[13px] sm:text-[14px]">
                        <span className="text-PictonBlue">
                          {groupedItem.category === "MYOPIA CONTROL LENSES"
                            ? groupedItem.title
                            : "Frame"}
                        </span>{" "}
                        {groupedItem.frameShape.charAt(0).toUpperCase() +
                          groupedItem.frameShape.slice(1).toLowerCase()}{" "}
                        {groupedItem.frameStyle.charAt(0).toUpperCase() +
                          groupedItem.frameStyle.slice(1).toLowerCase()}{" "}
                        {groupedItem.category.charAt(0).toUpperCase() +
                          groupedItem.category.slice(1).toLowerCase()}
                      </h3>
                      {groupedItem.cartProduct.salePrice ? (
                        <p className="amt text-[9px] text-[#8c8c8ccf]">
                          ₹
                          {(
                            groupedItem.cartProduct.salePrice *
                            groupedItem.cartProduct.quantity
                          ).toLocaleString()}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h3 className="sm:mr-[14px] mr-2 text-[14px]">
                          {Strings.QTY}
                        </h3>
                        <div className="flex items-center border">
                          <button
                            onClick={() =>
                              handleDecrementButtonClick(
                                groupedItem.cartProduct.id,
                                groupedItem.cartProduct.quantity
                              )
                            }
                            className={`px-2 py-1 bg-gray-200 text-gray-700 text-[20px] focus:outline-none${
                              groupedItem.cartProduct.quantity === 1
                                ? " cursor-not-allowed opacity-50"
                                : " cursor-pointer"
                            }`}
                            disabled={groupedItem.totalQuantity === 1}
                          >
                            -
                          </button>
                          <span className="px-2 py-1 w-8 text-center  border-gray-300 rounded-none focus:outline-none">
                            {groupedItem.totalQuantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrementButtonClick(
                                groupedItem.cartProduct.id,
                                groupedItem.cartProduct.quantity
                              )
                            }
                            className="px-2 py-1 bg-gray-200 text-gray-700 text-[20px] focus:outline-none"
                          >
                            +
                          </button>
                        </div>

                        <p className="ml-[20px] text-[9px] sm:text-[10px] text-[#8c8c8ccf]">
                          {Strings.FRAME_SIZE}{" "}
                          <span className="font-semibold text-[#000]">
                            {" "}
                            {Strings.MEDIUM}
                          </span>
                        </p>
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="sm:w-6 sm:h-6 w-4 h-4 cursor-pointer"
                          onClick={() =>
                            handleDeleteCartItem(groupedItem.cartProduct.id)
                          }
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </div>
                      {/* POp up delete */}
                      <>
                        {handleDel && (
                          <>
                            <div
                              className="pop-up-del top-0 left-0 bottom-0 right-0 "
                              onClick={() => setHandleDel(false)}
                            ></div>
                            <div>
                              <div className="fixed z-[999] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-[#fff] p-[15px] rounded-[10px] max-w-[400px] w-[100%]">
                                <h3 className="text-[20px] font-semibold mb-2 text-center">
                                  {Strings.DELETE_ITEM}
                                </h3>
                                <p className="mb-[12px] text-[#555558] text-[15px] font-medium text-center">
                                  {Strings.SURE_DELETE}
                                </p>
                                <div
                                  className="absolute right-[10px] w-[35px] h-[35px] top-[10px] cursor-pointer p-[6px] rounded-[50%] bg-[#fff]"
                                  onClick={() => setHandleDel(false)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="gray"
                                    className="w-[100%] h-[100%] text-[30px]   "
                                  >
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M6 18L18 6M6 6l12 12"
                                    />
                                  </svg>
                                </div>
                                <div className="text-center mt-11">
                                  <button
                                    onClick={() => setHandleDel(false)}
                                    className="py-[10px] px-[15px] border border-[black] hover:bg-opacity-80 duration-200 hover:bg-[black] hover:text-white rounded mr-[10px]"
                                  >
                                    {Strings.CANCEL}
                                  </button>
                                  <button
                                    onClick={deleteAddress}
                                    className="py-[10px] px-[15px] hover:text-white border border-PictonBlue text-PictonBlue hover:bg-PictonBlue hover:bg-opacity-80 duration-200 rounded "
                                  >
                                    {Strings.DELETE}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="right sm:min-w-[30%] w-full">
            <h2 className="mb-[15px] font-semibold">{Strings.PRICE_SUMMARY}</h2>
            <div className="shadow-box">
              <div className="p-4">
                <div className="flex w-[100%] items-center mb-2 justify-between">
                  <h3 className="text-[14px]">{Strings.MRP}</h3>
                  <p className="text-[13px]">₹{toOrPr.toLocaleString()}</p>
                </div>
                <div className="flex w-[100%] items-center text-green-600 mb-2 justify-between border-b pb-1">
                  <h3 className="text-[14px]">{Strings.ITEM_DISC}</h3>
                  <p className="text-[13px]">-₹{toDi.toLocaleString()}</p>
                </div>
                <div className="flex w-[100%] items-center mb-2 font-semibold justify-between border-b pb-1">
                  <h3 className="text-[13px] md:[14px]">{Strings.NET_PRICE}</h3>
                  <p className="text-[12px] md:[13px]">
                    ₹{toDiAfPr.toLocaleString()}
                  </p>
                </div>
                <div className="flex w-[100%] items-center mb-4 font-semibold justify-between">
                  <h3 className="text-[13px] md:[14px]">{Strings.YOU_PAY}</h3>
                  <p className="text-[12px] md:[13px]">
                    ₹{toDiAfPr.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full p-3 hover:bg-opacity-80 duration-200 bg-PictonBlue text-[#fff] text-[14px] rounded-[6px]"
                >
                  {Strings.PROCEED_TO_CHECKOUT}
                </button>
              </div>
            </div>

            <div className="my-[12px]">
              <ul className="pl-[26px] list-disc sm:text-[11px] text-[9px] flex gap-6 justify-center">
                <li>{Strings.SECURE_PAYMENT}</li>
                <li>{Strings.FREE_DELIVERY}</li>
                <li>{Strings.EASY_RETURN}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductADD;
