import "../app/globals.css";

import { Images, Strings } from "@/constant";
import React, { useState } from "react";

import { Footer } from "@/Component/footer";
import Headerforfaqs from "@/Component/headerforfaqs";
import Image from "next/image";
import WhatsAppButton from "@/Component/WhatsAppButton";

const Privacy = () => {
  const [search, setSearch] = useState("");

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-screen-2xl m-auto">
      <Headerforfaqs setSearch={setSearch} />
      <div className=" px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] ">
        <h1 className="text-[30px] font-semibold mb-[20px] text-[#42b7e9]">
          {Strings.PRIVACY_POLICY}
        </h1>
        <div className="text-justify">
          <h2 className="privacy-head">
            1. <span className="underline">{Strings.privacy_head1}</span>
          </h2>
          <p className="pri-head-para">{Strings.privacy_para1}</p>
          <div>
            <h4 className="pri-point">
              1. <span>{Strings.pri_point_head1}</span>
              {Strings.pri_point1}
            </h4>
            <h4 className="pri-point">
              2. <span>{Strings.pri_point_head2}</span>
              {Strings.pri_point2}
            </h4>
            <h4 className="pri-point">
              3. <span>{Strings.pri_point_head3}</span>
              {Strings.pri_point3}
            </h4>
            <h4 className="pri-point">
              4. <span>{Strings.pri_point_head4}</span>
              {Strings.pri_point4}
            </h4>
            <h4 className="pri-point">
              5. <span>{Strings.pri_point_head5}</span>
              {Strings.pri_point5}
            </h4>
            <h4 className="pri-point">
              6. <span>{Strings.pri_point_head6}</span>
              {Strings.pri_point6}
            </h4>
            <ul className="list-disc pl-[20px] mb-[10px]">
              <li className="privacy-list">{Strings.pri_list1}</li>
              <li className="privacy-list">{Strings.pri_list2}</li>
              <li className="privacy-list">{Strings.pri_list3}</li>
              <li className="privacy-list">{Strings.pri_list4}</li>
            </ul>
            <h4 className="pri-point">
              7. <span>{Strings.pri_point_head7}</span>
              {Strings.pri_point7}
            </h4>
            <h4 className="pri-point">
              8. <span>{Strings.pri_point_head8}</span>
              {Strings.pri_point8}
            </h4>
          </div>
        </div>

        <div className="text-justify">
          <h2 className="privacy-head">
            2. <span className="underline">{Strings.privacy_head2}</span>
          </h2>
          <p className="pri-head-para">{Strings.privacy_para2}</p>
        </div>

        <div className="text-justify">
          <h2 className="privacy-head">
            3. <span className="underline">{Strings.privacy_head3}</span>
          </h2>
          <p className="pri-head-para">
            {Strings.privacy_para3_1}
            <a
              href="/terms-conditions"
              className="text-[blue] font-bold underline"
            >
              {Strings.privacy_para3_anchor}{" "}
            </a>
            {Strings.privacy_para3_2}{" "}
          </p>
        </div>

        <div className="text-justify">
          <h2 className="privacy-head">
            4. <span className="underline">{Strings.privacy_head4}</span>
          </h2>
          <p className="pri-head-para">{Strings.privacy_para4}</p>
        </div>

        <div className="text-justify">
          <h2 className="privacy-head">
            5. <span className="underline">{Strings.privacy_head5}</span>
          </h2>
          <p className="pri-head-para">{Strings.privacy_para5}</p>
        </div>

        <div className="text-justify">
          <h2 className="privacy-head">
            6. <span className="underline">{Strings.privacy_head6}</span>
          </h2>
          <p className="pri-head-para">{Strings.privacy_para6}</p>
        </div>
      </div>
      <div className="flex justify-end xs:mx-[20px] xl:mx-[70px] my-10">
        <div className=" space-y-2 ">
          <button
            onClick={handleScrollToTop}
            className="bg-PictonBlue h-12 w-12 rounded-full flex justify-center items-center"
          >
            <Image src={Images.Upicon} alt="/" height={16} width={16} />
          </button>
          <WhatsAppButton
            phoneNumber={Strings.Whatsapp_No}
            message="Hello, I would like to know more about your services."
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Privacy;
