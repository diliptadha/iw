import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { Images, Strings } from "@/constant";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import { formatDate } from "date-fns";

interface CardData {
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
  const [couponSlide, setCouponSlide] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(1);
  const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [addGet, setAddGet] = useState<AddressData[]>([]);
  const [couponData, setCouponData] = useState<CouponData[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponAmount, setCouponAmount] = useState(null);
  const [handleDel, setHandleDel] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const applyCoupon = (couponId: string) => {
    if (appliedDiscount > 0) {
      return;
    }

    const selectedCoupon = couponData.find((coupon) => coupon.id === couponId);
    if (selectedCoupon) {
      setAppliedDiscount(selectedCoupon.discountAmount);
      setCouponSlide(false);

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}coupon/addCouponData`, { couponId })
        .then((response) => {
          axios
            .get(
              `${process.env.NEXT_PUBLIC_API_URL}coupon/getCouponDataById?couponId=${couponId}`
            )
            .then((response) => {
              setCouponAmount(response?.data?.couponList);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("Error applying coupon:", error);
        });
    } else {
      console.log("Coupon not found");
    }
  };

  // Function to handle removing applied coupon
  const removeCoupon = () => {
    setAppliedDiscount(0);
  };

  const handleCouponSidebar = () => {
    setCouponSlide(!couponSlide);
  };

  useEffect(() => {
    if (couponSlide) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [couponSlide]);

  // Cart Data Api
  const gettingData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=IK0000003`)
      .then((response) => {
        setCardDetails(response?.data?.cartData);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  // Calculate total original price
  const toOrPr = cardDetails.reduce(
    (total, ele) => total + ele.originalPrice * ele.quantity,
    0
  );

  // Calculate total discounted price
  const toDiPr = cardDetails.reduce(
    (total, ele) => total + ele.salePrice * ele.quantity,
    0
  );

  // Calculate total discount
  const toDi = toOrPr - toDiPr + appliedDiscount;

  // Calculate total price after discount
  const toDiAfPr = toOrPr - toDi;

  const tQty = cardDetails.reduce((total, ele) => total + ele.quantity, 0);

  // API of Address
  const fetchAddressData = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}user/getAddressDataById?userId=IK0000001`)
      .then((response) => {
        setAddGet(response?.data?.addressList);
      })
      .catch((error) => {
        console.log("Error fetching address data", error);
      });
  };
  useEffect(() => {
    fetchAddressData();
    gettingData();
  }, []);

  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (addGet.length > 0) {
      router.push({
        pathname: "/add-adress",
        query: {
          toOrPr,
          toDiPr,
          toDi,
          toDiAfPr,
          tQty,
          appliedDiscount,
        },
      });
    } else {
      router.push({
        pathname: "/shipping-address",
        query: {
          toOrPr,
          toDiPr,
          toDi,
          toDiAfPr,
          tQty,
          appliedDiscount,
        },
      });
    }
  };

  const handleIncrementButtonClick = (productId: any, quantity: number) => {
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}product/updateCartProduct?userId=IK0000003&cartProductid=${productId}&quantity=${
          quantity + 1
        }`
      )
      .then((response) => {
        setQuantity(quantity + 1);
        gettingData();
      })
      .catch((error) => {
        console.log("Error updating product quantity:", error);
      });
  };

  const handleDecrementButtonClick = (productId: any, quantity: number) => {
    if (quantity > 1) {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}product/updateCartProduct?userId=IK0000003&cartProductid=${productId}&quantity=${
            quantity - 1
          }`
        )
        .then((response) => {
          setQuantity(quantity - 1);
          gettingData();
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
        `${process.env.NEXT_PUBLIC_API_URL}product/removeCartData?userId=IK0000003&cartId=${selectedAddressId}`
      )
      .then((response) => {
        // After successful deletion, fetch the updated address data
        fetchAddressData();
        gettingData();
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

  return (
    <>
      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem] ">
        {/* COUPON OFFERS */}
        <div
          className={`fixed top-0 right-0 h-[100vh] bg-white z-50  transition-all duration-500 ease-in-out ${
            couponSlide ? "w-[100%] sm:w-[70%] lg:w-[45%]" : "w-0"
          }`}
        >
          {couponSlide && (
            <>
              <div className="p-7">
                <div className="flex justify-between my-5 ">
                  <h3 className="text-[20px] font-bold">Promo Offers</h3>
                  <div className="w-7 h-7 cursor-pointer">
                    <img
                      src={Images.CROSS_ICON}
                      alt="Cross-icon"
                      onClick={() => setCouponSlide(false)}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                <div></div>

                {couponData.map((ele) => {
                  const dateEnd = new Date(ele.validUntil);
                  const formatDateEnd = formatDate(dateEnd, "MMM, dd yyyy");
                  return (
                    <>
                      <div className="border-[2px] bg-[#d3d3d338] mb-4 border-dashed py-3 px-3 flex items-center sm:items-start sm:gap-8 gap-4 rounded-[6px]">
                        <div className="sm:py-[30px] sm:px-[20px] px-2 py-4 bg-white">
                          <div className="sm:w-[100px] sm:h-[60px] w-[45px] h-[35px]">
                            <img
                              src={Images.COUPON_OFFER}
                              alt="Coupon-icon"
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between py-2">
                            <h3 className="sm:text-[13px] text-[11px] bg-[#DBF4ED] font-semibold flex items-center px-3 rounded-[20px] border-2 ">
                              {ele.couponCode}
                            </h3>
                            <button
                              className="text-PictonBlue p-[6px] rounded-[5px] border-PictonBlue border sm:text-[13px] text-[11px] font-semibold hover:bg-PictonBlue hover:text-white"
                              onClick={() => applyCoupon(ele.id)}
                            >
                              {Strings.APPLY}
                            </button>
                          </div>
                          <h4 className="text-[10px] sm:py-2 pb-1">
                            {Strings.MAX_DISC} ₹{ele.maxAmount}
                          </h4>
                          <div className="flex justify-between">
                            <Link href="#" className="text-[blue] text-[10px]">
                              {Strings.TERMS_COND}
                            </Link>
                            <p className="text-[10px]">
                              {Strings.VALID_TILL} {formatDateEnd}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <h2 className="mb-[15px] font-semibold">{Strings.REVIEW_ORDER}</h2>
        <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap">
          <div className="left-card sm:min-w-[65%] w-full">
            {cardDetails.map((ele, index) => {
              return (
                <div
                  className="card py-6 px-3 sm:flex mb-4 shadow-box"
                  key={index}
                >
                  <div className="border py-[10px] h-[50px] w-[60px] md:h-[90px] md:w-[150px] lg:h-[110px] lg:w-[180px] mr-3 mb-2 sm:mb-0">
                    <img
                      src={ele.productImage}
                      alt="gog"
                      className="w-[100%] h-[100%] object-contain"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between w-full border-b items-center pb-2">
                      <div>
                        <h3 className="frame-name text-[13px] sm:text-[14px] font-semibold">
                          {ele.title}
                        </h3>
                      </div>
                      <div className="flex gap-2 items-center">
                        <div className="relative">
                          <h4 className=" text-[7px] md:text-[9px] rounded pr-4 text-white bg-green-600 p-1">
                            Save{" "}
                            {(
                              Math.round(
                                (ele.originalPrice / ele.salePrice) * 100
                              ) / 10
                            )
                              .toString()
                              .replace(/^(\d)$/, "0.$1")}
                            %
                          </h4>
                          <div className="box-save"></div>
                        </div>

                        {ele.originalPrice ? (
                          <p className=" ml-1 cut-amt text-[12px] sm:text-[13px] text-[#8c8c8ccf]">
                            <s>
                              {Strings.MRP}{" "}
                              {(
                                ele.originalPrice * ele.quantity
                              ).toLocaleString()}
                            </s>
                          </p>
                        ) : (
                          ""
                        )}
                        {ele.salePrice ? (
                          <p className="amt text-[13px] sm:text-[14px] font-semibold">
                            ₹{(ele.salePrice * ele.quantity).toLocaleString()}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>

                    <div className="flex items-baseline justify-between mb-2 pt-[10px]">
                      <h3 className="text-[13px] sm:text-[14px]">
                        <span className="text-PictonBlue">{Strings.FRAME}</span>{" "}
                        {Strings.FRAME_TYPE}
                      </h3>
                      {ele.salePrice ? (
                        <p className="amt text-[9px] text-[#8c8c8ccf]">
                          ₹{(ele.salePrice * ele.quantity).toLocaleString()}
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
                                handleDecrementButtonClick(ele.id, ele.quantity)
                              }
                              className={`px-2 py-1 bg-gray-200 text-gray-700 text-[20px] focus:outline-none${ele.quantity == 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                              disabled={ele.quantity == 1}
                            >
                              -
                            </button>
                          <span className="px-2 py-1 w-8 text-center  border-gray-300 rounded-none focus:outline-none">
                            {ele.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleIncrementButtonClick(ele.id, ele.quantity)
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
                            Medium
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
                          onClick={() => handleDeleteCartItem(ele.id)}
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
                                  Delete Item
                                </h3>
                                <p className="mb-[12px] text-[#555558] text-[15px] font-medium text-center">
                                  Are you sure you want to delete this item?
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
                                    onClick={() => deleteAddress()}
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
                      {/* POp up delete */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="right sm:min-w-[30%] w-full">
            <div className="shadow-box mb-4">
              {appliedDiscount ? (
                <div className="p-3">
                  <h3 className="flex items-center justify-between rounded-[100px] py-[10px] px-[20px] text-[13px] border bg-green-600 font-semibold text-white">
                    You got ₹{appliedDiscount} discount{" "}
                    <span
                      className="py-[2px] px-[10px] border rounded-[50%] hover:text-green-600 hover:border-green-600 hover:bg-white cursor-pointer transition duration-300 text-[17px]"
                      onClick={removeCoupon}
                    >
                      x
                    </span>
                  </h3>
                </div>
              ) : (
                <>
                  {/* <div className='p-3 flex items-baseline gap-4'>
                            <input type="checkbox" />
                            <div>
                                <h3 className='text-[14px] font-semibold'>{Strings.EMECASH}</h3>
                                <h5 className='text-[10px]'>You can use upto <span className='text-blue-400'> ₹0 out of ₹0 </span> on this order.</h5>
                            </div>
                        </div>
                        <div className='line-circle relative border-t border-[darkgray] w-full'></div> */}
                  <div className="p-3 ">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-7 w-7">
                          <img
                            src={Images.COUPON}
                            alt="Coupon-icon"
                            className="w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-[14px] font-semibold">
                            {Strings.APPLY_COUPON_CODE}
                          </h3>
                          <h5 className="text-[10px]">
                            You Have{" "}
                            <span className="text-blue-400">
                              {" "}
                              {couponData.length} Coupons
                            </span>{" "}
                            to Apply*
                          </h5>
                        </div>
                      </div>

                      <div className="">
                        <button
                          className={`focus:outline-none transition-transform duration-400 ease-in-out `}
                          onClick={handleCouponSidebar}
                        >
                          <img
                            src={Images.RIGHT_ARROW}
                            alt="Dropdown Arrow"
                            className="h-4 w-4"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

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
                {appliedDiscount ? (
                  <div className="flex w-[100%] items-center text-green-600 mb-2 justify-between border-b pb-1">
                    <h3 className="text-[14px]">{Strings.COUPON_DISC}</h3>
                    <p className="text-[13px]">
                      -₹{appliedDiscount.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  ""
                )}
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
