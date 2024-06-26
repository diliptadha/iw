import "../app/globals.css";

import React, { useState } from "react";

import { Footer } from "@/Component/footer";
import Headerforfaqs from "@/Component/headerforfaqs";
import { Strings } from "@/constant";

const Terms = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <Headerforfaqs setSearch={setSearch} />
      <div className=" px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] ">
        <h1 className="underline text-[30px] font-semibold mb-[20px] text-[#42b7e9]">
          {Strings.TERM_CONDITION}
        </h1>
        <div className="text-justify">
          <p className="term-para">{Strings.term_para1}</p>
          <p className="term-para">{Strings.term_para2}</p>
          <p className="term-para">
            {Strings.term_para3_1}{" "}
            <a href="mailto:-" className="text-[blue] font-bold underline">
              {Strings.term_para3_anchor}
            </a>{" "}
            {Strings.term_para3_2}{" "}
          </p>

          <div>
            <h2 className="term-head">
              1. <span>{Strings.term_head1}</span>
            </h2>
            <p className="term-para">{Strings.term_head1_para1}</p>
            <p className="term-para">{Strings.term_head1_para2}</p>
          </div>

          <div>
            <h2 className="term-head">
              2. <span>{Strings.term_head2}</span>
            </h2>
            <p className="term-para">{Strings.term_head2_para1}</p>
            <p className="term-para">{Strings.term_head2_para2}</p>
            <ul className="pl-[10px] mb-[10px]">
              <li>{Strings.term_head2_l1}</li>
              <li>{Strings.term_head2_l2}</li>
              <li>{Strings.term_head2_l3}</li>
              <li>{Strings.term_head2_l4}</li>
            </ul>
            <p className="term-para">{Strings.term_head2_para3}</p>
            <p className="term-para">{Strings.term_head2_para4}</p>
            <h5 className="term-para-list-head">{Strings.term_head2_para5}</h5>
            <ul className="pl-[10px] mb-[10px]">
              <li>{Strings.term_head2_l5}</li>
              <li>{Strings.term_head2_l6}</li>
            </ul>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>{" "}
              {Strings.term_head2_para6}
            </p>
          </div>

          <div>
            <h2 className="term-head">
              3. <span>{Strings.term_head3}</span>
            </h2>
            <p className="term-para">{Strings.term_head3_para1}</p>
            <p className="term-para">{Strings.term_head3_para2}</p>
          </div>

          <div>
            <h2 className="term-head">
              4. <span>{Strings.term_head4}</span>
            </h2>
            <p className="term-para">{Strings.term_head4_para1}</p>
            <p className="term-para">{Strings.term_head4_para2}</p>
            <p className="term-para">{Strings.term_head4_para3}</p>
            <p className="term-para">{Strings.term_head4_para4}</p>
            <p className="term-para">{Strings.term_head4_para5}</p>
            <p className="term-para">{Strings.term_head4_para6}</p>
            <p className="term-para">{Strings.term_head4_para7}</p>
            <h5 className="term-para-list-head"></h5>
            <ul className="pl-[10px] mb-[10px]">
              <li>{Strings.term_head4_l1}</li>
              <li>{Strings.term_head4_l2}</li>
              <li>{Strings.term_head4_l3}</li>
              <li>{Strings.term_head4_l4}</li>
            </ul>
          </div>

          <div>
            <h2 className="term-head">
              5. <span>{Strings.term_head5}</span>
            </h2>
            <p className="term-para">{Strings.term_head5_para1}</p>
          </div>

          <div>
            <h2 className="term-head">
              6. <span>{Strings.term_head6}</span>
            </h2>
            <h5 className="term-para-list-head"></h5>
            <p className="term-para">{Strings.term_head6_p1}</p>
            <p className="term-para">{Strings.term_head6_p2}</p>
            <p className="term-para">{Strings.term_head6_p3}</p>
            <p className="term-para">{Strings.term_head6_p4}</p>
            <p className="term-para">{Strings.term_head6_p5}</p>
            <p className="term-para">{Strings.term_head6_p6}</p>
          </div>

          <div>
            <h2 className="term-head">
              7. <span>{Strings.term_head7}</span>
            </h2>
            <p className="term-para">{Strings.term_head7_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              8. <span>{Strings.term_head8}</span>
            </h2>
            <p className="term-para">{Strings.term_head8_p1}</p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>{" "}
              {Strings.term_head8_p2}
            </p>
          </div>

          <div>
            <h2 className="term-head">
              9. <span>{Strings.term_head9}</span>
            </h2>
            <p className="term-para">{Strings.term_head9_p1}</p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>{" "}
              {Strings.term_head9_p2_1}{" "}
              <a href="mailto:-" className="underline text-[blue] font-bold">
                {Strings.term_head9_p2_anchor}
              </a>{" "}
              {Strings.term_head9_p2_2}
            </p>
            <p className="term-para-tit">{Strings.term_head9_t1}</p>
            <p className="term-para">{Strings.term_head9_p3}</p>
            <p className="term-para-tit">{Strings.term_head9_t2}</p>
            <p className="term-para">{Strings.term_head9_p4}</p>
            <p className="term-para-tit">{Strings.term_head9_t3}</p>
            <p className="term-para">
              {Strings.term_head9_p5_1}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head9_p5_anchor}
              </a>{" "}
              {Strings.term_head9_p5_2}
            </p>
            <p className="term-para">{Strings.term_head9_p6}</p>
            <p className="term-para">{Strings.term_head9_p7}</p>
            <p className="term-para">{Strings.term_head9_p8}</p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>{" "}
              {Strings.term_head9_p9}
            </p>
            <p className="term-para-tit">{Strings.term_head9_t4}</p>
            <p className="term-para">{Strings.term_head9_p10}</p>
            <p className="term-para">{Strings.term_head9_p11}</p>
            <p className="term-para">{Strings.term_head9_p12}</p>
          </div>

          <div>
            <h2 className="term-head">
              10. <span>{Strings.term_head10}</span>
            </h2>
            <p className="term-para">{Strings.term_head10_p1}</p>
            <p className="term-para">{Strings.term_head10_p2}</p>
            <p className="term-para">{Strings.term_head10_p3}</p>
            <p className="term-para">{Strings.term_head10_p4}</p>
            <p className="term-para">{Strings.term_head10_p5}</p>
          </div>

          <div>
            <h2 className="term-head">
              11. <span>{Strings.term_head11}</span>
            </h2>
            <p className="term-para">{Strings.term_head11_p1}</p>
            <p className="term-para">{Strings.term_head11_p2}</p>
            <p className="term-para">{Strings.term_head11_p3}</p>
          </div>

          <div>
            <h2 className="term-head">
              12. <span>{Strings.term_head12}</span>
            </h2>
            <p className="term-para">{Strings.term_head12_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              13. <span>{Strings.term_head13}</span>
            </h2>
            <p className="term-para">{Strings.term_head13_p1}</p>
            <p className="term-para">{Strings.term_head13_p2}</p>
            <p className="term-para">{Strings.term_head13_p3}</p>
            <p className="term-para">
              {Strings.term_head13_p4}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head13_p4_anchor}
              </a>{" "}
            </p>
          </div>

          <div>
            <h2 className="term-head">
              14. <span>{Strings.term_head14}</span>
            </h2>
            <p className="term-para">{Strings.term_head14_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              15. <span>{Strings.term_head15}</span>
            </h2>
            <p className="term-para">
              {Strings.term_head15_p1_1}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head15_p1_anchor}
              </a>{" "}
              {Strings.term_head15_p1_2}
            </p>
            <p className="term-para">{Strings.term_head15_p2}</p>
            <p className="term-para">{Strings.term_head15_p3}</p>
          </div>

          <div>
            <h2 className="term-head">
              16. <span>{Strings.term_head16}</span>
            </h2>
            <p className="term-para">{Strings.term_head16_p1}</p>
            <p className="term-para">
              {Strings.term_head16_p2_1}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head16_p2_anchor}
              </a>{" "}
              {Strings.term_head16_p2_2}
            </p>
          </div>

          <div>
            <h2 className="term-head">
              17. <span>{Strings.term_head17}</span>
            </h2>
            <p className="term-para">{Strings.term_head17_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              18. <span>{Strings.term_head18}</span>
            </h2>
            <p className="term-para">{Strings.term_head18_p1}</p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>
              {Strings.term_head18_p2}
            </p>
            <p className="term-para">{Strings.term_head18_p3}</p>
          </div>

          <div>
            <h2 className="term-head">
              19. <span>{Strings.term_head19}</span>
            </h2>
            <p className="term-para">{Strings.term_head19_p1}</p>
            <p className="term-para">{Strings.term_head19_p2}</p>
            <p className="term-para">{Strings.term_head19_p3}</p>
          </div>

          <div className="mb-[30px] mt-[30px]">
            <h2 className="term-head">
              <span>{Strings.term_head_extra}</span>
            </h2>
          </div>
          {/* 20 */}
          <div>
            <h2 className="term-head">
              20. <span>{Strings.term_head20}</span>
            </h2>
            <p className="term-para">{Strings.term_head20_p1}</p>
            <p className="term-para">
              {Strings.term_head20_p2_1}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head20_p2_anchor}
              </a>{" "}
              {Strings.term_head20_p2_2}
            </p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>
              {Strings.term_head20_p3}
            </p>
          </div>

          <div>
            <p className="term-para-head">{Strings.term_head20_hp1}</p>
          </div>

          <div>
            <p className="term-para">
              <span className="term-para-head font-bold">
                {Strings.term_head20_hp2}
              </span>
              {Strings.term_head20_p4}
            </p>
            <p className="term-para">
              <span className="term-para-head font-bold">
                {Strings.term_head20_hp3}
              </span>
              {Strings.term_head20_p5}
            </p>
            <p className="term-para">
              <span className="term-para-head font-bold">
                {Strings.term_head20_hp4}
              </span>
              {Strings.term_head20_p6}
            </p>
            <p className="term-para">
              <span className="term-para-head font-bold">
                {Strings.term_head20_hp5}
              </span>
              {Strings.term_head20_p7}
            </p>
            <p className="term-para">
              <span className="font-bold">{Strings.NOTE}</span>
              {Strings.term_head20_p8}
            </p>
          </div>

          <div>
            <h2 className="term-head">
              21. <span>{Strings.term_head21}</span>
            </h2>
            <p className="term-para">{Strings.term_head21_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              22. <span>{Strings.term_head22}</span>
            </h2>
            <p className="term-para">{Strings.term_head22_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              23. <span>{Strings.term_head23}</span>
            </h2>
            <p className="term-para">{Strings.term_head23_p1}</p>
            <p className="term-para">
              <span className="font_bold">{Strings.PLEASE_NOTE}</span>{" "}
              {Strings.term_head23_p2}
            </p>
            <ul className="pl-[10px] mb-[10px]">
              <li>{Strings.term_head23_l1}</li>
              <li>{Strings.term_head23_l2}</li>
              <li>{Strings.term_head23_l3}</li>
              <li>{Strings.term_head23_l4}</li>
            </ul>
          </div>

          <div>
            <h2 className="term-head">
              24. <span>{Strings.term_head24}</span>
            </h2>
            <p className="term-para">{Strings.term_head24_p1}</p>
            <p className="term-para">
              <span className="font_bold">{Strings.PLEASE_NOTE}</span>{" "}
              {Strings.term_head24_p2}{" "}
              <a href="mailto:-" className="text-[blue] font-bold underline">
                {Strings.term_head24_p2_anchor}
              </a>{" "}
            </p>
            <p className="term-para">{Strings.term_head24_p3}</p>
          </div>

          <div>
            <h2 className="term-head">
              25. <span>{Strings.term_head25}</span>
            </h2>
            <p className="term-para">{Strings.term_head25_p1}</p>
            <p className="term-para">{Strings.term_head25_p2}</p>
            <ul className="pl-[10px] mb-[10px]">
              <li>{Strings.term_head25_l1}</li>
              <li>{Strings.term_head25_l2}</li>
              <li>{Strings.term_head25_l3}</li>
            </ul>
            <p className="term-para">{Strings.term_head25_p3}</p>
            <p className="term-para">{Strings.term_head25_p4}</p>
          </div>

          <div>
            <h2 className="term-head">
              26. <span>{Strings.term_head26}</span>
            </h2>
            <p className="term-para">{Strings.term_head26_p1}</p>
            <p className="term-para">{Strings.term_head26_p2}</p>
            <p className="term-para">{Strings.term_head26_p3}</p>
          </div>

          <div>
            <h2 className="term-head">
              27. <span>{Strings.term_head27}</span>
            </h2>
            <p className="term-para">{Strings.term_head27_p1}</p>
          </div>

          <div>
            <h2 className="term-head">
              28. <span>{Strings.term_head28}</span>
            </h2>
            <p className="term-para">{Strings.term_head28_p1}</p>
            <p className="term-para">{Strings.term_head28_p2}</p>
          </div>

          <div>
            <h2 className="term-head">
              29. <span>{Strings.term_head29}</span>
            </h2>
            <p className="term-para">{Strings.term_head29_p1}</p>
          </div>
          {/* 30 */}
          <div>
            <h2 className="term-head">
              30. <span>{Strings.term_head30}</span>
            </h2>
            <p className="term-para">{Strings.term_head30_p1}</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Terms;
