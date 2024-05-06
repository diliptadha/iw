import { Images, Strings } from "@/constant";
import "../app/globals.css";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SimilarProduct from "@/Component/SimilarProduct";
import axios from "axios";
import { useRouter } from "next/router";

const SimilarProductPage = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [similarProductData, setSimilarProductData] = useState([]);

  const router = useRouter();
  const { productId } = router.query;

  // const fetchSimilarProductData = async () => {
  //   await axios.get(
  //     `http://localhost:4000/product/getSimilarProductData?productId=${productId}`
  //   );
  //   const similarProductData = response.data.similarProductData;
  //   setSimilarProductData(similarProductData);
  //   // console.log('similar',similarProductData.color);
  // } catch (error) {
  //   console.error("Error fetching similar product data:", error);
  // }
  // }

  // use

  useEffect(() => {
    async function fetchSimilarProductData() {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}product/getSimilarProductData?productId=SC5355`
        );
        const similarProductData = response.data.similarProductData;
        setSimilarProductData(similarProductData);
      } catch (error) {
        console.error("Error fetching similar product data:", error);
      }
    }

    fetchSimilarProductData();
  }, []);

  const handleScrollRight2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const maxScrollRight = containerWidth - containerScrollWidth;

      const scrollStep = containerScrollWidth; // Example adjustment, you can adjust this value as needed

      if (scrollPosition < maxScrollRight) {
        containerRef2.current.scrollBy({
          left: scrollStep,
          behavior: "smooth",
        });
        setScrollPosition(scrollPosition + scrollStep);
      } else {
        containerRef2.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
        setScrollPosition(0);
      }
    }
  };

  const handleScrollLeft2 = () => {
    if (containerRef2.current) {
      const containerWidth = containerRef2.current.scrollWidth;
      const containerScrollWidth = containerRef2.current.offsetWidth;
      const scrollStep = containerScrollWidth;

      if (scrollPosition > 0) {
        const newScrollPosition = Math.max(scrollPosition - scrollStep, 0);
        containerRef2.current.scrollBy({
          left: -scrollStep, // Negative value for scrolling left
          behavior: "smooth",
        });
        setScrollPosition(newScrollPosition);
      } else {
        // If already scrolled to the beginning, scroll to the end
        const maxScrollRight = containerWidth - containerScrollWidth;
        containerRef2.current.scrollTo({
          left: maxScrollRight,
          behavior: "smooth",
        });
        setScrollPosition(maxScrollRight);
      }
    }
  };

  return (
    <div className="h-[520px] px-[1rem] md:px-[2rem] xl:px-[4rem] w-full  overflow-hidden bg-[#F2F2F2]">
      <div className=""></div>
      <p className="mt-8 px-[2rem] md:px-[2rem] font-bold text-[12px] lg:text-[16px]">Similar Products</p>
      <div className="flex items-center">
        <Image
          onClick={handleScrollLeft2}
          src={Images.DOWN_ARROW}
          alt="/"
          height={16}
          width={16}
          className="rotate-90 cursor-pointer text-blue-300"
          loading="lazy"
        />
        <div
          ref={containerRef2}
          className="mt-5 mx-3 overflow-hidden flex space-x-10- w-full overflow-x-scroll no-scrollbar"
        >
          <div className="">
            <div className="relative h-[335px] w-[320px] rounded-[10px] mr-5 md:mr-10">
              <Image
                src={Images.EXPLORE}
                alt="/"
                height={345}
                width={330}
                className="relative"
              />
              <div className="absolute inset-0 flex flex-col items-center">
                <p className="mt-[160px] text-[64px] text-white font-extrabold"></p>
                <p className="mt-[-20px] text-[20px] font-medium"></p>
                <button className="mt-4 w-[136px] h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue">
                  {Strings.EXPLORE}
                </button>
              </div>
            </div>
          </div>
          {similarProductData.map((product: any, index: any) => (
            <SimilarProduct
              key={index}
              productImage={product.productImage}
              title={product.title}
              description={product.description}
              salePrice={`₹ ${product.salePrice.toLocaleString("en-IN")}`}
              rating={product.rating}
              color={product.color}

              // isBestseller={index === 3}
            />
          ))}
        </div>
        <Image
          onClick={handleScrollRight2}
          src={Images.DOWN_ARROW}
          alt="/"
          height={16}
          width={16}
          className="rotate-270  cursor-pointer hover:text-PictonBlue"
        />
      </div>
    </div>
  );
};

export default SimilarProductPage;
