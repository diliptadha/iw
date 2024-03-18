import "../app/Listingpage.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Product from "@/Component/Product";
import Shape from "@/Component/Shape";

const Listingpage = () => {
  const [isGridVisible1, setIsGridVisible1] = useState(true);
  const [isGridVisible2, setIsGridVisible2] = useState(true);
  const [isGridVisible3, setIsGridVisible3] = useState(true);
  const [isGridVisible4, setIsGridVisible4] = useState(true);
  const [isGridVisible5, setIsGridVisible5] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState({
    Men: false,
    Women: false,
    Kids: false,
    Unisex: false,
  });
  const [framestyle, setFrameStyle] = useState({
    Full_Rim: false,
    Half_Rim: false,
    Rimless: false,
  });
  const [framematerial, setFrameMaterial] = useState({
    Acetate: false,
    TR90: false,
    Metal: false,
    Wood: false,
    Titanium: false,
  });
  const [brands, setBrands] = useState({
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
  });
  const [isChecked, setIsChecked] = useState({
    Men: false,
    Women: false,
    Kids: false,
    Unisex: false,
    Full_Rim: false,
    Half_Rim: false,
    Rimless: false,
    Acetate: false,
    TR90: false,
    Metal: false,
    Wood: false,
    Titanium: false,
    A: false,
    B: false,
    C: false,
    D: false,
    E: false,
    F: false,
  });

  const handleCheckboxGender = (category: keyof typeof gender) => {
    const newCheckedState = { ...gender, [category]: !gender[category] };
    setGender(newCheckedState);
    console.log("GENDER:", newCheckedState);
  };
  const handleCheckboxFrameStyle = (category: keyof typeof framestyle) => {
    const newCheckedState = {
      ...framestyle,
      [category]: !framestyle[category],
    };
    setFrameStyle(newCheckedState);
    console.log("FRAMESTYLE:", newCheckedState);
  };
  const handleCheckboxFrameMaterial = (
    category: keyof typeof framematerial
  ) => {
    const newCheckedState = {
      ...framematerial,
      [category]: !framematerial[category],
    };
    setFrameMaterial(newCheckedState);
    console.log("FRAMEMATERIAL:", newCheckedState);
  };
  const handleCheckboxChangeBrands = (category: keyof typeof brands) => {
    const newCheckedState = { ...brands, [category]: !brands[category] };
    setBrands(newCheckedState);
    console.log("BRANDS:", newCheckedState);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const isMobileScreen = () => window.innerWidth <= 767;
    if (isMobileScreen()) {
      if (!isDrawerOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [!isDrawerOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleGridVisibility = (gridNumber: any) => {
    switch (gridNumber) {
      case 1:
        setIsGridVisible1(!isGridVisible1);

        break;
      case 2:
        setIsGridVisible2(!isGridVisible2);

        break;
      case 3:
        setIsGridVisible3(!isGridVisible3);

        break;
      case 4:
        setIsGridVisible4(!isGridVisible4);

        break;
      case 5:
        setIsGridVisible5(!isGridVisible5);

        break;
      default:
        break;
    }
  };

  const getDownIconRotation = (gridNumber: number) => {
    switch (gridNumber) {
      case 1:
        return isGridVisible1 ? "rotate-180 duration-300" : "";
      case 2:
        return isGridVisible2 ? "rotate-180 duration-300" : "";
      case 3:
        return isGridVisible3 ? "rotate-180 duration-300" : "";
      case 4:
        return isGridVisible4 ? "rotate-180 duration-300" : "";
      case 5:
        return isGridVisible5 ? "rotate-180 duration-300" : "";
      default:
        return "";
    }
  };

  const shapes = [
    { id: 1, image: Images.SHAPE1, title: "Aviator" },
    { id: 2, image: Images.SHAPE2, title: "Club Master" },
    { id: 3, image: Images.SHAPE3, title: "Hexagon" },
    { id: 4, image: Images.SHAPE4, title: "Round" },
    { id: 5, image: Images.SHAPE5, title: "Semi Round" },
    { id: 6, image: Images.SHAPE6, title: "Cat Eye" },
    { id: 7, image: Images.SHAPE7, title: "Rectangle" },
    { id: 8, image: Images.SHAPE8, title: "Square" },
    { id: 9, image: Images.SHAPE9, title: "Wayfarer" },
    { id: 10, image: Images.SHAPE10, title: "Geometric" },
    { id: 11, image: Images.SHAPE11, title: "Oval" },
    { id: 12, image: Images.SHAPE12, title: "Butterfly" },
  ];

  const productdata = [
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 4.5,
      colors: ["black", "gray", "#6b6b6b", "black"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 3,
      colors: ["black", "gray", "#6b6b6b", "black", "gray"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 2.5,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 3,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 4,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 5,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 3,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 2,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 1,
      colors: ["black", "gray", "#6b6b6b", "black"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 3,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 4,
      colors: ["black", "gray", "#6b6b6b"],
    },
    {
      image: Images.Listproduct,
      title: "100%",
      description: "6604-GOLDEN_BROWN-51-1",
      price: "499",
      rating: 3.5,
      colors: ["black", "gray", "#6b6b6b"],
    },
  ];
  const [selectedShapes, setSelectedShapes] = useState<number[]>([]);

  const handleShapeClick = (id: number) => {
    setSelectedShapes((prevSelectedShapes) => {
      if (prevSelectedShapes.includes(id)) {
        return prevSelectedShapes.filter((shapeId) => shapeId !== id);
      } else {
        return [...prevSelectedShapes, id];
      }
    });
  };

  useEffect(() => {
    console.log("Selected shapes:", selectedShapes);
  }, [selectedShapes]);

  return (
    <div className="list-bg max-w-screen-2xl m-auto">
      <div className="mt-[36px] xs:mx-[20px] xl:mx-[72px]- mx flex">
        <div
          className={`drawer xs:w-[333px] ${isDrawerOpen && "md:hidden"} ${
            isDrawerOpen && "hidden"
          }`}
        >
          <div className="space-y-4 p-6 border border-black xs:overflow-y-scroll lg:overflow-auto xs:rounded-r-[10px] md:rounded-[10px] xs:h-full md:h-auto w-[333px]">
            <div className="flex justify-end">
              <Image
                onClick={toggleDrawer}
                src={Images.Close}
                alt=""
                height={14}
                width={14}
                className="md:hidden"
              />
            </div>
            <div
              onClick={() => toggleGridVisibility(1)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.GENDER}
              </p>
              <Image
                src={Images.Downicon}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(1)}`}
              />
            </div>
            {isGridVisible1 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={gender.Men}
                    onChange={() => handleCheckboxGender("Men")}
                  />
                  <label
                    htmlFor="menCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Men}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={gender.Women}
                    onChange={() => handleCheckboxGender("Women")}
                  />
                  <label
                    htmlFor="womenCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Women}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={gender.Kids}
                    onChange={() => handleCheckboxGender("Kids")}
                  />
                  <label
                    htmlFor="kidsCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Kids}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={gender.Unisex}
                    onChange={() => handleCheckboxGender("Unisex")}
                  />
                  <label
                    htmlFor="unisexCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Unisex}
                  </label>
                </div>
              </div>
            )}
            <p className="border-[.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(2)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.FRAME_STYLE}
              </p>
              <Image
                src={Images.Downicon}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(2)}`}
              />
            </div>
            {isGridVisible2 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framestyle.Full_Rim}
                    onChange={() => handleCheckboxFrameStyle("Full_Rim")}
                  />
                  <label
                    htmlFor="fullRimCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Full_Rim}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framestyle.Half_Rim}
                    onChange={() => handleCheckboxFrameStyle("Half_Rim")}
                  />
                  <label
                    htmlFor="halfRimCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Half_Rim}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framestyle.Rimless}
                    onChange={() => handleCheckboxFrameStyle("Rimless")}
                  />
                  <label
                    htmlFor="rimlessCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Rimless}
                  </label>
                </div>
              </div>
            )}
            <p className="border-[.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(3)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.FRAME_SHAPE}
              </p>
              <Image
                src={Images.Downicon}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(3)}`}
              />
            </div>
            {isGridVisible3 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                {shapes.map((shape, index) => (
                  <Shape
                    key={index}
                    image={shape.image}
                    title={shape.title}
                    isSelected={selectedShapes.includes(shape.id)}
                    onClick={() => handleShapeClick(shape.id)}
                  />
                ))}
              </div>
            )}
            <p className="border-[.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(4)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.FRAME_MATERIAL}
              </p>
              <Image
                src={Images.Downicon}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(4)}`}
              />
            </div>
            {isGridVisible4 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framematerial.Acetate}
                    onChange={() => handleCheckboxFrameMaterial("Acetate")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Acetate}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framematerial.TR90}
                    onChange={() => handleCheckboxFrameMaterial("TR90")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.TR90}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framematerial.Metal}
                    onChange={() => handleCheckboxFrameMaterial("Metal")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Metal}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framematerial.Wood}
                    onChange={() => handleCheckboxFrameMaterial("Wood")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Wood}
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={framematerial.Titanium}
                    onChange={() => handleCheckboxFrameMaterial("Titanium")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    {Strings.Titanium}
                  </label>
                </div>
              </div>
            )}
            <p className="border-[.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(5)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.BRANDS}
              </p>
              <Image
                src={Images.Downicon}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(5)}`}
              />
            </div>
            {isGridVisible5 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.A}
                    onChange={() => handleCheckboxChangeBrands("A")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    A
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.B}
                    onChange={() => handleCheckboxChangeBrands("B")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    B
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.C}
                    onChange={() => handleCheckboxChangeBrands("C")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    C
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.D}
                    onChange={() => handleCheckboxChangeBrands("D")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    D
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.E}
                    onChange={() => handleCheckboxChangeBrands("E")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    E
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="myCheck"
                    className="cursor-pointer"
                    checked={brands.F}
                    onChange={() => handleCheckboxChangeBrands("F")}
                  />
                  <label
                    htmlFor="myCheck"
                    className="text-black font-normal text-sm ml-2"
                  >
                    F
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="md:ml-3 xl:ml-7">
          <div className="flex items-center xs:justify-center md:justify-between xs:flex-col lg:flex-row xs:space-y-2 lg:space-y-0 text-black font-normal text-sm">
            <p className="xs:order-1">Eyewear / Reading Glasses</p>
            <p className="xs:order-3 lg:order-2">Showing 32 of 420 results</p>
            <div className="flex items-center xs:order-2 lg:order-3">
              <p className="text-black font-normal text-sm">
                {Strings.SORT_BY}
              </p>
              <div className="relative">
                <button
                  className={`${
                    isOpen
                      ? "rounded-t-[5px] border-t border-x border-black"
                      : "rounded-[5px] border border-black  "
                  } ml-[15px] text-xs   w-[146px] h-[34px] flex pl-7 items-center`}
                  onClick={toggleDropdown}
                >
                  {Strings.BEST_SELLERS}
                  <img
                    src={Images.Downicon}
                    alt=""
                    height={9}
                    width={9}
                    className={`ml-7 transform ${
                      isOpen ? "rotate-180 duration-300 " : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="overflow-hidden absolute z-10 bg-gray-50 rounded-b-[5px] border border-black shadow-lg w-[146px] right-0">
                    <ul
                      className=" text-sm text-black font-normal"
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <li>
                        <a
                          href="#"
                          className="block px-2 py-1 hover:bg-gray-200 "
                        >
                          {Strings.PRICE_HIGH_TO_LOW}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-2 py-1 hover:bg-gray-200 "
                        >
                          {Strings.PRICE_LOW_TO_HIGH}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-2 py-1 hover:bg-gray-200 "
                        >
                          {Strings.RATING_HIGH_TO_LOW}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-2 py-1 hover:bg-gray-200 "
                        >
                          {Strings.BestSeller}
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block px-2 py-1 hover:bg-gray-200 "
                        >
                          {Strings.NEW}
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-7 md:mx-5 xl:mx-0 flex flex-wrap xs:justify-center lg:justify-between md:gap-4 lg:gap-0">
            {productdata.map((product, index) => (
              <Product
                key={index}
                image={product.image}
                title={product.title}
                description={product.description}
                price={`₹${product.price}`}
                rating={product.rating}
                colors={product.colors}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={toggleDrawer}
        className="absolute md:hidden bg-white h-7 w-7 top-2 left-2 flex justify-center items-center rounded-full"
      >
        <Image src={Images.Righticon} alt="" height={18} width={18} />
      </button>
      <div className="flex justify-end xs:mx-[20px] xl:mx-[72px]- mx">
        <div className="space-y-2 mt-[44px]">
          <button
            onClick={handleScrollToTop}
            className="bg-PictonBlue h-12 w-12 rounded-full flex justify-center items-center"
          >
            <Image src={Images.Upicon} alt="/" height={16} width={16} />
          </button>
          <Image src={Images.Whatsapp} alt="/" height={55} width={55} />
        </div>
      </div>
    </div>
  );
};

export default Listingpage;
