import "../app/globals.css";

import { Faqs, Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/router";

const SuccessPayment = () => {
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
    fullName: string;
    houseNo: any;
    landmark: any;
    locality: any;
    mobileNo: any;
    pinCode: any;
    state: any;
    id: any;
    isDefault: boolean;
  }

  const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [addGet, setAddGet] = useState<AddressData | null>(null);
  const [userId, setUserId] = useState<string | null>();

  const fetchAddressData = (userId: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}user/getAddressDataById?userId=${userId}`
      )
      .then((response) => {
        const defaultAddresses = response?.data?.addressList.filter(
          (address: any) => address.isDefault
        );
        setAddGet(defaultAddresses.length > 0 ? defaultAddresses[0] : null);
      })
      .catch((error) => {
        console.log("Error fetching address data", error);
      });
  };

  const gettingData = (userId: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=${userId}`
      )
      .then((response) => {
        setCardDetails(response?.data?.cartData);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    fetchAddressData(userId);

    gettingData(userId);
  }, []);
  const router = useRouter();
  const { orderId, toDiAfPr } = router.query;

  const netPrice = Array.isArray(toDiAfPr)
    ? parseInt(toDiAfPr[0] ?? "0", 10)
    : parseInt(toDiAfPr ?? "0", 10);

  return (
    <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem] ">
      <div className="-bg-[#90e9c1] ">
        <div className="flex items-center justify-center mt-2">
          <img
            src={Images.SuccessIcon}
            alt="success-icon"
            className="w-[40px] mr-[15px]"
          />
          <h1 className="text-[#32BA7C] text-[20px] sm:text-[30px] font-semibold">
            {Strings.YOUR_ORDER_SUCCESSFUL}
          </h1>
        </div>
        <h4 className="text-center my-2 text-[12px]">
          {Strings.NOW_SIT_BACK_RELAX}
        </h4>
        <div>
          <h2 className="text-center font-semibold text-[14px] pt-5">
            {Strings.ORDER_ID}
            <span className="font-normal">{orderId}</span>
          </h2>
        </div>

        <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap mt-11">
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
                    </div>

                    <div className="flex items-baseline justify-between mb-2 pt-[10px]">
                      <h3 className="text-[13px] sm:text-[14px]">
                        <span className="text-PictonBlue">{Strings.FRAME}</span>{" "}
                        {Strings.FRAME_TYPE}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <h2>Qty: {ele.quantity}</h2>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="mt-6">
              <h3 className="text-[12px] py-5 text-center bg-[#FFE194]">
                Got a feedback for us? Drop a word at{" "}
                <span className="font-semibold text-[13px]">
                  <a href="mailto:-">{Strings.term_head9_p5_anchor}</a>
                </span>{" "}
                or Call us on :{" "}
                <span className="font-semibold text-[13px]">
                  <a href="tel:-">{Faqs.IKSANA_NUMBER_7977}</a>
                </span>
              </h3>
            </div>
          </div>

          <div className="right sm:min-w-[30%] w-full">
            <div className="shadow-box">
              <div className="py-3 px-6 text-[13px] border-b border-[lightgray]">
                <h3 className="text-PictonBlue">{Strings.ORDER_PLACED}</h3>
                <p>Delivery by 10-Apr-2024</p>
              </div>
              <div className="py-3 pb-2 px-6 text-[13px] border-b border-[lightgray]">
                <h3 className="text-PictonBlue">{Strings.DELIVER_TO}</h3>
                {addGet && (
                  <>
                    <p>
                      {addGet.fullName} (Mob: {addGet.mobileNo})
                    </p>
                    <p>
                      {addGet.houseNo} {addGet.state} {addGet.pinCode}
                    </p>
                  </>
                )}
              </div>
              <div className="py-3 px-6 text-[13px]">
                <h3 className="text-PictonBlue">{Strings.PAYMENT_SMALL}</h3>
                <p>
                  {Strings.AMOUNT_PAID}{" "}
                  <span className="text-[orangered] font-semibold">
                    ₹{netPrice.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-[30px] flex flex-col sm:block items-center">
          <button
            onClick={() => router.push("/")}
            className="w-[170px] py-[10px] px-[15px] border bg-black text-white border-[black] bg-opacity-80 duration-200 hover:bg-white hover:text-black rounded sm:mr-[10px] sm:mb-0 mb-3"
          >
            {Strings.CONTINUE_SHOP}
          </button>
          <button className="w-[170px] py-[10px] px-[15px] hover:text-PictonBlue border border-PictonBlue text-white hover:bg-white bg-PictonBlue hover:bg-opacity-80 duration-200 rounded ">
            {Strings.MY_ORDERS}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
