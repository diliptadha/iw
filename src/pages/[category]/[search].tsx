"use client";

import "../../app/Listingpage.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { Footer } from "@/Component/footer";
import Header from "@/Component/header";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/Component/Loader";
import Pagination from "react-paginate";
import Product from "@/Component/Product";
import ReactPaginate from "react-paginate";
import Shape from "@/Component/Shape";
import Swal from "sweetalert2";
import WhatsAppButton from "@/Component/WhatsAppButton";
import axios from "axios";
import { space } from "postcss/lib/list";

// const genders = ["Men", "Women", "Kids", "Unisex"];
// const frameStyles = ["Full Rim", "Rimless", "Half Rim"];
// const frameMaterials = ["Acetate", "TR90", "Metal", "Wood", "Titanium"];
// const brands = ["A", "B", "C", "D", "E", "F"];

interface RequestData {
  [key: string]: string[] | string | undefined;
}

interface Sortby {
  productId: string;
  productImage: string;
  title: string;
  color: string;
  description?: string;
  salePrice: number;
  rating: number;
}

interface ProductData {
  isFavorite: boolean;
  productId: string;

  data: {
    // createdAt: number;
    variantImage: string[] | undefined;
    otherColors: any;
    subProductId: string;
    color: string;
    productImage: string;
    title: string;
    description?: string;
    price: number;
    rating: number;
    isBestSeller?: boolean;
    createdAt: string;
    isNew?: boolean;
  };
}
interface filterData {
  isFavorite: boolean;
  productId: string;

  data: {
    // createdAt: number;
    variantImage: string[] | undefined;
    otherColors: any;
    subProductId: string;
    color: string;
    productImage: string;
    title: string;
    description?: string;
    price: number;
    rating: number;
    isBestSeller?: boolean;
    createdAt: string;
    isNew?: boolean;
  };
}

interface Filters {
  selectedGender: string[];
  selectedFrameMaterial: string[];
  // selectedFrameStyle: string[];
  // selectedBrands: string[];
  // selectedShape: string[];
  sortBy: string;
}

const Listingpage: React.FC<{ filters: Filters }> = ({ filters }) => {
  const [isGridVisible1, setIsGridVisible1] = useState(true);
  const [isGridVisible2, setIsGridVisible2] = useState(true);
  const [isGridVisible3, setIsGridVisible3] = useState(true);
  const [isGridVisible4, setIsGridVisible4] = useState(true);
  const [isGridVisible5, setIsGridVisible5] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedFrameStyle, setSelectedFrameStyle] = useState<string[]>([]);
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState<string[]>(
    []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedShape, setSelectedShape] = useState<string[]>([]);
  const [fillterurl, setFillterurl] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState("");
  const [otpValid, setOtpValid] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [lastInteractedProductId, setLastInteractedProductId] = useState<
    string | null
  >(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [favoriteStatus, setFavoriteStatus] = useState<{
    [key: string]: boolean;
  }>(() => {
    if (typeof window !== "undefined") {
      const storedFavorites = localStorage.getItem("favoriteStatus");
      return storedFavorites ? JSON.parse(storedFavorites) : {};
    }
    return {};
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoriteStatus", JSON.stringify(favoriteStatus));
    }
  }, [favoriteStatus]);
  const storedUserId =
    typeof window !== "undefined" ? localStorage.getItem("userId") : null;
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(storedUserId);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!userId);
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [urlSelectedSearch, setUrlSelectedSearch] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timer === 0) {
      if (intervalId) clearInterval(intervalId);
      setIsResendEnabled(true);
    }
  }, [timer, intervalId]);

  const router = useParams();

  const handleCheckboxGender = (gender: string) => {
    const updatedGender = selectedGender.includes(gender)
      ? selectedGender.filter((g) => g !== gender)
      : [...selectedGender, gender];
    setSelectedGender(updatedGender);
    updateUrl(updatedGender, "gender");
  };

  const handleCheckboxFrameStyle = (frameStyle: string) => {
    const updatedFrameStyles = selectedFrameStyle.includes(frameStyle)
      ? selectedFrameStyle.filter((style) => style !== frameStyle)
      : [...selectedFrameStyle, frameStyle];
    setSelectedFrameStyle(updatedFrameStyles);
    updateUrl(updatedFrameStyles, "frame-style");
  };

  const handleCheckboxFrameMaterial = (frameMaterial: string) => {
    const updatedFrameMaterials = selectedFrameMaterial.includes(frameMaterial)
      ? selectedFrameMaterial.filter((material) => material !== frameMaterial)
      : [...selectedFrameMaterial, frameMaterial];
    setSelectedFrameMaterial(updatedFrameMaterials);
    updateUrl(updatedFrameMaterials, "frame-material");
  };

  const handleCheckboxChangeBrands = (brand: string) => {
    const updatedBrands = selectedBrands.includes(brand)
      ? selectedBrands.filter((b) => b !== brand)
      : [...selectedBrands, brand];
    setSelectedBrands(updatedBrands);
    updateUrl(updatedBrands, "brands");
  };

  const handleShapeClick = (shape: string) => {
    const updatedShapes = selectedShape.includes(shape)
      ? selectedShape.filter((s) => s !== shape)
      : [...selectedShape, shape];
    setSelectedShape(updatedShapes);
    updateUrl(updatedShapes, "shape");
  };

  const category = router?.category || "";
  const Search = router?.search || "";

  const BASEURL = process.env.NEXT_PUBLIC_BASE_URL;

  const updateUrl = (params: string[], paramName: string) => {
    let baseUrl = `${BASEURL}${category}/${Search}/#`;

    const currentUrl = window.location.href;
    const existingParamsIndex = currentUrl.indexOf("#");
    const existingParams =
      existingParamsIndex !== -1
        ? currentUrl.slice(existingParamsIndex + 1)
        : "";

    const existingParamsArray = existingParams ? existingParams.split("&") : [];

    const updatedParamsArray = existingParamsArray.filter(
      (param) => !param.startsWith(`${paramName}=`)
    );

    if (params.length > 0) {
      updatedParamsArray.push(`${paramName}=${params.join("=")}`);
    }

    const updatedParams = updatedParamsArray.join("&");
    const url = baseUrl + updatedParams.toLowerCase().replace(/\s+/g, "-");

    window.history.replaceState({}, "", url);

    if (params.length > 0) {
      localStorage.setItem(paramName, JSON.stringify(params));
    } else {
      localStorage.removeItem(paramName);
    }
  };

  useEffect(() => {
    const gender = JSON.parse(localStorage.getItem("gender") || "[]");
    const frameStyle = JSON.parse(localStorage.getItem("frame-style") || "[]");
    const frameMaterial = JSON.parse(
      localStorage.getItem("frame-material") || "[]"
    );
    const brands = JSON.parse(localStorage.getItem("brands") || "[]");
    const shape = JSON.parse(localStorage.getItem("shape") || "[]");

    if (gender || frameStyle || frameMaterial || brands || shape) {
      setSelectedGender(gender);
      setSelectedFrameStyle(frameStyle);
      setSelectedFrameStyle(frameStyle);
      setSelectedFrameMaterial(frameMaterial);
      setSelectedBrands(brands);
      setSelectedShape(shape);
    }
  }, []);

  useEffect(() => {
    console.log("Selected shape:", selectedShape);
  }, [selectedShape]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (window.innerWidth <= 576) {
        if (drawerRef.current && !drawerRef.current.contains(event.target)) {
          setIsDrawerOpen(true);
        }
      }
    };

    if (!isDrawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
    { id: 1, image: Images.SHAPE1, title: "Avaiator" },
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

  const [productList, setProductList] = useState<ProductData[]>([]);

  const fetchData = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/getProductList?page=1&limit=2`,
        headers: {},
      };
      const response = await axios.request(config);
      console.log("Product List Data :", JSON.stringify(response.data));
      setProductList(response.data.productList.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [prevFilters, setPrevFilters] = useState<any>(null);
  const [filterData, setFilterData] = useState<filterData[]>([]);
  const [filterApplied, setFilterApplied] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedSortText, setSelectedSortText] = useState("ALL");

  const handleSortChange = (sortBy: string, buttonText: string) => {
    if (sortBy === "ALL") {
      setSortBy("");
      updateUrl([], "sort");
      localStorage.removeItem("sort");
    } else {
      setSortBy(sortBy);
      updateUrl(sortBy ? [sortBy] : [], "sort");
      localStorage.setItem("sort", JSON.stringify(sortBy));
    }
    setIsOpen(false);
    setSelectedSortText(buttonText);
    console.log(sortBy);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchFilterData = async (gender: any) => {
    try {
      const urlSelectedGender = encodeURIComponent(
        JSON.stringify(selectedGender)
      );
      const urlSelectedStyle = encodeURIComponent(
        JSON.stringify(selectedFrameStyle)
      );
      const urlSelectedShape = encodeURIComponent(
        JSON.stringify(selectedShape)
      );
      const urlSelectedMaterial = encodeURIComponent(
        JSON.stringify(selectedFrameMaterial)
      );

      // urlSelectedCategory.charAt(0).toUpperCase() +
      // urlSelectedCategory.slice(1).toLowerCase()

      // const toCamelCase = (str: string) => {
      //   return str
      //     .replace(/([-_][a-z])/gi, (match) => {
      //       return match.toUpperCase().replace("-", " ").replace("_", " ");
      //     })
      //     .replace(/^[a-z]/, (match) => {
      //       return match.toUpperCase();
      //     });
      // };

      const categoryArray = Array.isArray(category) ? category : [category];
      // const camelCaseCategoryArray = categoryArray.map(toCamelCase);

      const urlSelectedCategory = encodeURIComponent(
        JSON.stringify(categoryArray)
      );
      console.log("Category", urlSelectedCategory);

      const urlSelectedSearchRaw = gender.map((g: string) => {
        const cleanedGender = g.replace(/glasses-for-/, "").toLowerCase();
        return cleanedGender.charAt(0).toUpperCase() + cleanedGender.slice(1);
      });

      const urlSelectedSearch = encodeURIComponent(
        JSON.stringify(urlSelectedSearchRaw)
      );
      setUrlSelectedSearch(urlSelectedSearchRaw.join(", "));
      console.log("ssssss", urlSelectedSearch);
      let url = `${
        process.env.NEXT_PUBLIC_API_URL
      }product/getFilterProductData?page=1&limit=9&sortBy=${sortBy}&category=${urlSelectedCategory.replace(
        /-/g,
        " "
      )}&gender=${urlSelectedSearch.replace(/-lens|lenses|frames|-/g, "")}`;

      if (selectedFrameMaterial.length > 0) {
        const materialFilter = `&frameMaterial=${urlSelectedMaterial.replace(
          /frames|-/g,
          ""
        )}`;
        url += materialFilter;
      }
      if (selectedShape.length > 0) {
        const shapeFilter = `&frameShape=${urlSelectedShape.replace(
          /frames|-/g,
          ""
        )}`;
        url += shapeFilter;
      }
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url,
        headers: {
          "Content-Type": "text/plain",
        },
      };
      console.log(config.url, "url");
      const response = await axios.request(config);

      setFilterData(response.data.productList.data);
      setFilterApplied(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const areFiltersSelected =
      selectedGender?.length > 0 ||
      selectedShape?.length > 0 ||
      selectedFrameMaterial?.length > 0 ||
      sortBy !== "";

    if (router?.search) {
      if (selectedGender.length > 0) {
        fetchFilterData(selectedGender);
      }
      const genderArray =
        typeof router?.search === "string"
          ? [
              router?.search
                .replace(/glasses-for-/, "")
                .charAt(0)
                .toUpperCase() +
                router?.search
                  .replace(/glasses-for-/, "")
                  .slice(1)
                  .toLowerCase(),
            ]
          : router?.search.map(
              (g) =>
                g
                  .replace(/glasses-for-/, "")
                  .charAt(0)
                  .toUpperCase() +
                g
                  .replace(/glasses-for-/, "")
                  .slice(1)
                  .toLowerCase()
            );

      fetchFilterData(genderArray);
    }
    if (selectedGender.length > 0) {
      fetchFilterData(selectedGender);
    }
    if (areFiltersSelected) {
      setFilterApplied(true);
    } else {
      setFilterData([]);
      setFilterApplied(false);
    }
  }, [
    selectedGender,
    selectedFrameStyle,
    selectedFrameMaterial,
    selectedBrands,
    selectedShape,
    sortBy,
    router,
  ]);

  const [currentPageFilter, setCurrentPageFilter] = useState(0);
  const [currentPageTrending, setCurrentPageTrending] = useState(0);
  const perPage = 3;
  const filterDataLength = filterData ? filterData.length : 0;
  const productListLength = productList ? productList.length : 0;
  const pageCountFilter = Math.ceil(
    (filterDataLength || productListLength) / perPage
  );

  const getFilteredDataForCurrentPage = () => {
    const startIndex = currentPageFilter * perPage;
    const endIndex = startIndex + perPage;
    return (filterApplied ? filterData : productList).slice(
      startIndex,
      endIndex
    );
  };

  const handlePageChangeFilter = (selected: {
    selected: React.SetStateAction<number>;
  }) => {
    setCurrentPageFilter(selected.selected);
  };

  useEffect(() => {
    if (userId !== null) {
      localStorage.setItem("userId", userId);
    } else {
      localStorage.removeItem("userId");
    }
  }, [userId]);

  const handleEmailChange = (e: { target: { value: any } }) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(emailValue);
    setIsValidEmail(isValidEmail);
  };

  const handleOtpChange = (e: { target: { value: any } }) => {
    const otpValue = e.target.value;

    if (!isNaN(otpValue)) {
      setOtp(otpValue);
    }
  };

  const handleSendOtp = async () => {
    setIsLoading(true);
    setIsResendEnabled(false);
    setTimer(60);
    const newIntervalId = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setIntervalId(newIntervalId);
    try {
      let data = JSON.stringify({
        emailId: email,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/sendOTP?emailId=${email}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setIsShow(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    try {
      let data = JSON.stringify({
        Otp: otp,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/verifyOTP`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setOtpValid(true);
      setOtpErr("");
    } catch (error) {
      console.log(error);
      setOtpErr("OTP does not match. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && lastInteractedProductId) {
      addToFavorite(lastInteractedProductId, userId);
    }
  }, [userId, lastInteractedProductId]);

  const loginUser = async () => {
    setIsLoading(true);
    try {
      let data = JSON.stringify({
        emailId: email,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}user/login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      const userData = response.data.signInData.userData;
      const accessToken = response.data.signInData.access_token;

      localStorage.setItem("userId", userData.userId);
      localStorage.setItem("accessToken", accessToken);
      setShowLoginModal(false);
      setIsAuthenticated(true);
      setUserId(response.data.signInData.userData.userId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleFavorite = (productId: string) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      setLastInteractedProductId(productId);
      return;
    }
    if (userId) {
      if (favoriteStatus[productId]) {
        // If product is already favorited, remove it
        removeFavoriteProduct(productId, userId);
      } else {
        // If product is not favorited, add it
        addToFavorite(productId, userId);
      }
    } else {
      console.log("User ID is null. Cannot add to favorites.");
    }
  };

  const addToFavorite = async (productId: string, userId: string) => {
    try {
      let data = JSON.stringify({
        userId: userId,
        productId: productId,
      });
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/addToFavorite?userId=${userId}&productId=${productId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log(
        "addToFavorite DATA:",
        data,
        JSON.stringify(response.data.productData)
      );

      setFavoriteStatus((prevState) => ({
        ...prevState,
        [productId]: !prevState[productId],
      }));
      showAlert("success", "Your product has been added to favorites!");
    } catch (error) {
      console.log(error);
    }
  };

  const removeFavoriteProduct = async (productId: string, userId: string) => {
    try {
      let data = JSON.stringify({
        userId: userId,
        productId: productId,
      });

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}product/removeFavoriteProduct?userId=${userId}&productId=${productId}`,
        headers: {},
        data: data,
      };

      const response = await axios.request(config);
      console.log(JSON.stringify(response.data.productData));
      setFavoriteStatus((prevState) => {
        const newState = { ...prevState };
        delete newState[productId];
        return newState;
      });
      showAlert("info", "Your product has been removed to favorites!");
    } catch (error) {
      console.log(error);
    }
  };

  const showAlert = async (icon: "success" | "info", message: string) => {
    const toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    toast.fire({
      icon: icon,
      title: message,
      padding: "10px 20px",
    });
  };

  useEffect(() => {
    if (showLoginModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showLoginModal]);

  const [search, setSearch] = useState("");

  // const [searchQuery, setSearchQuery] = useState<{
  //   category: string;
  //   gender: string;
  // } | null>(null);

  // useEffect(() => {
  //   if (typeof localStorage !== "undefined") {
  //     const storedSearchQuery = localStorage.getItem("searchQuery");
  //     if (storedSearchQuery) {
  //       setSearchQuery(JSON.parse(storedSearchQuery));
  //     }
  //   }
  // }, []);

  const [genders, setGenders] = useState<string[]>([]);
  const [frameStyles, setFrameStyles] = useState<string[]>([]);
  const [frameMaterials, setFrameMaterials] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  const fetchfilterList = async () => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_API_URL}home/filterList`,
        headers: {},
      };

      const response = await axios.request(config);
      console.log("ssss", JSON.stringify(response.data));
      const data = response.data.filterList;
      setGenders(data.gender);
      setFrameStyles(data.frameStyles);
      setFrameMaterials(data.frameMaterials);
      setBrands(data.brands);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchfilterList();
  }, []);

  const formatCategory = (category: any) => {
    return category
      .split("-")
      .map(
        (word: string) =>
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      )
      .join(" ");
  };

  return (
    <div className="list-bg max-w-screen-2xl m-auto">
      <Header setSearch={setSearch} />
      <div className="mt-[36px] xs:mx-[20px] xl:mx-[72px]- mx flex">
        <div
          ref={drawerRef}
          className={`drawer xs:z-index1 lg:z-index2 xs:w-[333px] ${
            isDrawerOpen && "md:hidden"
          } ${isDrawerOpen && "hidden"} ${
            formatCategory(category) === "Swimming Goggles" ||
            formatCategory(category) === "Contact Lenses"
              ? "hidden"
              : "block"
          }`}
        >
          <div className="space-y-4 p-6 border border-black xs:overflow-y-scroll lg:overflow-auto xs:rounded-r-[10px] md:rounded-[10px] xs:h-full md:h-auto w-[333px]">
            <div className="flex justify-end">
              <Image
                onClick={toggleDrawer}
                src={Images.Closeblack}
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
                src={Images.DOWN_ARROW}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(1)}`}
              />
            </div>
            {isGridVisible1 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                {genders.map((gender) => (
                  <div key={gender} className="flex items-center">
                    <input
                      type="checkbox"
                      id={gender}
                      checked={selectedGender?.includes(gender)}
                      onChange={() => handleCheckboxGender(gender)}
                    />
                    <label htmlFor={gender} className="ml-2">
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <p className="border-[0.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(2)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.Frame_Style}
              </p>
              <Image
                src={Images.DOWN_ARROW}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(2)}`}
              />
            </div>
            {isGridVisible2 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                {frameStyles.map((frameStyles, index) => (
                  <div key={frameStyles} className="flex items-center">
                    <input
                      type="checkbox"
                      id={frameStyles}
                      className="cursor-pointer"
                      checked={selectedFrameStyle?.includes(frameStyles)}
                      onChange={() => handleCheckboxFrameStyle(frameStyles)}
                    />
                    <label
                      htmlFor={frameStyles}
                      className="text-black font-normal text-sm ml-2"
                    >
                      {frameStyles.replace(/_/g, " ")}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <p className="border-[0.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(3)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.Frame_Shape}
              </p>
              <Image
                src={Images.DOWN_ARROW}
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
                    isSelected={
                      selectedShape && selectedShape?.includes(shape.title)
                    }
                    onClick={() => handleShapeClick(shape.title)}
                  />
                ))}
              </div>
            )}
            <p className="border-[0.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(4)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.Frame_Material}
              </p>
              <Image
                src={Images.DOWN_ARROW}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(4)}`}
              />
            </div>
            {isGridVisible4 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                {frameMaterials.map((frameMaterials, index) => (
                  <div key={frameMaterials} className="flex items-center">
                    <input
                      type="checkbox"
                      id={frameMaterials}
                      className="cursor-pointer"
                      checked={selectedFrameMaterial?.includes(frameMaterials)}
                      onChange={() =>
                        handleCheckboxFrameMaterial(frameMaterials)
                      }
                    />
                    <label
                      htmlFor={frameMaterials}
                      className="text-black font-normal text-sm ml-2"
                    >
                      {frameMaterials}
                    </label>
                  </div>
                ))}
              </div>
            )}
            <p className="border-[0.5px] border-black"></p>
            <div
              onClick={() => toggleGridVisibility(5)}
              className="flex justify-between items-center"
            >
              <p className="text-black font-extrabold text-sm">
                {Strings.BRANDS}
              </p>
              <Image
                src={Images.DOWN_ARROW}
                alt=""
                height={9}
                width={9}
                className={`transform ${getDownIconRotation(5)}`}
              />
            </div>
            {isGridVisible5 && (
              <div className="grid grid-cols-2 gap-4 my-4 ">
                {brands.map((brands, index) => (
                  <div key={brands} className="flex items-center">
                    <input
                      type="checkbox"
                      id={brands}
                      className="cursor-pointer"
                      checked={selectedBrands?.includes(brands)}
                      onChange={() => handleCheckboxChangeBrands(brands)}
                    />
                    <label
                      htmlFor={brands}
                      className="text-black font-normal text-sm ml-2"
                    >
                      {brands}
                    </label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="md:ml-3 xl:ml-7 w-full">
          <div className="flex items-center xs:justify-center md:justify-between xs:flex-col lg:flex-row xs:space-y-2 lg:space-y-0 text-black font-normal text-sm">
            <p className="xs:order-1">{`Home / ${formatCategory(category)} / ${
              urlSelectedSearch.charAt(0).toUpperCase() +
                urlSelectedSearch
                  .slice(1)
                  .toLowerCase()
                  .replace(/-/g, " ")
                  .replace(/contact lenses/g, "Lenses") || ""
            }`}</p>
            <p className="xs:order-3 lg:order-2">
              Showing {(filterApplied ? filterData : productList)?.length} of{" "}
              {(filterApplied ? filterData : productList)?.length} results
            </p>
            <div className="flex items-center xs:order-2 lg:order-3">
              <p className="text-black font-normal text-sm">
                {Strings.SORT_BY}
              </p>
              <div className="relative" ref={dropdownRef}>
                <button
                  className={`${
                    isOpen
                      ? "rounded-t-[5px] border-t border-x border-black"
                      : "rounded-[5px] border border-black  "
                  } ml-[15px] text-xs relative w-[146px] h-[34px] flex pl-4 justify-start items-center`}
                  onClick={toggleDropdown}
                >
                  {selectedSortText}
                  <img
                    src={Images.Downiconblack}
                    alt=""
                    height={9}
                    width={9}
                    className={`absolute right-4 transform ${
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
                      <li
                        onClick={() => handleSortChange("ALL", "ALL")}
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        ALL
                      </li>
                      <li
                        onClick={() =>
                          handleSortChange(
                            "priceHighToLow",
                            Strings.PRICE_HIGH_TO_LOW
                          )
                        }
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        {Strings.PRICE_HIGH_TO_LOW}
                      </li>
                      <li
                        onClick={() =>
                          handleSortChange(
                            "priceLowToHigh",
                            Strings.PRICE_LOW_TO_HIGH
                          )
                        }
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        {Strings.PRICE_LOW_TO_HIGH}
                      </li>
                      <li
                        onClick={() =>
                          handleSortChange(
                            "ratingHighToLow",
                            Strings.RATING_HIGH_TO_LOW
                          )
                        }
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        {Strings.RATING_HIGH_TO_LOW}
                      </li>
                      <li
                        onClick={() =>
                          handleSortChange("bestSeller", Strings.BestSeller)
                        }
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        {Strings.BestSeller}
                      </li>
                      <li
                        onClick={() =>
                          handleSortChange("NewArrival ", Strings.NEW)
                        }
                        className="block px-2 py-1 hover:bg-gray-200 cursor-pointer"
                      >
                        {Strings.NEW}
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={`mt-7 md:mx-5 xl:mx-0 flex flex-wrap xs:justify-center lg:justify-start lg:gap-x-3 xl:gap-x-9`}
          >
            {(filterApplied ? filterData : productList)?.length > 0 ? (
              getFilteredDataForCurrentPage().map((product, index) => (
                <Product
                  key={product.productId}
                  image={product.data.productImage}
                  title={product.data.title}
                  description={product.data.description ?? ""}
                  price={`₹${product.data.price}`}
                  rating={product.data.rating}
                  color={product.data.color}
                  colors={product.data.color
                    .replace(/[\[\]"\\]/g, "")
                    .split(",")
                    .map((otherColors) => otherColors.trim())}
                  otherColors={
                    product.data.otherColors
                      ? product.data.otherColors.map((color: string) =>
                          color.trim()
                        )
                      : []
                  }
                  productId={product.productId}
                  subProductId={product.data.subProductId}
                  variantImages={product.data.variantImage}
                  showLoginModal={showLoginModal}
                  isAuthenticated={isAuthenticated}
                  handleToggleFavorite={() =>
                    handleToggleFavorite(product.productId)
                  }
                  isFavorite={favoriteStatus[product.productId] || false}
                />
              ))
            ) : (
              <p className="w-full flex justify-center font-semibold xs:text-sm md:text-base">
                {Strings.NO_PRODUCTS_AVAILABLE}
              </p>
            )}

            {showLoginModal && !isAuthenticated && (
              <div className="fixed left-0 top-0 z-index4 flex h-full w-full items-start  justify-center  bg-gray-500 bg-opacity-[20%] backdrop-blur-sm ">
                <div className=" mt-10 items-center- justify-center- flex- rounded-md bg-white p-5 xs:h-[270px]- xs:w-[310px] md:h-[270px]- md:w-[460px] ">
                  <div>
                    <div className="flex justify-between">
                      <h1 className="text-base font-medium text-black">
                        {Strings.SIGN_IN}
                      </h1>
                      <button
                        className="outline-none"
                        onClick={() => setShowLoginModal(false)}
                      >
                        <Image
                          src={Images.Closeblack}
                          alt=""
                          height={20}
                          width={20}
                        />
                      </button>
                    </div>
                    <p className="border my-4"></p>
                    <h1 className="text-base font-normal text-black">
                      {Strings.Email}
                    </h1>
                    <input
                      id="emailInput"
                      className="outline-none w-full"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      disabled={isShow}
                    />
                    {!isValidEmail && (
                      <p className="text-red-500 text-xs">
                        Please enter a valid email address.
                      </p>
                    )}
                    <p className="border border-black my-2"></p>
                    {isShow && (
                      <div className="mt-4">
                        <h1 className="text-base font-normal text-black">
                          {Strings.OTP}
                        </h1>
                        <input
                          className="outline-none w-full"
                          value={otp}
                          onChange={handleOtpChange}
                        />
                        {otpErr && (
                          <p className="text-red-500 text-xs">{otpErr}</p>
                        )}
                        <p className="border border-black mt-2"></p>
                      </div>
                    )}
                    <div>
                      {isShow ? (
                        otpValid ? (
                          <button
                            onClick={loginUser}
                            disabled={!isValidEmail || email.trim() === ""}
                            className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                          >
                            {isLoading ? <Loader /> : Strings.Login}
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={verifyOTP}
                              disabled={!isValidEmail || email.trim() === ""}
                              className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                            >
                              {isLoading ? <Loader /> : Strings.Verify_OTP}
                            </button>
                            {timer > 0 ? (
                              <p className="flex justify-center mt-2">
                                {Strings.Resend_Otp} {timer} {Strings.seconds}
                              </p>
                            ) : (
                              <button
                                onClick={handleSendOtp}
                                disabled={!isValidEmail || email.trim() === ""}
                                className="mt-4 flex items-center justify-center w-full  hover:text-PictonBlue text-black text-base font-semibold underline"
                              >
                                {isLoading ? <Loader /> : Strings.Resend_OTP}
                              </button>
                            )}
                          </>
                        )
                      ) : (
                        <button
                          onClick={handleSendOtp}
                          disabled={!isValidEmail || email.trim() === ""}
                          className="mt-5 flex items-center justify-center w-full rounded-md bg-black hover:bg-PictonBlue h-8 text-white text-base font-normal"
                        >
                          {isLoading ? <Loader /> : Strings.Send_OTP}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {(filterApplied ? filterData : productList)?.length > 0 ? (
            <div>
              <ReactPaginate
                previousLabel={
                  <svg
                    className="w-2.5 h-2.5 hover:text-PictonBlue"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 1 1 5l4 4"
                    />
                  </svg>
                }
                nextLabel={
                  <svg
                    className="w-2.5 h-2.5 hover:text-PictonBlue "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                }
                breakLabel={"..."}
                pageCount={pageCountFilter}
                onPageChange={handlePageChangeFilter}
                containerClassName={
                  " bg-gray-200 rounded-md h-10 pagination flex items-center text-sm justify-center"
                }
                pageClassName={
                  " h-7 w-7 rounded-full flex items-center justify-center font-bold hover:font-extrabold"
                }
                activeClassName={"bg-PictonBlue text-white rounded-full"}
                previousClassName={" px-[15px] text-lg"}
                nextClassName={" px-[15px]"}
                previousLinkClassName={
                  currentPageFilter === 0
                    ? "pointer-events-none opacity-50 bg-PictonBlue text-black hover:text-PictonBlue"
                    : "bg-PictonBlue text-black hover:text-white"
                }
                nextLinkClassName={
                  currentPageFilter === pageCountFilter - 1
                    ? "pointer-events-none opacity-50 bg-PictonBlue text-black hover:text-PictonBlue"
                    : "bg-PictonBlue text-black hover:text-white"
                }
                breakClassName={"border p-2 hover:bg-PictonBlue"}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <button
        onClick={toggleDrawer}
        className={`absolute border border-black md:hidden bg-white h-7 w-7 top-[80px] left-4 flex justify-center items-center rounded-full ${
          !isDrawerOpen ? "hidden" : ""
        }`}
      >
        <Image src={Images.filter} alt="" height={18} width={18} />
      </button>
      <div className="mb-9 flex justify-end xs:mx-[20px] xl:mx-[72px]- mx">
        <div className="space-y-2 mt-[44px]">
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

export default Listingpage;
