import "../app/globals.css";

import { Faqs, Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";
import { format, formatDate } from "date-fns";

import { Footer } from "@/Component/footer";
import HeaderHeadline from "./header-headline";
import Headerforfaqs from "@/Component/headerforfaqs";
import axios, { AxiosRequestConfig } from "axios";
import { useRouter } from "next/navigation";
import OrderCancelPopup from "@/Component/OrderCancelPopup";

interface ExpectedDelivery {
  today: string;
  expected: string;
}
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
    orderStatus?: string;
    isRefundable?: boolean;
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

  const router = useRouter();

  //   const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [search, setSearch] = useState("");

  const [addGet, setAddGet] = useState<AddressData | null>(null);
  const [successData, setSuccessData] = useState<CardData[]>([]);
  const [orders, setOrders] = useState<CardData[]>([]);
  const [userId, setUserId] = useState<string | null>();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrderCancelPopup, setShowOrderCancelPopup] = useState(false);
  const [cancelOrderLoading, setCancelOrderLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window !== "undefined") {
      return !!localStorage.getItem("userId");
    }
    return false;
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

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

  const fetchUserOrderData = async () => {
    const token = localStorage.getItem("accessToken");
    console.log("Authorization Token for UserOrderData:", token);
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/userOrderData?userId=${userId} `,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.request(config);

      console.log("orders", response.data.data);
      setOrders(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserOrderData();
    }
  }, [userId]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    fetchAddressData(userId);
    // gettingData(userId);
  }, []);

  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return format(date, "dd-MMM-yyyy hh:mm a");
  };

  const [date, setDate] = useState<ExpectedDelivery | null>(null);

  const fetchExpectedDeliveryDate = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}product/getExpectedDeliveryDate`,
      headers: {},
    };

    try {
      const response = await axios.request(config);
      setDate(response.data.expectedDeliveryData);
      console.log(JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpectedDeliveryDate();
  }, []);

  // let toOrPr = successData.reduce(
  //   (total, ele) =>
  //     total +
  //     ele.products?.product?.salePrice * ele.products?.product?.quantity,
  //   0
  // );

  // console.log(toOrPr);

  const onCancelOrder = async (orderId: string) => {
    try {
      setCancelOrderLoading(true);
      let config: AxiosRequestConfig = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}payment/cancelOrder`,
        headers: {},
        params: { orderId },
      };
      const response = await axios.request(config);
      if (response.data?.refundResponse?.data) {
        fetchUserOrderData();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCancelOrderLoading(false);
      setShowOrderCancelPopup(false);
    }
  };

  return (
    <>
      <Headerforfaqs setSearch={setSearch} />
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
              {orders.map((order, index) => {
                if (order.orderStatus === "cancelled") return null;
                return (
                  <div
                    key={index}
                    className="card bg-white py-6 px-3 sm:flex mb-4 shadow-box"
                  >
                    <div className="border flex justify-center items-center py-[10px] xs:h-[60px] xs:w-[80px] md:h-[90px] md:w-[150px] lg:h-[110px] lg:w-[180px] mr-3 mb-2 sm:mb-0">
                      <img
                        src={order.products.productImage}
                        alt={order.products.title}
                        className="xs:h-[80px] xs:w-[80px] md:w-[100%] md:h-[100%] object-cover"
                      />
                    </div>

                    <div className="w-full">
                      <div className="flex justify-between w-full border-b items-center pb-2">
                        <div>
                          <h3 className="frame-name text-[13px] sm:text-[14px] font-semibold">
                            {order.products.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-baseline justify-between  pt-[10px]">
                        <h3 className="text-[13px] sm:text-[14px]">
                          <span className="text-PictonBlue">
                            {" "}
                            {order.products.category ===
                              "MYOPIA CONTROL LENSES" || "contact-lenses"
                              ? order.products.title
                              : "Frame"}
                          </span>{" "}
                          {order.products.frameShape.charAt(0).toUpperCase() +
                            order.products.frameShape
                              .slice(1)
                              .toLowerCase()}{" "}
                          / {order.products.frameStyle}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <h2>Price: {order.products.salePrice}</h2>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <h2>Qty: {order.quantity}</h2>
                          </div>
                        </div>
                        {order.isRefundable && (
                          <div>
                            <button
                              className="bg-red-600 hover:bg-red-700 text-white font-normal text-xs w-[137px] h-[34px] rounded-[5px] mt-2"
                              onClick={() => setShowOrderCancelPopup(true)}
                            >
                              Cancel Order
                            </button>
                          </div>
                        )}
                        {showOrderCancelPopup && (
                          <OrderCancelPopup
                            loading={cancelOrderLoading}
                            onClickCancel={() => onCancelOrder(order.orderId)}
                            onCloseModal={() => setShowOrderCancelPopup(false)}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

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
                  {date && (
                    <>
                      <h3>Free Standard Delivery by {date.expected}</h3>
                      {/* <h3>Expected: {date.expected}</h3> */}
                    </>
                  )}
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
