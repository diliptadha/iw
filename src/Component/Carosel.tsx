"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import React, { useEffect, useState } from "react";

import { Carousel } from "react-responsive-carousel";
import axios from "axios";

interface SliderItem {
  id: string;
  title: string;
  image: string;
}

const Carosel = () => {
  const [slider, setSlider] = useState<SliderItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const fetchSliderData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}home/slider`
      );
      setSlider(response.data.sliderData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSliderData();
    const interval = setInterval(() => {
      if (slider.length > 0) {
        setCurrentSlide((prevSlide) =>
          prevSlide === slider.length - 1 ? 0 : prevSlide + 1
        );
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div className="w-full">
      <Carousel
        selectedItem={currentSlide}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        interval={2000}
        autoPlay={true}
        className="xs:h-[160px] md:h-[258px] lg:h-[358px] rounded-[10px] overflow-hidden"
      >
        {slider.map((item) => (
          <div key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="relative  object-cover- rounded-[10px] xs:h-[160px] md:h-[258px] lg:h-[358px] "
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
              <p className="text-white absolute xs:top-14 md:top-[98px] lg:top-32 font-extrabold xs:text-xl md:text-3xl lg:text-[64px] ">
                <span className="">
                  {item.title.split(" ").slice(0, 4).join(" ")}
                </span>
                <br />
                <span className="absolute xs:top-5 md:top-7 lg:top-20 left-0 right-0 bottom-0">
                  {item.title.split(" ").slice(4).join(" ")}
                </span>
              </p>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Carosel;
