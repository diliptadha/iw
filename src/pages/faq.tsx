import { Images, Faqs, Strings } from "@/constant";
import "../app/globals.css"
import React from 'react';

const FAQ = () => {
  return (
    <>
      <div className=" px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem]">

        <div className="main-ques mb-[10px]">
          <h1 className="text-[#3A90E2] text-[22px]">{Faqs.GOT_QUES}</h1>
          <h1 className="text-[#3A90E2] text-[22px]">{Faqs.WE_HERE_HELP}</h1>
        </div>
        <div className="mb-[20px]">
          {/* 4 tags */}
          <a href="#" className="underline mb-[2px] font-bold">{Faqs.KNOW_YOUR_WEAR}</a><br />
          <a href="#" className="underline mb-[2px] font-bold">{Faqs.POLICIES}</a><br />
          <a href="#" className="underline mb-[2px] font-bold">{Faqs.MEMBERSHIPS}</a><br />
          <a href="#" className="underline mb-[2px] font-bold">{Faqs.FAQS}</a><br />
        </div>

        <div className="text-justify">
          <h2 className="faq-main-h">{Faqs.KNOW_YOUR_WEAR}</h2>
          <h3 className="faq-titi-col">{Faqs.FAQ_H1_TIT1}</h3>
          <h2 className="faq-h">{Faqs.FAQ_P1}</h2>
          <p className="faq-p">{Faqs.FAQ_P2_1} <a href="#" className="text-[blue] font-bold underline">{Faqs.HERE}</a> {Faqs.FAQ_P2_2} <a href="#" className="text-[blue] font-bold underline">{Faqs.VIRTUAL_AR_TECH}</a> {Faqs.FAQ_P2_3}</p>
          <p className="faq-p">{Faqs.FAQ_P3}</p>
          <h2 className="faq-h">{Faqs.FAQ_P4}</h2>
          <p className="faq-p">{Faqs.FAQ_P5}</p>

          <div className="w-full md:p-[2rem] md:h-[420px] h-[200px] mb-[30px]">
            <img
              src={Images.FAQ_ONE} alt="spack-img" className="w-[100%] h-[100%] object-contain" />
          </div>

          <h2 className="faq-h">{Faqs.FAQ_P6}</h2>
          <p className="faq-p">{Faqs.FAQ_P7}</p>

          {/* {table}  */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className="w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.LENS_TYPE}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {Faqs.FEATURE}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-center border-[#fff]">
                    {Faqs.ANTIGLARE_ANTIREFLECT}
                  </td>
                  <td className="px-6 py-2">
                    <ul className="list-disc p-[20px]">
                      <li className="faq_li">{Faqs.KNOWN_COATING}</li>
                      <li className="faq_li">{Faqs.ELI_GLARE_REFLECT}</li>
                      <li className="faq_li">{Faqs.IMPROVES_VISION}</li>
                    </ul>
                  </td>
                </tr>
                <tr className=" border-b border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-center border-[#fff]">
                    {Faqs.UV_PROTECTION}
                  </td>
                  <td className="px-6 py-2">
                    <ul className="list-disc p-[20px]">
                      <li className="faq_li">{Faqs.T1_L1}</li>
                      <li className="faq_li">{Faqs.T1_L2}</li>
                      <li className="faq_li">{Faqs.T1_L3}</li>
                    </ul>
                  </td>
                </tr>
                <tr className=" ">
                  <td scope="row" className="px-6 py-4 border-r border-[#fff] text-center">
                    {Faqs.ANTIGLARE_ANTIREFLECT}
                  </td>
                  <td className="px-6 py-2">
                    <ul className="list-disc p-[20px]">
                      <li className="faq_li">{Faqs.T1_L4}</li>
                      <li className="faq_li">{Faqs.T1_L5}</li>
                      <li className="faq_li">{Faqs.T1_L6}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="faq-h">{Faqs.FAQ_H2}</h2>
          <p className="faq-p">{Faqs.FAQ_P8}</p>

          {/* tABLE */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className="w-full text-sm bg-[#C6D9F1]" >
              <thead className="text-xs border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="">
                  </th>
                  <th scope="col" className="text-center ">
                    <img alt="table-one" src={Images.FAQ_TWO} className="w-[100%] object-contain h-[160px] flex flex-col " />
                  </th>
                  <th scope="col" className="text-center">
                    <img alt="table-one" src={Images.FAQ_THREE} className="w-[100%] object-contain h-[160px] flex flex-col " />
                  </th>
                  <th scope="col" className="text-center ">
                    <img alt="table-one" src={Images.FAQ_FOUR} className="w-[100%] object-contain h-[160px] flex flex-col " />
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap w-1/6 ">
                    {Faqs.FIELDS_OF_VISION}
                  </td>
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap w-1/6 ">
                    {Faqs.ONE}
                  </td>
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap w-1/6 ">
                    {Faqs.TWO}
                  </td>
                  <td className="px-6 py-2 w-1/6">
                    {Faqs.THREE}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap w-1/6 border-[#fff] ">
                    {Faqs.T2_TAB1}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap w-1/6 border-[#fff]">
                    {Faqs.T2_TAB2}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap w-1/6 border-[#fff]">
                    {Faqs.T2_TAB3}
                  </td>
                  <td scope="row" className="px-6 py-2 w-1/6">
                    {Faqs.T2_TAB4}
                  </td>
                </tr>
                <tr className="border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 py-4 border-r text-wrap w-1/6 border-[#fff]">
                    {Faqs.T2_TAB5}
                  </td>
                  <td scope="row" className="px-6 py-4 border-r text-wrap w-1/6 border-[#fff]">
                    {Faqs.T2_TAB6}
                  </td>
                  <td scope="row" className="px-6 py-4 border-r text-wrap w-1/6 border-[#fff]">
                    {Faqs.T2_TAB7}
                  </td>
                  <td className="px-6 py-2 w-1/6">
                    {Faqs.T2_TAB8}
                  </td>
                </tr>
                <tr className="text-center">
                  <td scope="row" className="px-6 py-4 border-r border-[#fff] text-wrap w-1/6">
                    {Faqs.T2_TAB9}
                  </td>
                  <td scope="row" className="px-6 py-4 border-r border-[#fff] text-wrap w-1/6">
                    {Faqs.T2_TAB10}
                  </td>
                  <td scope="row" className="px-6 py-4 border-r border-[#fff] text-wrap w-1/6">
                    {Faqs.CORRECT_PRESBYOPIA}
                  </td>
                  <td className="px-6 py-2 w-1/6">
                    {Faqs.CORRECT_PRESBYOPIA}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* table */}

          <h2 className="faq-h">{Faqs.FAQ_H3}</h2>
          <p className="faq-p">{Faqs.FAQ_P9_1} <a href="#" className="text-[blue] font-bold underline">{Faqs.VIRTUAL_AR_TECH}</a> {Faqs.FAQ_P9_1}</p>
          <p className="faq-p">{Faqs.FAQ_P10}</p>
          <h2 className="faq-h">{Faqs.FAQ_H4}</h2>
          <p className="faq-p">{Faqs.FAQ_P11_1} <a href="#" className="text-[blue] font-bold underline">{Faqs.EYE_STEP12}</a> {Faqs.FAQ_P11_1}</p>
          <h2 className="faq-h">{Faqs.FAQ_H5}</h2>
          <p className="faq-p">{Faqs.FAQ_P12}</p>
          <h3 className="faq-titi-col">{Faqs.FAQ_H1_TIT2}</h3>
          <h2 className="faq-h">{Faqs.FAQ_H6}</h2>
          <p className="faq-p">{Faqs.FAQ_P13}</p>
          <h2 className="faq-h">{Faqs.FAQ_H7}</h2>
          <p className="faq-p">{Faqs.FAQ_P14} <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a></p>
          <h2 className="faq-h">{Faqs.FAQ_H8}</h2>
          <p className="faq-p">{Faqs.FAQ_P15}</p>

        </div>

        {/* Policies Start  */}

        <div className="text-justify">
          <h2 className="faq-main-h">{Faqs.POLICIES}</h2>
          <h3 className="faq-titi-col">{Faqs.POL_TIT1}</h3>
          <p className="faq-p">{Faqs.POL_P1}</p>

          <div className="w-full">
            <img src={Images.FAQ_DELIVERY} alt="" />
          </div>

          <h2 className="faq-h">{Faqs.POL_H1}</h2>
          <p className="faq-p">{Faqs.POL_P2}</p>

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className=" w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.PRODUCT}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.ZERO_POWER}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.SINGLE_VISION}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {Faqs.BIFOCAL_PROGRESSIVE}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.EYEGLASSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS2_3}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS5_7}
                  </td>
                  <td className="px-6 py-2">
                    {Faqs.DAYS7_10}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.SUNGLASSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS2_3}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS5_7}
                  </td>
                  <td className="px-6 py-2">
                    {Faqs.DAYS7_10}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Strings.CONTACT_LENSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS2_3}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.DAYS5_7}
                  </td>
                  <td className="px-6 py-2">
                    {Faqs.DAYS7_10}
                  </td>
                </tr>
                <tr className="">
                  <td scope="col" className="px-6 py-4 border-r border-[#fff] text-wrap text-center">
                    {Faqs.ACCESSORIES}
                  </td>
                  <td scope="col" colSpan={3} className=" px-6 py-2">
                    <ul className="list-disc p-[20px]">
                      <li className="faq_li">{Faqs.T3_L1}</li>
                      <li className="faq_li">{Faqs.T3_L2}</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table */}

          <h2 className="faq-h">{Faqs.POL_H2}</h2>
          <p className="faq-p">{Faqs.POL_P3}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L1}</li>
            <li className="faq_li">{Faqs.POL_L2}</li>
          </ul>

          <h3 className="faq-titi-col">{Faqs.POL_TIT2}</h3>
          <h2 className="faq-h">{Faqs.POL_H3}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L3}</li>
            <li className="faq_li">{Faqs.POL_L4}</li>
            <li className="faq_li">{Faqs.POL_L5}</li>
            <li className="faq_li">{Faqs.POL_L6}</li>
            <li className="faq_li">{Faqs.POL_L7}</li>
            <li className="faq_li">{Faqs.POL_L8}</li>
            <li className="faq_li">{Faqs.POL_L9}</li>
            <li className="faq_li">{Faqs.POL_L10}</li>
            <li className="faq_li">{Faqs.POL_L11}</li>
          </ul>
          <h3 className="faq-titi-col">{Faqs.POL_TIT3}</h3>
          <p className="faq-p">{Faqs.POL_P4}</p>

          <h2 className="faq-h">{Faqs.POL_H4}</h2>

          {/* Table */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className=" w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.PRODUCT}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.REFUND_ELIGIBILITY_PERIOD}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {Faqs.EXCHANGE_PERIOD}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.EYEGLASSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_14_DAYS}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_14_DAYS}
                  </td>
                </tr>

                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.SUNGLASSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_7_DAYS}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_7_DAYS}
                  </td>
                </tr>

                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.CONTACT_LENSES}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_14_DAYS}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.NOT_ELIGIBLE}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.OTHER_BRANDS}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.NA}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.WITHIN_14_DAYS}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.OTHERS_LENS}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.NOT_ELIGIBLE}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.NOT_ELIGIBLE}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="faq-p">{Faqs.POL_P5} <a href="#" className="text-[blue] font-bold underline">{Faqs.WEB}</a></p>

          <h2 className="faq-h">{Faqs.POL_H5}</h2>
          <p className="faq-p">{Faqs.POL_P6}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L12}</li>
            <li className="faq_li">{Faqs.POL_L13}</li>
            <li className="faq_li">{Faqs.POL_L14}</li>
          </ul>

          <h2 className="faq-h">{Faqs.POL_H6}</h2>
          <p className="faq-p">{Faqs.POL_P7}</p>
          <h2 className="faq-h">{Faqs.POL_H7}</h2>

          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L15}</li>
            <li className="faq_li">{Faqs.POL_L16}</li>
            <li className="faq_li">{Faqs.POL_L17}</li>
            <li className="faq_li">{Faqs.POL_L18}</li>
          </ul>

          <h2 className="faq-h">{Faqs.POL_H8}</h2>
          <p className="faq-p">{Faqs.POL_P8}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L19}</li>
            <li className="faq_li">{Faqs.POL_L20}</li>
            <li className="faq_li">{Faqs.POL_L21}</li>
          </ul>

          <h3 className="faq-add font-bold text-[15px] mb-[10px]">
            {Faqs.ADDRESS} <br />
            {Faqs.P_ADD1} <br />
            {Faqs.P_ADD2} <br />
            {Faqs.P_ADD3}
          </h3>
          <p className="faq-p">{Faqs.POL_P9} <a href="mailto:-">{Faqs.SUPPORT_EMAIL_ID}</a></p>
          <h2 className="faq-h">{Faqs.POL_H9}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L22}</li>
            <li className="faq_li">{Faqs.POL_L23}</li>
          </ul>

          <h2 className="faq-h">{Faqs.POL_H10}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L24}</li>
            <li className="faq_li">{Faqs.POL_L25}</li>
            <li className="faq_li">{Faqs.POL_L26_1} <a href="#">{Faqs.HERE}</a> {Faqs.POL_L26_2}</li>
          </ul>

          <h2 className="faq-h">{Faqs.POL_H11}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L27}</li>
            <li className="faq_li">{Faqs.POL_L28}</li>
            <li className="faq_li">{Faqs.POL_L29}</li>
            <li className="faq_li">{Faqs.POL_L30}</li>
          </ul>
          <p className="faq-p">{Faqs.POL_P11}</p>
          <p className="faq-p">{Faqs.POL_P12}</p>
          <p className="faq-p">{Faqs.POL_P13}</p>

          <h2 className="faq-h">{Faqs.POL_H12}</h2>
          <p className="faq-p">{Faqs.POL_P14}</p>

          <div className="w-full mb-[20px]">
            <img src={Images.FAQ_REFUND} alt="refund-img" />
          </div>

          <p className="faq-p">{Faqs.POL_P14}</p>
          <p className="faq-p">{Faqs.POL_P15}</p>
          <h2 className="faq-h">{Faqs.POL_H13}</h2>
          <p className="faq-p">{Faqs.POL_P16}</p>
          <h2 className="faq-h">{Faqs.POL_H14}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L31}</li>
            <li className="faq_li">{Faqs.POL_L32}</li>
            <li className="faq_li">{Faqs.POL_L33}</li>
            <li className="faq_li">{Faqs.POL_L34}</li>
            <li className="faq_li">{Faqs.POL_L35}</li>
          </ul>
          <p className="faq-p">{Faqs.POL_P18}</p>
          <h2 className="faq-h">{Faqs.POL_H15}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L36}</li>
            <li className="faq_li">{Faqs.POL_L37}</li>
            <li className="faq_li">{Faqs.POL_L38}</li>
            <li className="faq_li">{Faqs.POL_L39}</li>
          </ul>
          <p className="faq-p">{Faqs.POL_P19}</p>
          <p className="faq-p">{Faqs.POL_P20}</p>
          <p className="faq-p">{Faqs.POL_P21}</p>

          <h2 className="faq-h">{Faqs.POL_H16}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L40}</li>
            <li className="faq_li">{Faqs.POL_L41}</li>
          </ul>
          <h2 className="faq-h">{Faqs.POL_H17}</h2>

          {/* Table */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className=" w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r w-1/3 border-[#fff]">
                    {Faqs.REFUND_SOURCE}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r w-1/3 border-[#fff]">
                    {Faqs.TIMELINE}
                  </th>
                  <th scope="col" className="px-6 py-4 w-1/3">
                    {Faqs.HOW_IT_DONE}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.STORE_CREDIT}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_1}
                  </td>
                  <td scope="row" rowSpan={3} className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_2}
                  </td>
                </tr>

                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.W_DEBIT_CARD}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_3}
                  </td>
                </tr>

                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.CREDIT_CARD}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_4}
                  </td>
                </tr>
                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.UPI_PAY}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_5}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T5_6}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="faq-h">{Faqs.POL_H18}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L42}</li>
            <li className="faq_li">{Faqs.POL_L43}</li>
            <li className="faq_li">{Faqs.POL_L44}</li>
          </ul>
          <h3 className="faq-titi-col">{Faqs.POL_TIT4}</h3>
          <h2 className="faq-h">{Faqs.POL_H19}</h2>
          <p className="faq-p">{Faqs.POL_P22}</p>
          <h2 className="faq-h">{Faqs.POL_H20}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L45}</li>
            <li className="faq_li">{Faqs.POL_L46}</li>
            <li className="faq_li">{Faqs.POL_L47}</li>
            <li className="faq_li">{Faqs.POL_L48}</li>
          </ul>
          <h2 className="faq-h">{Faqs.POL_H21}</h2>
          <p className="faq-p">{Faqs.POL_P23}</p>
          <p className="faq-p">{Faqs.POL_P24}</p>

          {/* Table */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className=" w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.DEDUCTIBLE}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.T6_1}
                  </th>
                  <th scope="col" className="px-6 py-4">
                    {Faqs.T6_2}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T6_3}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T6_4}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T6_5}
                  </td>
                </tr>

                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap">
                    {Faqs.T6_6}
                  </td>
                  <td scope="row" colSpan={2} className="px-6 border-r border-[#fff] py-4 text-wrap">
                    {Faqs.T6_7}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="faq-h">{Faqs.POL_H22}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.POL_L49}</li>
            <li className="faq_li">{Faqs.POL_L50}</li>
            <li className="faq_li">{Faqs.POL_L51}</li>
            <li className="faq_li">{Faqs.POL_L52}</li>
            <li className="faq_li">{Faqs.POL_L53}</li>
            <li className="faq_li">{Faqs.POL_L54}</li>
          </ul>
          <h3 className="faq-titi-col">{Faqs.POL_TIT5}</h3>
          <h2 className="faq-h">{Faqs.POL_H23}</h2>
          <p className="faq-p">{Faqs.POL_P25}</p>
          <h2 className="faq-h">{Faqs.POL_H24}</h2>
          <p className="faq-p">{Faqs.POL_P26}</p>

        </div>

        {/* warranty pages Start */}

        <div className="text-justify">
          <h3 className="faq-titi-col">{Faqs.W_TIT1}</h3>
          <h2 className="faq-h">{Faqs.W_H1}</h2>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.W_L1}</li>
            <li className="faq_li">{Faqs.W_L2}</li>
            <li className="faq_li">{Faqs.W_L3}</li>
            <li className="faq_li">{Faqs.W_L4}</li>
            <li className="faq_li">{Faqs.W_L5}</li>
            <li className="faq_li">{Faqs.W_L6}</li>
            <li className="faq_li">{Faqs.W_L7}</li>
          </ul>
          <p className="faq-p">
            {Faqs.W_P1_1} <br />
            <a href="tel:-" className="text-[blue] font-bold underline">{Faqs.IKSANA_NUMBER_7977} </a> <br />
            {Faqs.W_P1_2}
            <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
          </p>

          {/* nUMBER */}

          <h3 className="faq-titi-col">{Faqs.W_TIT2}</h3>
          <h2 className="faq-h">{Faqs.W_H2}</h2>
          <p className="faq-p">{Faqs.W_P2}</p>
          <p className="faq-p">{Faqs.W_P3}</p>
          <p className="faq-p">{Faqs.W_P4}</p>
          <p className="faq-p">{Faqs.W_P5}</p>
          <p className="faq-p">{Faqs.W_P6}</p>
          <p className="faq-p">{Faqs.W_P7}</p>
          <p className="faq-p">{Faqs.W_P8}</p>
          <p className="faq-p">{Faqs.W_P9}</p>

          <h2 className="faq-h">{Faqs.W_H3}</h2>
          <p className="faq-p">{Faqs.W_P10}</p>
          <p className="faq-p">{Faqs.W_P11}</p>
          <p className="faq-p">{Faqs.W_P12}</p>
          <p className="faq-p">{Faqs.W_P13}</p>
          <p className="faq-p">{Faqs.W_P14}</p>
          <p className="faq-p">{Faqs.W_P15}</p>
          <p className="faq-p">{Faqs.W_P16}</p>
          <p className="faq-p">{Faqs.W_P17}</p>
          <p className="faq-p">{Faqs.W_P18}</p>

          <h2 className="faq-h">{Faqs.W_H4}</h2>
          <p className="faq-p">{Faqs.W_P19}</p>
          <p className="faq-p-add">
            {Faqs.W_ADD1} <br />
            {Faqs.W_ADD2} <br />
            {Faqs.W_ADD3}
          </p>
          <p className="faq-p">{Faqs.W_P20}</p>
        </div>

        {/* faqs Start */}

        <div className="text-justify">
          <h2 className="faq-main-h">{Faqs.FAQS}</h2>
          <h2 className="faq-titi-col">{Faqs.F_H1}</h2>
          <p className="faq-p">
            {Faqs.F_P1_1}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.HERE}</a>
            {Faqs.F_P1_2}
          </p>
          <p className="faq-p">{Faqs.F_P2}</p>
          <p className="faq-p">{Faqs.F_P3_1} <a href="#" className="text-[blue] font-bold underline">{Faqs.VIRTUAL_AR_TECH}</a> {Faqs.F_P3_2}</p>
          <h2 className="faq-titi-col">{Faqs.F_H2}</h2>
          <p className="faq-p">{Faqs.F_P4}</p>
          <p className="faq-p">{Faqs.F_P5}</p>
          <h2 className="faq-titi-col">{Faqs.F_H3}</h2>
          <p className="faq-p">{Faqs.F_P6}</p>
          <h2 className="faq-titi-col">{Faqs.F_H4}</h2>
          <p className="faq-p">
            {Faqs.F_P7_1}
            <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
            {Faqs.F_P7_2}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.WEB}</a>
          </p>
          <h2 className="faq-titi-col">{Faqs.F_H5}</h2>
          <p className="faq-p">{Faqs.F_P8}</p>
          <h2 className="faq-titi-col">{Faqs.F_H6}</h2>
          <p className="faq-p">
            {Faqs.F_P9_1}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.F_P9_a1}</a>
            {Faqs.F_P9_2}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.F_P9_a2}</a>
            {Faqs.F_P9_3}</p>
          <h2 className="faq-titi-col">{Faqs.F_H7}</h2>
          <p className="faq-p">
            {Faqs.F_P10_1}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.VIRTUAL_AR_TECH}</a>
            {Faqs.F_P10_1}
          </p>
          <p className="faq-p">{Faqs.F_P11}</p>
          <h2 className="faq-titi-col">{Faqs.F_H8}</h2>
          <p className="faq-p">{Faqs.F_P12}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.F_L1}</li>
            <li className="faq_li">{Faqs.F_L2}</li>
            <li className="faq_li">{Faqs.F_L3}</li>
          </ul>
          <h2 className="faq-titi-col">{Faqs.F_H9}</h2>
          <p className="faq-p">{Faqs.F_P13}</p>
          <h2 className="faq-titi-col">{Faqs.F_H10}</h2>
          <p className="faq-p">{Faqs.F_P14}</p>
          <p className="faq-p">{Faqs.F_P15}</p>
          <h2 className="faq-titi-col">{Faqs.F_H11}</h2>
          <p className="faq-p">{Faqs.F_P16}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.F_L4}</li>
            <li className="faq_li">
              {Faqs.F_L5_1}
              <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
              {Faqs.F_L5_2}
              <a href="#" className="text-[blue] font-bold underline">{Faqs.WEB}</a>
            </li>
          </ul>
          <h2 className="faq-titi-col">{Faqs.F_H12}</h2>
          <p className="faq-p">
            {Faqs.F_P17_1}
            <a href="#" className="text-[blue] font-bold underline">{Faqs.HERE}</a>
            {Faqs.F_P17_2}
          </p>
          <h2 className="faq-titi-col">{Faqs.F_H13}</h2>
          <p className="faq-p">{Faqs.F_P18}</p>
          <h2 className="faq-titi-col">{Faqs.F_H14}</h2>
          <p className="faq-p">{Faqs.F_P19}</p>
          <h2 className="faq-titi-col">{Faqs.F_H15}</h2>
          <p className="faq-p">{Faqs.F_P20}</p>
          <h2 className="faq-titi-col">{Faqs.F_H16}</h2>
          <p className="faq-p">{Faqs.F_P21}</p>
          <h2 className="faq-titi-col">{Faqs.F_H17}</h2>
          <p className="faq-p">{Faqs.F_P22}</p>
          <h2 className="faq-titi-col">{Faqs.F_H18}</h2>
          <p className="faq-p">
            {Faqs.F_P23_1}
            <a href="tel:-" className="text-[blue] font-bold underline">{Faqs.IKSANA_NUMBER_7977}</a>
            {Faqs.F_P23_2}
            <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
            {Faqs.F_P23_3}
            <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.EYE_EMAIL_ID}</a>
            {Faqs.F_P23_4}
          </p>

          {/* Table */}

          <div className="relative overflow-x-auto shadow-md mb-[20px]">
            <table className=" w-full text-sm text-left rtl:text-right bg-[#C6D9F1] ">
              <thead className="text-xs md:text-[15px] border border-[#fff]">
                <tr className="text-center">
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.EXCALATION_MATRIX}
                  </th>
                  <th scope="col" className="px-6 py-4 border-r border-[#fff]">
                    {Faqs.EMAIL_ADD}
                  </th>
                </tr>
              </thead>
              <tbody className="text-xs md:text-[14px]">
                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.LEVEL_1}
                  </td>
                  <td scope="row" className="px-6 border-r py-4 text-wrap border-[#fff]">
                    {Faqs.T7_1} <a href="tel:-" className="text-[blue] font-bold underline">{Faqs.IKSANA_NUMBER_7977}</a> <br />
                    {Faqs.T7_2} <br />
                    {Faqs.T7_3} <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
                  </td>
                </tr>
                <tr className=" border-b text-center border-[#fff]">
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap">
                    {Faqs.LEVEL_2} <br />
                    {Faqs.T7_4}
                  </td>
                  <td scope="row" className="px-6 border-r border-[#fff] py-4 text-wrap">
                    <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.EYE_EMAIL_ID}</a>
                  </td>
                </tr>

                <tr className=" border-b border-[#fff] text-center">
                  <td scope="row" colSpan={2} className="px-6 border-r border-[#fff] py-4 text-wrap">
                    {Faqs.T7_5}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="faq-p">{Faqs.F_P24}</p>
          <p className="faq-p">{Faqs.F_P25}</p>
          <p className="faq-p">{Faqs.F_P26}</p>
          <ul className="list-disc pl-[20px] mb-[10px]">
            <li className="faq_li">{Faqs.F_L6}</li>
            <li className="faq_li">{Faqs.F_L7}</li>
          </ul>

        </div>

        {/* Need More help part */}

        <div>
          <h2 className="faq-titi-col">{Faqs.NEED_MORE_HELP}</h2>
          <p className="faq-p">{Faqs.NEED_MORE_HELP_ANS}</p>
        </div>

        <div>
          <div>
            <img src={Images.CALL_ICON} alt="phone-icon" className="w-[28px] h-[28px]" />
            <p>
              <a href="tel:-" className=" text-[blue] font-bold">{Faqs.IKSANA_NUM_8291}</a>
            </p>
          </div>
          <div>
            <img src={Images.WHATSAPP_ICON} alt="whatsapp-icon" className="w-[28px] h-[28px]" />
            <p>
              <a href="#" className="text-[blue] font-bold underline">{Faqs.CHAT_ON_WHATSAPP}</a>
            </p>
          </div>
          <div>
            <img src={Images.MSG_ICON} alt="email-icon" className="w-[28px] h-[28px]" />
            <p>
              <a href="mailto:-" className="text-[blue] font-bold underline">{Faqs.SUPPORT_EMAIL_ID}</a>
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

export default FAQ;