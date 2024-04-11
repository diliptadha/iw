// import React, { useEffect, useState } from "react";
// import "../app/globals.css";
// import { Images, Strings } from "@/constant";
// import Link from "next/link";
// import RazorPage from "@/Razorpay/razorpage";
// import axios from "axios";
// import { useRouter } from "next/router";

// interface CardData {
//   id: any;
//   title: any;
//   productId: any;
//   originalPrice: number;
//   salePrice: number;
//   productImage: any;
//   quantity: number;
// }

// const ProductADD = () => {
//   const router = useRouter();
//   const { toOrPr, toDiPr, toDi, toDiAfPr, tQty, appliedDiscount } =
//     router.query;
//   const [isOpen, setIsOpen] = useState(false);
//   const [active1, setActive1] = useState<string>("1");
//   const [showRazorPage, setShowRazorPage] = useState(false);
//   const [cardDetails, setCardDetails] = useState<CardData[]>([]);

//   const mrp = parseInt((toOrPr as string) || "0", 10);
//   const itemDiscount = parseInt((toDi as string) || "0", 10);
//   const netPrice = Array.isArray(toDiAfPr)
//     ? parseInt(toDiAfPr[0] ?? "0", 10)
//     : parseInt(toDiAfPr ?? "0", 10);

//   const toggleRazorPage = () => {
//     setShowRazorPage(!showRazorPage); // Toggle the state variable
//   };

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const togglePara1 = (value: string) => {
//     setActive1((oldValue) => {
//       return oldValue === value ? "" : value;
//     });
//   };

//   const PaymentDetail = [
//     {
//       id: 1,
//       image: Images.PAYTM,
//       title: "Razorpay Secure (EMI, UPI, Cards, Wallets, NetBanking)",
//       description: "Place Order",
//     },
//   ];

//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/product/getCartData?userId=IK0000003")
//       .then((response) => {
//         console.log(response.data.cartData);
//         setCardDetails(response?.data?.cartData);
//       })
//       .catch((error) => {
//         console.log("Error fetching data", error);
//       });
//   }, []);

//   return (
//     <>
//       <div className=" px-[1rem] py-[1rem] md:px-[3rem] xl:px-[6rem]">
//         {/* ANY */}

//         <div className="wrap-div flex gap-5 flex-wrap sm:flex-nowrap">
//           <div className="left-card sm:min-w-[65%] w-full">
//             <h2 className="mb-[15px] font-semibold">
//               {Strings.PAYMENT_OPTIONS}
//             </h2>
//             <div className="h-[200px] mb-8">
//               <img
//                 src={Images.PAY_IMAGE}
//                 alt="payment-image"
//                 className="h-full w-full"
//               />
//             </div>

//             <div className="lg:p-[30px] p-[10px] shadow-md ">
//               {PaymentDetail.map((ele) => {
//                 return (
//                   <div className="select-none items-center" key={ele.id}>
//                     <div className=" dark:border-none dark:bg-[#000] p-[1px] rounded-[11px] mb-4">
//                       <div className="w-full bg-[#fff] dark:bg-[#000] border rounded-[11px]">
//                         <label>
//                           <div className="flex justify-between items-center  p-3 cursor-pointer transition duration-500 ease-in-out ">
//                             <div className="flex gap-2 items-center">
//                               <input
//                                 type="radio"
//                                 name="default_text_color"
//                                 className="form-radio peer h-5 w-5"
//                                 checked
//                               />
//                               <h1 className=" font-semibold text-[14px] ">
//                                 {ele.title}
//                               </h1>
//                             </div>

//                             <div className="w-[40px] h-[30px]">
//                               <img
//                                 src={ele.image}
//                                 alt="payment_icon"
//                                 className="w-full h-full"
//                               />
//                             </div>
//                           </div>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           <div className="right sm:min-w-[30%] w-full">
//             <h2 className="mb-[15px] font-semibold">{Strings.SUMMARY}</h2>
//             <div className="shadow-md p-2 mb-4 text-[14px] ">
//               <div className="items-center flex gap-4 border p-2 rounded-[6px] bg-[#e7eee5]">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth="2.5"
//                   stroke="#75F94D"
//                   className="w-6 h-6"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                   />
//                 </svg>
//                 <h3>{Strings.FREE_STD_DELIVERY}</h3>
//               </div>
//             </div>

//             <div className="shadow-md mb-4 p-3">
//               <div className="lg:p-4 p-2 border flex items-center justify-between text-[10px] lg:text-[13px]">
//                 <h4 className=" font-semibold">
//                   {Strings.YOUR_CART}{" "}
//                   <span className="text-orange-500 ml-1">
//                     ( {tQty} {Strings.ITEM} )
//                   </span>
//                 </h4>
//                 <div className="flex items-center lg:gap-2">
//                   <Link href="#" className="text-[blue] underline ">
//                     {Strings.VIEW_DETAILS}
//                   </Link>
//                   <div className="">
//                     <button
//                       className={`focus:outline-none transition-transform duration-400 ease-in-out ${
//                         isOpen ? "rotate-90" : ""
//                       }`}
//                       onClick={toggleDropdown}
//                     >
//                       <img
//                         src={Images.RIGHT_ARROW}
//                         alt="Dropdown Arrow"
//                         className="h-4 w-4"
//                       />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 {isOpen && (
//                   <>
//                     {cardDetails.map((ele) => {
//                       return (
//                         <>
//                           <div className=" mt-2 text-[14px] flex gap-2 py-3 justify-around">
//                             <div className="border h-[60px] w-[100px] mr-3 mb-2 ">
//                               <img
//                                 src={ele.productImage}
//                                 alt="gog"
//                                 className="w-[100%] h-[100%] object-contain"
//                               />
//                             </div>

//                             <div>
//                               <div>
//                                 <h3 className="frame-name text-[12px] font-semibold">
//                                   {ele.title}
//                                 </h3>
//                                 <h3 className="text-[13px] mb-1">
//                                   <span className="text-PictonBlue">
//                                     {Strings.FRAME}
//                                   </span>{" "}
//                                   {Strings.FRAME_TYPE}
//                                 </h3>
//                                 <div className="flex items-center justify-between">
//                                   <h3 className="sm:mr-[14px] mr-2 text-[14px]">
//                                     {Strings.QTY}{" "}
//                                     <span className="">{ele.quantity}</span>
//                                   </h3>
//                                   <p className="amt text-[11px] font-semibold">
//                                     ₹
//                                     {(
//                                       ele.salePrice * ele.quantity
//                                     ).toLocaleString()}
//                                   </p>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </>
//                       );
//                     })}
//                   </>
//                 )}
//               </div>
//             </div>

//             <h2 className="mb-[15px] font-semibold">{Strings.PRICE_SUMMARY}</h2>
//             <div className="shadow-md">
//               <div className="p-4">
//                 <div className="flex w-[100%] items-center mb-2 justify-between">
//                   <h3 className="text-[14px]">{Strings.MRP}</h3>
//                   <p className="text-[13px]">₹{mrp.toLocaleString()}</p>
//                 </div>
//                 <div className="flex w-[100%] items-center text-green-600 mb-2 justify-between border-b pb-1">
//                   <h3 className="text-[14px]">{Strings.ITEM_DISC}</h3>
//                   <p className="text-[13px]">
//                     -₹{itemDiscount.toLocaleString()}
//                   </p>
//                 </div>
//                 {appliedDiscount ? (
//                   <div className="flex w-[100%] items-center text-green-600 mb-2 justify-between border-b pb-1">
//                     <h3 className="text-[14px]">{Strings.COUPON_DISC}</h3>
//                     <p className="text-[13px]">
//                       -₹{appliedDiscount.toLocaleString()}
//                     </p>
//                   </div>
//                 ) : (
//                   ""
//                 )}
//                 <div className="flex w-[100%] items-center mb-2 font-semibold justify-between border-b pb-1">
//                   <h3 className="text-[13px] md:[14px]">{Strings.NET_PRICE}</h3>
//                   <p className="text-[12px] md:[13px]">
//                     ₹{netPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div className="flex w-[100%] items-center mb-4 font-semibold justify-between">
//                   <h3 className="text-[13px] md:[14px]">{Strings.YOU_PAY}</h3>
//                   <p className="text-[12px] md:[13px]">
//                     ₹{netPrice.toLocaleString()}
//                   </p>
//                 </div>
//                 <div>
//                   <button
//                     onClick={toggleRazorPage}
//                     className="w-full p-3 bg-PictonBlue text-[#fff] text-[14px] rounded-[6px]"
//                   >
//                     {Strings.PROCEED_TO_CHECKOUT}
//                   </button>
//                   {showRazorPage && <RazorPage />}{" "}
//                   {/* Render RazorPage conditionally */}
//                 </div>
//               </div>
//             </div>

//             <div className="my-[12px]">
//               <ul className="pl-[26px] list-disc sm:text-[11px] text-[9px] flex gap-6 justify-center">
//                 <li>{Strings.SECURE_PAYMENT}</li>
//                 <li>{Strings.FREE_DELIVERY}</li>
//                 <li>{Strings.EASY_RETURN}</li>
//               </ul>
//             </div>

//             <div className="shadow-md">
//               <img src={Images.PAYMENT_CARD} alt="card-payment-icon" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductADD;
