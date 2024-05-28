import React, { useEffect, useState } from "react";
import "../app/globals.css";
import { useRouter } from "next/router";
import axios from "axios";
import { Faqs, Images, Strings } from "@/constant";
import { Footer } from "@/Component/footer";
import HeaderHeadline from "./header-headline";
import { format, formatDate } from "date-fns";

const myOrder = () => {
  interface CardData {
    id: any;
    title: any;
    productId: any;
    originalPrice: number;
    salePrice: number;
    productImage: any;
    quantity: number;
    product: any;
    createdAt: any;
    orderId: any;
    products: any;
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

  //   const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [addGet, setAddGet] = useState<AddressData | null>(null);
  const [successData, setSuccessData] = useState<CardData[]>([]);
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
  let token: string | null;

  useEffect(() => {
    token = localStorage.getItem("accessToken");
    console.log("token", token);
  }, []);

  const successOrderData = (userId: any) => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}user/userOrderData?userId=${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Add any other headers you need
          },
        }
      )
      .then((response) => {
        const data = response?.data?.data;
        setSuccessData(data);
        console.log(data);
        // console.log("product", response.data.productData[0].product.SKU);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    fetchAddressData(userId);
    // gettingData(userId);
    successOrderData(userId);
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "dd-MMM-yyyy hh:mm a");
  };

  // let toOrPr = successData.reduce(
  //   (total, ele) =>
  //     total +
  //     ele.products?.product?.salePrice * ele.products?.product?.quantity,
  //   0
  // );

  // console.log(toOrPr);

  return (
    <>
      <HeaderHeadline />
      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem] ">
        <div className="-bg-[#90e9c1] ">
          <h1 className=" text-[20px] sm:text-[30px] font-semibold text-center">
            MY Orders
          </h1>
          <h4 className=" my-2 text-[18px]">
            Hello, {"  "} {addGet?.fullName}
          </h4>
          <h4 className=" my-2 text-[14px]">
            View a snapshot of your recent orders here.
          </h4>
          <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap mt-11 mb-14">
            <div className="left-card sm:min-w-[65%] w-full">
              {/* <div className="card mb-4 shadow-box"> */}
              {successData.map((ele, index) => (
                <>
                  {ele.products.map((prods: any) => (
                    <>
                      <div className="card mb-4 shadow-box">
                        <div className="py-3 px-5">
                          <h3 className="text-[#646464]">{prods.orderId}</h3>
                          <h3 className="text-[12px]">
                            {formatDate(prods.createdAt)}
                          </h3>
                        </div>

                        {/* image part */}
                        <div className="sm:flex justify-between items-center border-b-2 border-t-2">
                          <div className=" py-[10px] h-[50px] w-[60px] md:h-[90px] md:w-[150px] lg:h-[130px] lg:w-[200px] mr-3 mb-2 sm:mb-0">
                            <img
                              src={prods?.product?.productImage}
                              alt="gog"
                              className="w-[100%] h-[100%] object-contain"
                            />
                          </div>

                          <div>
                            <h3 className="text-[#3aad3a] font-semibold text-[17px]">
                              Order Placed
                            </h3>
                          </div>

                          <div className="mr-7 ml-8">
                            <div className="flex justify-between w-full items-center pb-2">
                              <div>
                                <h3 className="frame-name text-[13px] sm:text-[14px] font-semibold">
                                  {ele.title}
                                </h3>
                              </div>
                            </div>

                            {/* <div className="flex items-baseline justify-between mb-1 pt-[10px]">
                            <h3 className="text-[13px] sm:text-[14px]">
                              {ele.productInfo.brands}
                            </h3>
                          </div> */}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <h2>
                                  {" "}
                                  ₹{prods?.product?.salePrice.toLocaleString()}
                                </h2>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ))}

              {/* {grandtotal part} */}
              <div className="py-3 px-5">
                <h3 className="text-[14px] text-right">
                  <span className="font-bold">
                    {/* Grand Total ₹ {toOrPr.toLocaleString()} */}
                  </span>
                </h3>
              </div>
              {/* </div> */}
            </div>

            <div className="right sm:min-w-[30%] w-full">
              <div className="shadow-box">
                <div className="py-3 px-6 text-[13px] border-b border-[lightgray]">
                  <h3 className="text-PictonBlue">{Strings.ORDER_PLACED}</h3>
                  <p>Delivery by 10-Apr-2024</p>
                </div>
                <div className="py-3 pb-2 px-6 text-[13px] border-b border-[lightgray]">
                  <h3 className="text-PictonBlue">Delivery Address</h3>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default myOrder;
