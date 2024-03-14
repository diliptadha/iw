import { Images, Strings } from "@/constant";
import "../app/globals.css";
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import SimilarProduct from "@/Component/SimilarProduct";


const SimilarProductPage = () => {

    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef2 = useRef<HTMLDivElement>(null);


    const SimilarProductsData = [
        // {
        //     image: Images.SAMPLE2,
        //     title: "100%",
        //     description: "6604-GOLDEN_BROWN-51-1",
        //     rating: 4.5,
        //     price: "499",
        //     colors: ["black", "blue", "black", "brown", "red", "grey"],

        // },
        {
            image: Images.SAMPLE2,
            title: "100%",
            description: "6604-GOLDEN_BROWN-51-1",
            rating: 4.5,
            price: "499",
            colors: ["black", "blue", "black", "brown", "red", "grey"],

        },
        {
            image: Images.SAMPLE2,
            title: "KADIYAM",
            description: "65003-MATTEBLACK_SILVER-52-1",
            rating: 4,
            price: "350",
            colors: ["black", "blue", "grey"],

        },
        {
            image: Images.SAMPLE2,
            title: "KADIYAM ",
            description: "70029-18-BROWN-50-1",
            rating: 2,
            price: "450",
            colors: ["black", "blue", "black", "brown", "red", "grey"]
        },
        {
            image: Images.SAMPLE2,
            title: "K_D ",
            description: "17140-CY-MAROON_SILVER-49-1",
            rating: 5,
            price: "500",
            colors: ["black", "brown", "grey"]
        },
        {
            image: Images.SAMPLE2,
            title: "K_D ",
            description: "A-25172-PINK_GOLD-52-1",
            rating: 4,
            price: "400",
            colors: ["black", "grey"]
        },
        {
            image: Images.SAMPLE2,
            title: "K_D ",
            description: "A-25172-PINK_GOLD-52-1",
            rating: 3.5,
            price: "400",
            colors: ["black", "brown", "red", "grey"]
        },
        {
            image: Images.SAMPLE2,
            title: "K_D ",
            description: "A-25172-PINK_GOLD-52-1",
            rating: 4.5,
            price: "400",
            colors: ["black", "grey"]
        },
    ];


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
            <p className="mt-8 px-[2rem] md:px-[2rem] font-bold  text-[12px] lg:text-[14px]"> {Strings.SIMILAR_PRODUCTS}</p>
            <div className="flex items-center">
                <Image
                    onClick={handleScrollLeft2}
                    src={Images.DOWN_ARROW}
                    alt="/"
                    height={16}
                    width={16}
                    className="rotate-90 cursor-pointer text-blue-300"
                />
                <div
                    ref={containerRef2}
                    className="mt-5 mx-3 overflow-hidden flex space-x-10- w-full overflow-x-scroll no-scrollbar"
                >
                    <div className=""><div className="relative h-[335px] w-[320px] rounded-[10px] mr-5 md:mr-10">
  <Image src={Images.EXPLORE} alt="/" height={345} width={330} className="relative" />
  <div className="absolute inset-0 flex flex-col items-center">
    <p className="mt-[160px] text-[64px] text-white font-extrabold">{Strings.OCEAN_EXPLORE}</p>
    <p className="mt-[-20px] text-[20px] font-medium">{Strings.EYEGLASSES}</p>
    <button className="mt-4 w-[136px] h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue">
    {Strings.EXPLORE}
    </button>
  </div>
</div></div>
                    {SimilarProductsData.map((product, index) => (

                        <SimilarProduct

                            key={index}
                            image={product.image}
                            title={product.title}
                            description={product.description}
                            price={`₹${product.price}`}
                            rating={product.rating}
                            colors={product.colors}

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