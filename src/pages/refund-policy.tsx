import { Strings } from "@/constant";
import "../app/globals.css";
import React from 'react';
import { Footer } from "@/Component/footer";

const refunds = () => {
    return (
        <>
            <div className="px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem]">
                <div>
                    <h2 className="title-refund mb-[45px]">{Strings.EXCHANGE_POLICY}</h2>
                </div>

                <div className="mb-[20px]">
                    <h2 className="title-refund mb-[10px]">{Strings.PART_EASY_EXC}</h2>
                    <h2 className="title-refund mb-[20px]">{Strings.EYEGLASSES_7_DAYS}</h2>
                    <h3 className="leading-[1.8] mb-[20px] tracking-[1px] text-justify">{Strings.PRIVACY_1PARA}</h3>
                    <ul className="list-disc pl-[25px]">
                        <li className="r-list"><span className="refund-span-li">{Strings.CONTACT_LENSES}</span> {Strings.UL1_L1}</li>
                        <li className="r-list"><span className="refund-span-li">{Strings.EYEWEAR}</span> {Strings.UL1_L2}</li>
                        <li className="r-list">{Strings.UL1_L3}</li>
                        <li className="r-list">{Strings.UL1_L4}</li>
                        <li className="r-list">{Strings.UL1_L5}</li>
                        <li className="r-list"><span className="refund-span-li">{Strings.ACCESORIES_LENS} </span>{Strings.UL1_L6}</li>
                        <li className="r-list"><span className="refund-span-li">{Strings.PARTIAL_BOGO} </span>{Strings.UL1_L7}</li>
                    </ul>
                </div>

                <div>
                    <h2 className="title-refund underline">{Strings.HOW_TO_RETURN}</h2>
                    <h3 className="refund-ques mb-[10px]">{Strings.VISIT_NEAR_STORE}</h3>
                    <ul className="list-disc pl-[25px] mb-[20px]">
                        <li className="r-list">{Strings.UL2_L1}</li>
                        <li className="r-list">{Strings.UL2_L2}</li>
                        <li className="r-list">{Strings.UL2_L3}</li>
                    </ul>
                    <h3 className="refund-ques">{Strings.SCHEDULE_PICKUP}</h3>
                    <h4 className="mb-[12px]">{Strings.PER_PICKUP_FREE}</h4>
                    <h4>{Strings.WE_ARRANGE_PICKUP}</h4>
                    <ul className="list-disc pl-[25px] mb-[20px]">
                        <li className="r-list">{Strings.UL3_L1}</li>
                        <li className="r-list">{Strings.UL3_L2}</li>
                        <li className="r-list">{Strings.UL3_L3}</li>
                    </ul>
                    <h3 className="refund-ques mb-[10px]">{Strings.SHIP_PRODUCT_IKSHANA}</h3>
                    <ul className="list-disc pl-[25px] mb-[20px]">
                        <li className="r-list">{Strings.UL4_L1}</li>
                        <li className="r-list">{Strings.UL4_L2}</li>
                        <li className="r-list">{Strings.UL4_L3}</li>
                    </ul>
                </div>

                <div>
                    <h2 className="title-refund underline">{Strings.EXCHANGE_AND_REFUND}</h2>
                    <h3 className="refund-ques">{Strings.EXCHANGE_OPTIONS}</h3>
                    <h4 className="mb-[20px]">{Strings.YOU_CAN_FOLLOWING_EXCHANGE}</h4>
                    <ul className="list-disc pl-[25px] mb-[20px]">
                        <li className="r-list">{Strings.UL5_L1}</li>
                        <li className="r-list">{Strings.UL5_L2}</li>
                        <li className="r-list">{Strings.UL5_L3}</li>
                    </ul>
                    <h3 className="refund-ques mb-[10px]">{Strings.REFUND_OPTIONS}</h3>
                    <h4 className="mb-[10px]">{Strings.REFUND_OPTION_PARA}</h4>
                    <h4 className="underline sm:text-[20px] text-[18px] mb-[10px]">{Strings.STORE_CREDIT}</h4>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li className="r-list">{Strings.UL6_L1}</li>
                        <li className="r-list">{Strings.UL6_L2}</li>
                        <li className="r-list">{Strings.UL6_L3}</li>
                        <li className="r-list">{Strings.UL6_L4}</li>
                    </ul>
                    <h4 className="underline sm:text-[20px] text-[18px] mb-[10px]">{Strings.REFUND_TO_SOURCE}</h4>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li className="r-list">{Strings.UL7_L1}</li>
                        <li className="r-list">{Strings.UL7_L2}</li>
                    </ul>
                    <p className="mb-[10px]">{Strings.REFUND_TO_SOURCE_PARA}</p>
                    <h4 className="underline sm:text-[20px] text-[18px] mb-[10px]">{Strings.TRANSFER_TO_BANK}</h4>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li className="r-list">{Strings.UL8_L1}</li>
                        <li className="r-list">{Strings.UL8_L2}</li>
                    </ul>

                    <h4 className="underline sm:text-[20px] text-[18px] mb-[10px]">{Strings.NOTE}</h4>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li className="r-list">{Strings.UL9_L1}</li>
                        <li className="r-list">{Strings.UL9_L2}</li>
                    </ul>
                </div>
                {/* currentColor */}
                <div>
                    <h2 className="title-refund">{Strings.PART_B}</h2>
                    <h3 className="mb-[10px]">{Strings.PART_B_PARA}</h3>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li className="r-list">{Strings.UL10_L1}</li>
                        <li className="r-list">{Strings.UL10_L2}</li>
                    </ul>
                </div>
                {/* currentColor */}
                <div>
                    <h2 className="title-refund">{Strings.PART_C}</h2>
                    <h2 className="title-refund underline mb-[6px]">{Strings.FREQUENTLY_ASKED_QUES}</h2>
                    {/* Q AND A */}
                    <h3 className="refund-ques">{Strings.Q1}</h3>
                    <h4 className="refund-ans">{Strings.A1}</h4>
                    <h3 className="refund-ques">{Strings.Q2}</h3>
                    <h4 className="refund-ans">{Strings.A2}</h4>
                    <h3 className="refund-ques">{Strings.Q3}</h3>
                    <h4 className="refund-ans">{Strings.A3}</h4>
                    <h3 className="refund-ques">{Strings.Q4}</h3>
                    <h4>{Strings.A4}</h4>
                    <ul className="list-disc pl-[25px] mb-[10px]">
                        <li>{Strings.STORE_CREDIT}</li>
                        <li>{Strings.TRANSFER_TO_BANK_UPI}</li>
                    </ul>
                    <h3 className="refund-ques">{Strings.Q5}</h3>
                    <h4 className="refund-ans">{Strings.A5}</h4>
                    <h3 className="refund-ques">{Strings.Q6}</h3>
                    <h4 className="refund-ans">{Strings.A6}</h4>
                    <h3 className="refund-ques">{Strings.Q7}</h3>
                    <h4 className="refund-ans">{Strings.A7}</h4>
                    <h3 className="refund-ques">{Strings.Q8}</h3>
                    <h4 className="refund-ans">{Strings.A8}</h4>
                    <h3 className="refund-ques">{Strings.Q9}</h3>
                    <h4 className="refund-ans">{Strings.A9}</h4>
                    <h3 className="refund-ques">{Strings.Q10}</h3>
                    <h4 className="refund-ans">{Strings.A10}</h4>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default refunds