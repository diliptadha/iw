import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import HeaderHeadline from "./header-headline";
import Link from "next/link";
import RazorPage from "@/Razorpay/razorpage";
import axios from "axios";
import { formatDate } from "date-fns";
import { useRouter } from "next/router";

interface AddressData {
  city: any;
  fullName: any;
  houseNo: any;
  landmark: any;
  alternateNumber: any;
  locality: any;
  mobileNo: any;
  pinCode: any;
  state: any;
  id: any;
  isDefault: boolean;
}

interface CardData {
  category: String;
  frameStyle: String;
  frameShape: String;
  cartProduct: any;
  id: any;
  title: any;
  productId: any;
  originalPrice: number;
  salePrice: number;
  productImage: any;
  quantity: number;
}

interface CouponData {
  id: any;
  couponCode: String;
  discountAmount: any;
  validUntil: any;
  maxAmount: any;
  discountType: any;
}

const AddAdress = () => {
  const router = useRouter();

  const [updateId, setUpdateId] = useState(null);
  const [updatedData, setUpdatedData] = useState({
    city: "",
    fullName: "",
    houseNo: "",
    landmark: "",
    locality: "",
    mobileNo: "",
    pinCode: "",
    state: "",
    alternateNumber: "",
    id: updateId,
    isDefault: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [active1, setActive1] = useState<string>("1");
  const [addGet, setAddGet] = useState<AddressData[]>([]);
  const [cardDetails, setCardDetails] = useState<CardData[]>([]);
  const [toggle, setToggle] = useState(false);
  const [showRazorPage, setShowRazorPage] = useState(false);
  const [couponData, setCouponData] = useState<CouponData[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [couponAmount, setCouponAmount] = useState(null);
  const [couponSlide, setCouponSlide] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [userId, setUserId] = useState<string | null>();

  const applyCoupon = (couponId: string) => {
    if (appliedDiscount > 0) {
      return;
    }

    const selectedCoupon = couponData.find((coupon) => coupon.id === couponId);
    if (selectedCoupon) {
      setAppliedDiscount(selectedCoupon.discountAmount);
      setCouponSlide(false);

      axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}coupon/addCouponData`, {
          couponId,
        })
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
    if (couponSlide) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [couponSlide]);

  const toggleRazorPage = () => {
    setShowRazorPage((prevShowRazorPage) => {
      return !prevShowRazorPage;
    });
  };

  const handleProceedToShipping = () => {
    router.push({
      pathname: "/shipping-address",
      // query: {
      //   toOrPr,
      //   toDiPr,
      //   toDi,
      //   toDiAfPr,
      //   tQty,
      //   appliedDiscount,
      // },
    });
  };

  const toggleUpdate = (id: any) => {
    setUpdateId(id);
    setToggle(!toggle);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const togglePara1 = (value: string) => {
    setActive1((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  const fetchAddressData = (userId: any) => {
    // Fetch address data from the API
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}user/getAddressDataById?userId=${userId}`
      )
      .then((response) => {
        setAddGet(response?.data?.addressList);
        const existingAddress = response?.data?.addressList;
        // Update the state with existing address data
        setUpdatedData(existingAddress);

        const defaultAddress = existingAddress.find(
          (address: any) => address.isDefault
        );
        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        } else if (existingAddress.length > 0) {
          setSelectedAddressId(existingAddress[0].id); // Select the first address if no default address is found
          handleSelectAddress(existingAddress[0].id);
        }
      })
      .catch((error) => {
        console.log("Error fetching address data", error);
      });
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    fetchAddressData(userId);
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
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectAddress = (addressId: any) => {
    const updatedAddresses = addGet.map((address) => ({
      ...address,
      isDefault: address.id === addressId,
    }));
    setAddGet(updatedAddresses);
    setSelectedAddressId(addressId);

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}user/updateAddressData?userId=${userId}&addressId=${addressId}`,
        {
          isDefault: true, // Set the selected address as default
        }
      )
      .then((response) => {})
      .catch((error) => {
        console.error("Error updating address default status:", error);
        const revertedAddresses = addGet.map((address) => ({
          ...address,
          isDefault: address.id === addressId,
        }));
        setAddGet(revertedAddresses);
      });
  };

  const updateAddressData = (e: any) => {
    e.preventDefault();

    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}user/updateAddressData?userId=${userId}&addressId=${updateId}`,
        updatedData
      )
      .then((response) => {
        setUpdatedData({
          city: "",
          fullName: "",
          houseNo: "",
          landmark: "",
          alternateNumber: "",
          locality: "",
          mobileNo: "",
          pinCode: "",
          state: "",
          id: updateId,
          isDefault: "",
        });
        setToggle(false);
        fetchAddressData(userId);
      })
      .catch((error) => {
        console.error("Error updating address data", error);
      });
  };

  const deleteAddress = (addressId: any) => {
    // Make a delete request to the backend API to delete the address
    axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}user/deleteAddressData?addressId=${addressId}`
      )
      .then((response) => {
        // After successful deletion, fetch the updated address data
        fetchAddressData(userId);
      })
      .catch((error) => {
        console.error("Error deleting address:", error);
      });
  };

  // Calculate total original price
  const toOrPr = cardDetails.reduce(
    (total, ele) =>
      total + ele.cartProduct.originalPrice * ele.cartProduct.quantity,
    0
  );

  // Calculate total discounted price
  const toDiPr = cardDetails.reduce(
    (total, ele) =>
      total + ele.cartProduct.salePrice * ele.cartProduct.quantity,
    0
  );

  // Calculate total discount
  const toDi = toOrPr - toDiPr + appliedDiscount;

  // Calculate total price after discount
  const toDiAfPr = toOrPr - toDi;
  const tQty = cardDetails.reduce(
    (total, ele) => total + ele.cartProduct.quantity,
    0
  );

  return (
    <>
      <HeaderHeadline />
      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem]">
        {/* Coupon  */}
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
        {/* Coupon  */}

        <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap">
          <div className="left-card sm:min-w-[65%] w-full">
            <h2 className="mb-[15px] font-semibold">
              {Strings.SHIPPING_ADDRESS}
            </h2>
            {toggle ? (
              <>
                {addGet.map((ele) => {
                  if (ele.id == updateId) {
                    return (
                      <form onSubmit={updateAddressData} key={ele.id}>
                        <div className="card py-6 px-3 mb-4 shadow-box">
                          <div className="flex justify-between">
                            <h2 className="sm:text-[18px] font-semibold sm:mb-8 mb-3">
                              {Strings.UPDATE_ADD}
                            </h2>
                            <h3
                              onClick={toggleUpdate}
                              className="text-[13px] text-[blue] cursor-pointer hover:underline"
                            >
                              {Strings.CANCEL}
                            </h3>
                          </div>

                          <div className="sm:flex justify-between w-full sm:mb-4">
                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="text"
                                  name="fullName"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.fullName || ele.fullName
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.fullName || ele.fullName
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.FULL_NAME}
                                </span>
                              </label>
                            </div>
                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="number"
                                  name="mobileNo"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.mobileNo || ele.mobileNo
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.mobileNo || ele.mobileNo
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.ENTER_MOBILE}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="sm:flex justify-between w-full sm:mb-4">
                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="text"
                                  name="houseNo"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.houseNo || ele.houseNo
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.houseNo || ele.houseNo
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.ENTER_ADDRESS}
                                </span>
                              </label>
                            </div>

                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="text"
                                  name="state"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.alternateNumber ||
                                    ele.alternateNumber
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.alternateNumber ||
                                    ele.alternateNumber
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.ENTER_ALTERNATE_MOB}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="sm:flex justify-between w-full sm:mb-4">
                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="text"
                                  name="landmark"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.landmark || ele.landmark
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.landmark || ele.landmark
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.ENTER_LANDMARK}
                                </span>
                              </label>
                            </div>

                            <div className="sm:w-[48%] w-full mb-3">
                              <label className="relative">
                                <input
                                  type="number"
                                  name="pinCode"
                                  onChange={handleChange}
                                  defaultValue={
                                    updatedData.pinCode || ele.pinCode
                                  }
                                  className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                                />
                                <span
                                  className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                                    updatedData.pinCode || ele.pinCode
                                      ? "transform -translate-y-5 -translate-x-1 scale-75"
                                      : ""
                                  }`}
                                >
                                  {Strings.ENTER_PIN}
                                </span>
                              </label>
                            </div>
                          </div>

                          <div className="flex items-center justify-center">
                            <button
                              type="submit"
                              className=" py-[7px] px-[30px] rounded-[20px] bg-PictonBlue text-[#fff] hover:bg-opacity-80 duration-200 text-[14px]"
                            >
                              Update
                            </button>
                          </div>
                        </div>
                      </form>
                    );
                  }
                })}
              </>
            ) : (
              <>
                <div className="p-[14px] sm:p-[30px] shadow-box">
                  <div className="flex items-center justify-between text-[12px] sm:mb-10 mb-5">
                    <h3 className="sm:text-[14px] text-[13px] font-semibold">
                      {Strings.YOU_HAVE_SAVED_ADD}
                    </h3>
                    <div>
                      <button
                        onClick={handleProceedToShipping}
                        className="border border-PictonBlue p-2 text-PictonBlue rounded-[6px] hover:text-white hover:bg-PictonBlue"
                      >
                        {Strings.ADD_NEW_ADD}
                      </button>
                    </div>
                  </div>
                  {addGet.map((ele) => {
                    return (
                      <div
                        className="flex border gap-[6px] sm:gap-0 justify-between items-center sm:p-[20px] p-[12px] mb-6"
                        key={ele.id}
                      >
                        <div className="text-[13px] sm:text-[14px] flex items-center gap-4">
                          <div>
                            <label>
                              <input
                                type="radio"
                                className="form-radio rounded-full peer"
                                onChange={() => handleSelectAddress(ele.id)}
                                checked={ele.isDefault}
                              />
                            </label>
                          </div>
                          <div>
                            <h2 className="font-semibold text-[14px] sm:text-[15px]">
                              {ele.fullName || ""}
                            </h2>
                            <h3 className="text-[13px] sm:text-[14px]">
                              {Strings.PH_NO} {ele.mobileNo || ""}
                            </h3>
                            <h3 className="text-[13px] sm:text-[14px]">
                              {ele.houseNo || ""} {""}
                              {ele.landmark || ""} {""}
                              {ele.state} , {ele.pinCode || ""}
                            </h3>
                          </div>
                        </div>
                        <div>
                          <button
                            className="py-[2px] px-5 rounded-[5px] text-PictonBlue hover:bg-PictonBlue border hover:text-[#fff] hover:bg-opacity-80 border-PictonBlue duration-200 text-[12px] sm:text-[13px] mb-2"
                            onClick={() => toggleUpdate(ele.id)}
                          >
                            {Strings.EDIT}{" "}
                          </button>
                          <br />
                          <button
                            className="py-[2px] px-3 rounded-[5px] text-[#be123c] hover:bg-[#be123c] border hover:text-[#fff] hover:bg-opacity-80 border-[#be123c] duration-200 text-[12px] sm:text-[13px]"
                            onClick={() => deleteAddress(ele.id)}
                          >
                            {Strings.DELETE}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          <div className="right sm:min-w-[30%] w-full">
            <h2 className="mb-[15px] font-semibold">{Strings.SUMMARY}</h2>
            <div className="shadow-box p-2 mb-4 text-[14px] ">
              <div className="items-center flex gap-4 border p-2 rounded-[6px] bg-[#e7eee5]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="#75F94D"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3>{Strings.FREE_STD_DELIVERY}</h3>
              </div>
            </div>

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
                              {couponData.length} {Strings.COUPONS}
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

            <div className="shadow-box mb-4 p-3">
              <div className="lg:p-4 p-2 border flex items-center justify-between text-[10px] lg:text-[13px]">
                <h4 className=" font-semibold">
                  {Strings.YOUR_CART}{" "}
                  <span className="text-orange-500 ml-1">
                    ( {tQty} {Strings.ITEM} )
                  </span>
                </h4>
                <div className="flex items-center lg:gap-2">
                  <button className="text-[blue] underline cursor-pointer">
                    {Strings.VIEW_DETAILS}
                  </button>
                  <button
                    className={`focus:outline-none transition-transform duration-400 ease-in-out ${
                      isOpen ? "rotate-90" : ""
                    }`}
                    onClick={toggleDropdown}
                  >
                    <img
                      src={Images.RIGHT_ARROW}
                      alt="Dropdown Arrow"
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              </div>
              <div>
                {isOpen && (
                  <>
                    {cardDetails.map((ele) => {
                      return (
                        <>
                          <div
                            className=" mt-2 text-[14px] flex gap-2 py-3 justify-around"
                            key={ele.id}
                          >
                            <div className="border h-[60px] w-[100px] mr-3 mb-2 ">
                              <img
                                src={ele.cartProduct.productImage}
                                alt="gog"
                                className="w-[100%] h-[100%] object-contain"
                              />
                            </div>

                            <div>
                              <div>
                                <h3 className="frame-name text-[12px] font-semibold">
                                  {ele.title}
                                </h3>
                                <h3 className="text-[13px] mb-1">
                                  <span className="text-PictonBlue">
                                    {Strings.FRAME}
                                  </span>{" "}
                                  {ele.frameShape.charAt(0).toUpperCase() +
                                    ele.frameShape.slice(1).toLowerCase()}{" "}
                                  {ele.frameStyle} {ele.category}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <h3 className="sm:mr-[14px] mr-2 text-[14px]">
                                    {Strings.QTY}{" "}
                                    <span className="">
                                      {ele.cartProduct.quantity}
                                    </span>
                                  </h3>
                                  <p className="amt text-[11px] font-semibold">
                                    ₹
                                    {(
                                      ele.cartProduct.salePrice *
                                      ele.cartProduct.quantity
                                    ).toLocaleString()}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
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
                  disabled={!selectedAddressId}
                  onClick={toggleRazorPage}
                  className="w-full p-3 bg-PictonBlue text-[#fff] text-[14px] hover:bg-opacity-80 rounded-[6px]"
                >
                  {Strings.PROCEED_TO_CHECKOUT}
                </button>
                {showRazorPage && (
                  <RazorPage onCancel={toggleRazorPage} toDiAfPr={toDiAfPr} />
                )}
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

export default AddAdress;
