import { Images, Strings } from "@/constant";
import "../app/globals.css";
import React, { useState, useRef, useEffect } from 'react';
import Image from "next/image";
import SimilarProductPage from "./similar_products";
import Review from "@/Component/reviews";
import GiveRatings from "@/Component/GiveRatings";
import ShareOptions from "@/Component/share";

const ProductDetails = () => {
    const [open, setOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [pincode, setPincode] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [isPincodeValid, setIsPincodeValid] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [deliveryDate, setDeliveryDate] = useState("");
    const [isOpenReview, setIsOpenReview] = useState(false);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const containerRef2 = useRef<HTMLDivElement>(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const textareaRef = useRef(null);
    const [message, setMessage] = useState("");
    const [showWarning, setShowWarning] = useState(false);
    const [rating, setRating] = useState(0);
    const [showRatingWarning, setShowRatingWarning] = useState(false);
    const [showThankYouMessage, setShowThankYouMessage] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const sampleText = "Lorem ipsum dolor siabitasse platea dictumst. Duis rutrum metus et lectus condimentum, nec tincidunt metus tincidunt. Nam sed purus sed felis venenatis malesuada vel sed dui. Nulla facilisi. Integer sit amet est sit amet nisi sollicitudin faucibus. Integer scelerisque nisl risus, eget facilisis neque luctus nec. Aliquam malesuada, nulla nec ultricies posuere, purus ipsum convallis est, sed dignissim quam magna id libero. Duis tincidunt, ligula at laoreet tempor, elit lacus blandit enim, non fermentum orci elit ut odio. Quisque tincidunt tellus sit amet felis ultricies ultricies. Integer nec feugiat lectus. Donec at libero non urna semper volutpat. Sed aliquet, sapien id aliquam egestas, urna odio tempor risus, sed semper sem est eget libero.";
    const reviewContainerRef = useRef(null);
    const [buttonsMarginTop, setButtonsMarginTop] = useState(0);
    const [nextDivMarginTop, setNextDivMarginTop] = useState(0);
    const [showOptions, setShowOptions] = useState(false);
    const shareButtonRef = useRef<HTMLButtonElement>(null);

    const handleToggleFavorite = () => {
        setIsFavorite((prevState) => !prevState);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleDropdownReview = () => {
        setIsOpenReview(!isOpenReview);
    };

    const openWriteReviewModal = () => {
        setIsOpenWriteReview(true);
    };

    const closeWriteReviewModal = () => {
        setIsOpenWriteReview(false);
        setShowThankYouMessage(false);
    };

    useEffect(() => {
        if (reviewContainerRef.current) {
            const containerHeight = (reviewContainerRef.current as HTMLDivElement).clientHeight;
            setButtonsMarginTop(containerHeight);
            setNextDivMarginTop(containerHeight + 50);
        }
    }, [isOpenReview]);

    const handlePincodeChange = (e: any) => {
        let { value } = e.target;
        const sanitizedValue = value.replace(/\D/g, '').slice(0, 6); 
        setPincode(sanitizedValue);
        setPincodeError('');
        setIsSubmitted(false);

        value = sanitizedValue;

        if (value.length === 6) {
            setIsPincodeValid(true);
        } else {
            setIsPincodeValid(false);
        }
    };

    const handleSubmit = async () => {
        if (pincode.length !== 6 || isNaN(parseInt(pincode, 10))) {
            setPincodeError('Please enter a valid 6-digit Pincode.');
            setIsSubmitted(true);
            return;
        }

        setIsSubmitted(true);

        const pincodeNumber = parseInt(pincode, 10);
        console.log("Parsed pincode:", pincodeNumber);

        const mockResponse = {
            available: pincodeNumber > 380001 && pincodeNumber < 380010, 
            deliveryDate: '20-mar-2024' 
        };

        if (mockResponse.available) {
            setDeliveryDate(mockResponse.deliveryDate);
        } else {
            setPincodeError('Sorry. Service not available for this pincode.');
            return;
        }

        // try {
        //     const response = await fetch(`https://api.example.com/checkDelivery/${pincode}`);
        //     const data = await response.json();

        //     if (data.available) {
        //         setDeliveryDate(data.deliveryDate);
        //     } else {
        //         setPincodeError('Delivery service not available for this pincode');
        //         return;
        //     }
        // } catch (error) {
        //     console.error('Error checking pincode availability:', error);
        //     setPincodeError('Error checking pincode availability. Please try again later.');
        //     return;
        // }
    };

    const toggleExpanded = () => {
        setExpanded(!expanded);
    };

    const handleScrollRight2 = () => {
        if (containerRef2.current) {
            const containerWidth = containerRef2.current.scrollWidth;
            const containerScrollWidth = containerRef2.current.offsetWidth;
            const maxScrollRight = containerWidth - containerScrollWidth;

            const scrollStep = containerScrollWidth + 0.40;

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
            const scrollStep = containerScrollWidth + 0.40;

            if (scrollPosition > 0) {
                const newScrollPosition = Math.max(scrollPosition - scrollStep, 0);
                containerRef2.current.scrollBy({
                    left: -scrollStep, 
                    behavior: "smooth",
                });
                setScrollPosition(newScrollPosition);
            } else {
                
                const maxScrollRight = containerWidth - containerScrollWidth;
                containerRef2.current.scrollTo({
                    left: maxScrollRight,
                    behavior: "smooth",
                });
                setScrollPosition(maxScrollRight);
            }
        }
    };

    const handleTextarea = (e: any) => {
        const inputValue = e.target.value;

        setMessage(inputValue);
    };

    const handleRatingChange = (newRating: React.SetStateAction<number>) => {
        4
        console.log('New Rating:', newRating);
        setRating(newRating); 
    };

    const openModal = () => {
        setOpen(!open)
    };

    useEffect(() => {
        if (isOpenWriteReview || open) {
            document.body.classList.add('modal-open');
            document.body.style.overflow = "hidden";
        } else {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = "";
        }
    }, [isOpenWriteReview, open]);

    const handleReviewSubmit = () => {

        console.log("Submit review:", { rating: rating, message });


        setMessage('');
        setRating(0);
        setShowThankYouMessage(true);
    };

    useEffect(() => {
        const handleClickOutside = (event: { target: any; }) => {
            if (shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShareClick = () => {
        setShowOptions(!showOptions);
    };
    const handleOptionClick = (url: any) => {
      
        window.open(url, '_blank');
    }


    const reviews = [
        {
            userImage: '',
            userFirst: "",
            firstName: 'John1 Doe',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 2.5,
            reviewText: 'A modern. Lenses have a simple coating to make it easy to clean.',
        },
        {

            userImage: '',
            userFirst: "",
            firstName: 'Qane2 Smith',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 4,
            reviewText: 'ionable look and a comfortable feel.  coating to make it easy to clean.',
        },
        {

            userImage: '',
            userFirst: "",
            firstName: 'John3 Doe',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 3.5,
            reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ultricies libero et nunc finibus, at vehicula nisl vestibulum.',
        },
        {

            userImage: '',
            userFirst: "",
            firstName: 'John4 Doe',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 4,
            reviewText: 'Integer nec odio eget justo efficitur ullamcorper. Morbi feugiat auctor nisi, nec eleifend justo. Sed ut dapibus magna.',
        }, {

            userImage: '',
            userFirst: "",
            firstName: 'John6 Doe',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 4,
            reviewText: 'Integer nec odio eget justo efficitur ullamcorper. Morbi feugiat auctor nisi, nec eleifend justo. Sed ut dapibus magna.',
        },
        {
            userImage: '',
            userFirst: "",
            firstName: 'John5 Doe',
            lastName: 'Doe',
            year: "04-Mar-2023",
            starRating: 4,
            reviewText: 'Integer nec odio eget justo efficitur ullamcorper. Morbi feugiat auctor nisi, nec eleifend justo. Sed ut dapibus magna.',
        },
    ];

    return (
        <>
            <div className="bg-white px-[2rem] py-[2rem] md:px-[3rem] xl:px-[6rem] p-black mx-auto- md:w-[50%]- lg:w-full-">
                <div className="p-1 bg-white w-full text-lato text-[14px] ">
                    <text>Eyewear </text> <span> /</span>
                    <text> Reading Glasses </text> <span> /</span>
                    <text> Unisex </text> <span> /</span>
                    <text> Salvador </text> <span> /</span>
                    <text className="text-PictonBlue"> 41140</text>

                    {/* Eyewear / Reading Glasses  / Unisex / Salvador / 41140 */}
                </div>

                <div className="bg-red-200- mt-2 flex flex-col md:flex-row">
                    <div className="bg-blue-200- flex flex-row md:flex-col items-center ">

                        <Image
                            onClick={handleScrollLeft2}
                            src={Images.DOWN_ARROW}
                            alt="/"
                            height={20}
                            width={20}
                            className="rotate-90 h-25 w-25 cursor-pointer text-blue-300  flex md:hidden"
                        />
                        <div ref={containerRef2} className="overflow-x-auto flex md:flex-wrap mx-3">

                            <img src={Images.PRODUCT_SAMPLE_IMAGE} alt="logo" className="image2 md:mb-1 lg:mb-2 md:mr-1 lg:mr-2" />
                            <img src={Images.PRODUCT_SAMPLE_IMAGE} alt="logo" className="image2 md:mb-1 md:mr-1 lg:mb-2" />
                            <img src={Images.PRODUCT_SAMPLE_IMAGE} alt="logo" className="image2  md:mr-1 md:mb-1 lg:mb-0 lg:mr-2" />
                            <img src={Images.PRODUCT_SAMPLE_IMAGE} alt="logo" className="image2" />
                        </div>
                        <Image
                            onClick={handleScrollRight2}
                            src={Images.DOWN_ARROW}
                            alt="/"
                            height={20}
                            width={20}
                            className="rotate-270 h-25 w-25  cursor-pointer hover:text-PictonBlue flex md:hidden"
                        />
                    </div>
                    <div className="bg-blue-200- text-lato flex flex-col w-full  lg:w-[410px] xl:w-[520px] mt-4 md:mt-0  lg:ml-6 lg:ml-[-80px]- xl:ml-[-50px]-  relative">

                        <div className="flex justify-between">
                            <p className="text-md lg:text-[34px] xl:text-[40px] font-bold flex-start">Salvador</p>
                            <div className="flex justify-end">
                                <button className="" onClick={handleToggleFavorite}
                                >
                                    {isFavorite ? (
                                        <Image src={Images.WISHLIST} alt="/" height={24} width={24} />
                                    ) : (
                                        <Image src={Images.FILLWISHLIST} alt="/" height={24} width={24} />
                                    )}
                                </button>
                                <button className="ml-4 mr-2 p-0" onClick={handleShareClick}>
                                    <Image
                                        src={Images.SHARE}
                                        width={23}
                                        height={23}
                                        alt="share"
                                        className="w-[18px] h-[18px] lg:w-[23px] lg:h-[23px]"
                                    />
                                </button>
                                {showOptions && <ShareOptions onOptionClick={handleOptionClick} />}
                            </div>
                        </div>
                        <p className=" text-PictonBlue text-md lg:text-[24px] font-medium w-[200px] lg:w-[300px] ">41140-MATTEBLACK_SILVER-51</p>
                        <p className="text-[14px] font-medium">FRAME + LENS</p>
                        <p className="mt-4  text-md lg:text-[34px] xl:text-[40px] font-bold">₹ 499</p>
                        <p className="text-[14px] font-medium">{Strings.INCLUSIVE_TAXES}</p>
                        <div className="mt-4  space-x-6">
                            <button className="product-color-button bg-[#E5D5D5]"></button>
                            <button className="product-color-button bg-[#BAAE96]"></button>
                            <button className="product-color-button bg-[#D9D9D9]"></button>
                            <button className="product-color-button bg-[#56809E]"></button>
                            <button className="product-color-button bg-[#E9E4EC]"></button>
                        </div>
                        <div className="mt-2 lg:mt-4 flex flex-row">
                            <button className="w-[136px] h-38 rounded-md text-sm text-black bg-white flex items-center justify-center border-2 border-black outline-none px-2 lg:px-4 py-2 hover:text-PictonBlue hover:border-PictonBlue hover:font-bold">
                                {Strings.ADD_TO_CART}
                            </button>
                            <button className="ml-2 lg:ml-4 w-[136px] h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue">
                                {Strings.BUY_NOW}
                            </button>
                        </div>
                        <div className="mt-6 flex flex-row text-[12px] xl:text-[14px]">
                        <div className="flex flex-col lg:flex-row items-center justify-center xs:items-center xs:justify-start">
    <Image
        src={Images.GUARANTEE}
        width={50}
        height={46}
        alt="GUARANTEE"
        className="w-[40px] h-[44px]  lg:w-[40px] lg:h-[46px] "
    />
    <p className=" mt-2 lg:mt-1 lg:ml-2  w-[85px] md:w-[100px] text-center">{Strings.GUARANTEE}</p>
</div>
<div className="ml-2 xl:ml-4 md:ml-0 flex flex-col lg:flex-row items-center xs:items-center justify-center xs:justify-start">
    <Image
        src={Images.RETURNS}
        width={40}
        height={40}
        alt="RETURNS"
        className="w-[40px] h-[40px] "
    />
    <p className=" mt-2 lg:mt-1 lg:ml-2  w-[85px] md:w-[100px] text-center">{Strings.RETURNS_POLICY}</p>
</div>
<div className="ml-2 xl:ml-4 md:ml-0 flex flex-col lg:flex-row items-center xs:items-center justify-center xs:justify-start">
    <Image
        src={Images.TEST_EXCHANGE}
        width={27}
        height={36}
        alt="TEST_EXCHANGE"
        className="w-[36px] h-[40px]"
    />
    <p className="mt-2 lg:mt-1 lg:ml-2 w-[110px] lg:w-[140px] text-center">{Strings.TEST_EXCHANGE}</p>
</div>
                        </div>

                        <div className="relative mt-4 lg:mt-6 flex justify-between mb-4 lg:mb-6 w-full lg:w-[410px] xl:w-[520px]">
                            <p className="text-[14px] font-bold">{Strings.PRODUCT_INFORMATION}</p>
                            <div className="">
                                <button className={`focus:outline-none transition-transform duration-400 ease-in-out ${isOpen ? 'rotate-180' : ''}`} onClick={toggleDropdown}>
                                    <img src={Images.DOWN_ARROW} alt="Dropdown Arrow" />
                                </button>
                                {isOpen && (
                                    <ul id="dropdown-menu" className="bg-red-300 absolute right-0 bg-white mt-2 w-full text-[14px]">
                                        <li className="flex justify-between"><p className="font-bold">{Strings.BRAND_NAME}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.PRODUCT_TYPE}</p><p>Brand Name</p></li>
                                        <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.FRAME_STYLE}</p><p>Brand Name</p></li>
                                        <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.FRAME_MATERIAL}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.FRAME_SHAPE}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider]"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.FRAME_COLOR}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.SIZE_DIMENSIONS}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.WEIGHT}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                        <li className="common-style"><p className="font-bold">{Strings.MODEL_NUMBER}</p>
                                            <p>Brand Name</p> </li> <div className="common-divider"></div>
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div style={{ marginTop: isOpen ? '230px' : '0' }}>
                            <p className="text-[14px] font-bold">{Strings.CHECK_DELIVERY_DATE}</p>
                            <div className="mt-2 flex justify-row relative">
                                <input
                                    type="Pincode"
                                    placeholder="Enter your pincode"
                                    value={pincode}
                                    onChange={handlePincodeChange}
                                    className="border-Cod_Gray rounded-lg text-[14px]  text-black placeholder-black bg-[#E5E5E4] px-4 py-2 outline-none dark:border-white dark:bg-[#000] w-full xs:text-base lg:text-md md:w-[280px] lg:w-[260px]"
                                />
                                <button onClick={handleSubmit}
                                    className="absolute inset-y-0 right-0 flex  items-center px-2 md:left-60 lg:left-56">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        className="h-6 w-6 text-black hover:text-PictonBlue cursor-pointer" >
                                        <path

                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                        />
                                    </svg>
                                </button>

                            </div>
                            {isSubmitted && (
                                <>
                                    {!isPincodeValid ? (
                                        <p className="m-2 text-md text-red-500">{pincodeError}</p>
                                    ) : (
                                        <>
                                            {deliveryDate ? (
                                                <div className="flex flex-row mt-2 text-sm md:text-md border border-green-500 text-green-500 p-2 rounded w-full lg:w-[325px]">
                                                    {/* <div className="w-3 h-3 bg-green-500 rounded-full"></div> */}
                                                    <p>Product will be delivered by: {deliveryDate}</p>
                                                </div>
                                            ) : (
                                                <p className="mt-2 text-sm md:text-md border border-red-500 text-red-500 p-2 rounded w-full lg:w-[325px]">{pincodeError}</p>
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 lg:mt-12  w-full lg:w-[600px] xl:w-[775px]">
                    <div className="flex flex-col md:flex-row items-center md:items-end ">
                        <p id="content">{expanded ? sampleText : sampleText.substring(0, 200)}</p>
                        {!expanded && (
                            <button
                                id="readMoreBtn"
                                className="ml-0 md:ml-12 mt-1 md:mt-0 w-[138px] h-17 md:w-[240px] h-10 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-2 lg:px-4 py-2 hover:bg-PictonBlue"
                                onClick={toggleExpanded}
                            >
                                {Strings.READ_MORE}
                            </button>
                        )}
                    </div>
                    <div className="relative mt-4 lg:mt-6 flex justify-between">
                        <div className="font-bold text-[12px] lg:text-[14px]">{Strings.REVIEWS}</div>
                        <div className="">
                            <button className={`focus:outline-none h-4 w-4 flex items-center transition-transform duration-400 ease-in-out ${isOpenReview ? 'rotate-180' : ''}`} onClick={toggleDropdownReview}>
                                <img src={Images.DOWN_ARROW} alt="Dropdown Arrow" />
                            </button>
                            {isOpenReview && (
                                <div className="absolute right-0 w-full lg:w-[600px] xl:w-[775px]" ref={reviewContainerRef}>
                                    {reviews.slice(0, 2).map((review, index) => (
                                        <div key={index}>
                                            <Review
                                                userImage={review.userImage}
                                                firstName={review.firstName}
                                                lastName={review.lastName}
                                                year={review.year}
                                                starRating={review.starRating}
                                                reviewText={review.reviewText}
                                                index={index}
                                                totalReviews={reviews.length} />
                                            {index !== 1 && <div className="h-[0.5px] bg-black rounded-xl mt-[2px]"></div>}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {open && (
                                <>
                                    <div className='fixed top-0 left-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-[80%]'>
                                        <div className='relative bg-white  h-[500px] w-[300px] md:w-[600px] lg:w-[700px] overflow-y-auto py-4 px-4 md:py-8 md:px-16'>
                                            <div className="flex flex-row justify-between">
                                                <p className=" text-lg w-full md:text-xl lg:text-2xl font-bold">{Strings.REVIEWS}</p>
                                                <div className="fixed ml-[240px] md:ml-[540px] lg:ml-[640px] "> <button onClick={openModal} className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg></button>
                                                </div>
                                            </div>
                                            <div>
                                                {reviews.slice(2).map((review, index) => (
                                                    <div key={index}>
                                                        <Review
                                                            userImage={review.userImage}
                                                            firstName={review.firstName}
                                                            lastName={review.lastName}
                                                            year={review.year}
                                                            starRating={review.starRating}
                                                            reviewText={review.reviewText}
                                                            index={index}
                                                            totalReviews={reviews.length} />
                                                        {index < reviews.length - 1 && <div className="h-[0.5px] bg-black rounded-xl mt-[2px]"></div>}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {isOpenReview && (<div style={{ marginTop: buttonsMarginTop }} className=" lg:mt-4 flex flex-row absolute">
                        <button onClick={openModal} className="w-[126px] h-[34px]  md:w-[136px] md:h-38 rounded-md text-sm text-black bg-white flex items-center justify-center border-2 border-black outline-none px-1 lg:px-2 py-2 hover:text-PictonBlue hover:border-PictonBlue hover:font-bold">
                            {Strings.MORE_REVIEWS}
                        </button>
                        {isOpenWriteReview && !showThankYouMessage && (
                            <div className='fixed top-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-500 bg-opacity-[80%]'>
                                <div className='relative bg-white h-[320px] md:h-[340px] lg:h-[360px] w-[300px] md:w-[500px] overflow-y-auto py-4 px-4 md:py-8 md:px-16 rounded'>
                                    <div className="flex flex-row justify-between">
                                        <p className=" text-lg md:text-xl lg:text-2xl font-bold">{Strings.WRITE_A_REVIEW}</p>
                                        <div className="fixed ml-[240px] md:ml-[440px] lg:ml-[440px] "> <button onClick={closeWriteReviewModal} className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg></button>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-row items-center"> <p className="text-lg">{Strings.RATE_THIS_PRODUCT}</p> <div className="ml-2"><GiveRatings giverating={rating} onRatingChange={handleRatingChange} /></div> </div>
                                    <textarea
                                        id="message"
                                        rows={4}
                                        ref={textareaRef}
                                        className="mt-2 w-full border-Cod_Gray focus:ring-Cod_Gray focus:border-Cod_Gray dark:focus:ring-Cod_Gray dark:focus:border-Cod_Gray block rounded-lg border-[1px] border-[#000] bg-white p-2.5 outline-none dark:border-white dark:bg-[#000] dark:text-white dark:placeholder-gray-400 xs:text-base lg:text-lg"
                                        placeholder="What did you like about this product write here...."
                                        name="Massage"
                                        value={message}
                                        onChange={handleTextarea}
                                    ></textarea>
                                    <div className="mt-2 flex-start">
                                        {showRatingWarning && (
                                            <p className=" font-outfit text-red-500">Please give rating.
                                            </p>
                                        )}
                                        {showWarning && (
                                            <p className=" font-outfit text-red-500">Please write something about this product.
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() => {

                                                if (message.trim().length === 0 || rating === 0) {

                                                    setShowWarning(message.trim().length === 0);
                                                    setShowRatingWarning(rating === 0);
                                                } else {

                                                    handleReviewSubmit();
                                                }
                                            }}

                                            className={`  mt-5 hover:text-PictonBlue hover:border-PictonBlue rounded-full  border-2 bg-gradient-to-t px-5 py-2 text-md md:text-lg font-semibold  border-black border:red-600 dark:text-white`}
                                        >
                                            {Strings.SUBMIT}</button>
                                    </div>

                                </div>
                            </div>
                        )}
                        {showThankYouMessage && (
                            <div className='fixed top-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-500 bg-opacity-[80%]'>
                                <div className='relative bg-white h-[320px] md:h-[340px] lg:h-[360px] w-[300px] md:w-[500px] overflow-y-auto py-4 px-4 md:py-8 md:px-16 rounded'>
                                    <div className="fixed ml-[240px] md:ml-[440px] lg:ml-[440px] "> <button onClick={closeWriteReviewModal} className=" flex h-8 w-8 items-center justify-center rounded-full border-transparent bg-white text-black opacity-[80%]"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px"><path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" /></svg></button>
                                    </div>
                                    <p className="flex items-center justify-center text-lg text-green-600  font-semibold">Thank you for submitting your review!</p>
                                </div>
                            </div>
                        )}
                        <button onClick={openWriteReviewModal} className="ml-2 lg:ml-4 w-[126px] h-[34px]  md:w-[136px] md:h-38 rounded-md text-sm text-white bg-black flex items-center justify-center border-none px-1 lg:px-2 py-2 hover:bg-PictonBlue">
                            {Strings.WRITE_A_REVIEW}
                        </button>
                    </div>
                    )}
                    <div style={{ marginTop: isOpenReview ? nextDivMarginTop : '16px' }} className="font-bold text-[12px] lg:text-[14px]">{Strings.WHAT_COMES}</div>
                    <div className="flex items-center">
                        <div><Image
                            src={Images.SPACTACLE}
                            width={230}
                            height={160}
                            alt="spactacle"
                            className=""
                        /> </div> <span className="ml-4 md:ml-6">+</span>
                        <div><Image
                            src={Images.SPACTACLE_BOX}
                            width={230}
                            height={180}
                            alt="spactacle_box"
                            className=""
                        />  </div> <span className="mr-2 ">+</span>

                        <div> <Image
                            src={Images.SPACTACLE_CLEANER}
                            width={100}
                            height={100}
                            alt="spactacle_cleaner"
                            className=" ml-2 md:ml-6"
                        /> </div>
                    </div>
                </div>
            </div>
            < SimilarProductPage />
        </>
    );
};

export default ProductDetails;