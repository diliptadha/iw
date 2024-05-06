import React, { useEffect } from "react";
import "../app/globals.css";
import { Images, Strings } from "@/constant";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

interface FormData {
  userId: any;
  fullName: any;
  mobileNo: any;
  pinCode: any;
  alternateNumber: any;
  houseNo: any;
  locality: any;
  landmark: any;
  city: any;
  state: any;
  country: any;
  isDefault: boolean;
}

interface CardData {
  id: any;
  title: any;
  productId: any;
  originalPrice: number;
  salePrice: number;
  productImage: any;
  quantity: number;
}

const ShippingAddress = () => {
  const router = useRouter();
  // const { toOrPr, toDiPr, toDi, toDiAfPr, tQty, appliedDiscount } =
  //   router.query;
  // const mrp = parseInt((toOrPr as string) || "0", 10);
  // const itemDiscount = parseInt((toDi as string) || "0", 10);
  // const netPrice = Array.isArray(toDiAfPr)
  //   ? parseInt(toDiAfPr[0] ?? "0", 10)
  //   : parseInt(toDiAfPr ?? "0", 10);

  const [formData, setFormData] = useState<FormData>({
    userId: "IK0000001",
    fullName: "",
    mobileNo: "",
    pinCode: "",
    alternateNumber: "",
    houseNo: "",
    locality: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    isDefault: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [cardDetails, setCardDetails] = useState<CardData[]>([]);

  const gettingData = () => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=IK0000002`
      )
      .then((response) => {
        const cartData = response?.data?.cartData;
        setCardDetails(cartData);
        // setIsCartEmpty(cartData.length === 0);
      })
      .catch((error) => {
        console.log("Error fetching data", error);
      });
  };

  useEffect(() => {
    // fetchAddressData();
    gettingData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setErrors({
      ...errors,
      [name]: "",
    })
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleProceedToAddAddress = () => {
    router.push({
      pathname: "/add-adress",
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors: Partial<FormData> = {};
    // Perform validation
    if (formData.fullName.trim() === "") {
      newErrors.fullName = "This field should not be empty";
    }
    if (formData.mobileNo.trim().length !== 10) {
      newErrors.mobileNo = "Mobile number should be exactly 10 digits";
    }
    if (formData.pinCode.trim().length !== 6) {
      newErrors.pinCode = "Pin code should be 6 digits";
    }
    if (formData.houseNo.trim() === "") {
      newErrors.houseNo = "Address is required";
    }

    // If there are errors, set them in state
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      console.log("err", newErrors);
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}user/addAddressData`,
          formData
        );
        response
        setIsFormSubmitted(true);

        setFormData({
          userId: "IK0000001",
          fullName: "",
          mobileNo: "",
          pinCode: "",
          alternateNumber: "",
          houseNo: "",
          locality: "",
          landmark: "",
          city: "",
          state: "",
          country: "",
          isDefault: false,
        });

        handleProceedToAddAddress();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  // useEffect(() => {
  //   axios
  //     .get(`${process.env.NEXT_PUBLIC_API_URL}product/getCartData?userId=IK0000003`)
  //     .then((response) => {
  //       setCardDetails(response?.data?.cartData);
  //     })
  //     .catch((error) => {
  //       console.log("Error fetching data", error);
  //     });
  // }, []);

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
  const toDi = toOrPr - toDiPr ;

  // Calculate total price after discount
  const toDiAfPr = toOrPr - toDi;

  const tQty = cardDetails.reduce((total, ele) => total + ele.quantity, 0);

  return (
    <>
      <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem] ">
        <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap">
          <div className="left-card sm:min-w-[65%] w-full">
            <h2 className="mb-[15px] font-semibold">
              {Strings.SHIPPING_DETAILS}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="card py-6 px-3 mb-4 shadow-box">
                <h2 className="sm:text-[18px] font-semibold sm:mb-8 mb-3">
                  {Strings.ADD_ADDRESS}
                </h2>

                <div className="sm:flex justify-between w-full sm:mb-4">
                  <div className="sm:w-[48%] w-full mb-3">
                    <label className="relative">
                      <input
                        type="text"
                        name="fullName"
                        onChange={handleChange}
                        value={formData.fullName}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.fullName
                            ? "transform -translate-y-5 -translate-x-1 scale-75"
                            : ""
                        }`}
                      >
                        {Strings.FULL_NAME}
                      </span>
                    </label>
                    {errors.fullName && (
                      <p className="text-red-500 pl-2 text-[12px]">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="sm:w-[48%] w-full mb-3">
                    <label className="relative">
                      <input
                        type="number"
                        name="mobileNo"
                        onChange={handleChange}
                        value={formData.mobileNo}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.mobileNo
                            ? "transform -translate-y-5 -translate-x-1 scale-75"
                            : ""
                        }`}
                      >
                        {Strings.ENTER_MOBILE}
                      </span>
                    </label>
                    {errors.mobileNo && (
                      <p className="text-red-500 pl-2 text-[12px]">
                        {errors.mobileNo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex justify-between w-full sm:mb-4">
                  <div className="sm:w-[48%] w-full mb-3">
                    <label className="relative">
                      <input
                        type="number"
                        name="alternateNumber"
                        onChange={handleChange}
                        value={formData.alternateNumber}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.alternateNumber
                            ? "transform -translate-y-5 -translate-x-1 scale-75"
                            : ""
                        }`}
                      >
                        {Strings.ENTER_ALTERNATE_MOB}
                      </span>
                    </label>
                  </div>

                  <div className="sm:w-[48%] w-full mb-3">
                    <label className="relative">
                      <input
                        type="text"
                        name="houseNo"
                        onChange={handleChange}
                        value={formData.houseNo}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.houseNo
                            ? "transform -translate-y-5 -translate-x-1 scale-75"
                            : ""
                        }`}
                      >
                        {Strings.ENTER_ADDRESS}
                      </span>
                    </label>
                    {errors.houseNo && (
                      <p className="text-red-500 pl-2 text-[12px]">
                        {errors.houseNo}
                      </p>
                    )}
                  </div>
                </div>

                <div className="sm:flex justify-between w-full sm:mb-4">
                  <div className="sm:w-[48%] w-full mb-3">
                    <label className="relative">
                      <input
                        type="text"
                        name="landmark"
                        onChange={handleChange}
                        value={formData.landmark}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.landmark
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
                        value={formData.pinCode}
                        className="w-full transition duration-200 focus:border-[#e5e5e5] outline-none border-2 border-[#e5e5e5] border-opacity-50 py-2 px-2"
                      />
                      <span
                        className={`absolute left-[8px] top-[-2px] transition duration-200 text-[13px] text-gray-600 input-text z-[9999] bg-white px-2 ${
                          formData.pinCode
                            ? "transform -translate-y-5 -translate-x-1 scale-75"
                            : ""
                        }`}
                      >
                        {Strings.ENTER_PIN}
                      </span>
                    </label>
                    {errors.pinCode && (
                      <p className="text-red-500 pl-2 text-[12px]">
                        {errors.pinCode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-7 mt-7 flex items-center cursor-pointer hover:text-PictonBlue">
                  <input
                    type="checkbox"
                    name="isDefault"
                    className="mr-3 ml-2 cursor-pointer hover:text-PictonBlue"
                    onChange={handleChange}
                    checked={formData.isDefault}
                  />
                  <label htmlFor="checkbox">{Strings.SAVE_DEFAULT_ADD}</label>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className=" p-3 bg-PictonBlue text-[#fff] hover:bg-opacity-80 duration-200 text-[14px]"
                  >
                    {Strings.SAVE_ADDRESS_PROCEED}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right side */}
          <div className="right sm:min-w-[30%] w-full">
            <h2 className="mb-[15px] font-semibold">{Strings.SUMMARY}</h2>

            <div className="shadow-box mb-4 p-3">
              <div className="p-4 border flex items-center justify-between">
                <h4 className="text-[13px] font-semibold">
                  {Strings.YOUR_CART}{" "}
                  <span className="text-orange-500 ml-1">
                    ( {tQty} {Strings.ITEM} )
                  </span>
                </h4>
                <div className="flex items-center gap-2">
                  <button className="text-[blue] text-[12px] underline cursor-pointer">
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
                    {cardDetails.map((ele, index) => {
                      return (
                        <>
                          <div className=" mt-2 text-[14px] flex gap-2 py-3 justify-around" key={index}>
                            <div className="border h-[60px] w-[100px] mr-3 mb-2 ">
                              <img
                                src={ele.productImage}
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
                                  {Strings.FRAME_TYPE}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <h3 className="sm:mr-[14px] mr-2 text-[14px]">
                                    {Strings.QTY}{" "}
                                    <span className="">{ele.quantity}</span>
                                  </h3>
                                  <p className="amt text-[11px] font-semibold">
                                    ₹
                                    {(
                                      ele.salePrice * ele.quantity
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
                {/* {appliedDiscount ? (
                  <div className="flex w-[100%] items-center text-green-600 mb-2 justify-between border-b pb-1">
                    <h3 className="text-[14px]">{Strings.COUPON_DISC}</h3>
                    <p className="text-[13px]">
                      -₹{appliedDiscount.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  ""
                )} */}
                <div className="flex w-[100%] items-center mb-2 font-semibold justify-between border-b pb-1">
                    <h3 className="text-[13px] md:[14px]">
                      {Strings.NET_PRICE}
                    </h3>
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
                  onClick={handleProceedToAddAddress}
                  className={`w-full p-3 bg-PictonBlue text-[#fff] rounded-[6px] hover:bg-opacity-80 duration-200 text-[14px] ${
                    !isFormSubmitted ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                  disabled={!isFormSubmitted}
                  type="submit"
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

            {/* <div className="shadow-box">
              <img src={Images.PAYMENT_CARD} alt="card-payment-icon" />
            </div> */}

            <div className="relative mt-4 lg:mt-6 flex justify-between mb-4 lg:mb-6 w-full lg:w-[410px] xl:w-[520px]"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
