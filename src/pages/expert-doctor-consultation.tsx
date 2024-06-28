import "../app/Listingpage.css";
import "react-datepicker/dist/react-datepicker.css";

import { Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import DatePicker from "react-datepicker";
import { Footer } from "@/Component/footer";
import Headerforfaqs from "@/Component/headerforfaqs";
import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { format } from "date-fns";
import Loader from "@/Component/Loader";

interface DoctorConsultationData {
  id: number;
  name: string;
  specialities: string;
  education: string;
  experience: string;
  timings: string;
  charges: string;
  location: string;
  number: number;
  image: string;
  isVisible: boolean;
  createdAt: number;
  updatedAt: number;
}

const ExpertDoctor = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [search, setSearch] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [doctor, setDoctor] = useState("");
  const [location, setLocation] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [message, setMessage] = useState<string>("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [ConsultationData, setConsultationData] = useState<
    DoctorConsultationData[]
  >([]);
  const [isRotated, setIsRotated] = useState(false);
  const [isRotated2, setIsRotated2] = useState(false);
  const [isRotated3, setIsRotated3] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      setIsAnimated(true);
    }
  }, [inView]);

  const handleEmailChange = (e: { target: { value: any } }) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(emailValue);
    setIsValidEmail(isValidEmail);
  };

  const handleMobileChange = (e: { target: { value: any } }) => {
    const mobileValue = e.target.value;

    if (!isNaN(mobileValue)) {
      setMobile(mobileValue);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setStartDate(date);
      const formattedDate = format(date, "d-M-yyyy");
      console.log(formattedDate);
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDoctorChange = (state: string) => {
    setDoctor(state);
  };
  const handleLocationChange = (state: string) => {
    setLocation(state);
  };

  const handleToggleRotation = (selectName: any) => {
    switch (selectName) {
      case "Time":
        setIsRotated(!isRotated);
        break;
      case "Doctor":
        setIsRotated2(!isRotated2);
        break;
      case "Location":
        setIsRotated3(!isRotated3);
        break;
      default:
        break;
    }
  };

  const Time = ["10:00 AM to 1:00 PM", "2:00 PM to 6:00 PM"];
  const Doctor = [
    "Dr Dipak Garg",
    "Dr Chinmay Nakhava 2",
    "Dr Urmi shah",
    "Dr Shreyansh Jhoshi",
  ];
  const Location = ["Dadar", "Juhu", "Andheri", "Malabar Hill"];

  const sendAppointmentData = async () => {
    setIsLoading(true);
    let data = JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      email: email,
      date: startDate,
      doctor: doctor,
      location: location,
      message: message,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}doctor/apointment`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      console.log(JSON.stringify(response.data));
      setfirstName("");
      setlastName("");
      setMobile("");
      setEmail("");
      setStartDate(new Date());
      setDoctor("");
      setLocation("");
      setMessage("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = () => {
    return firstName || lastName || mobile || doctor || location || message;
  };

  const fetchDoctorConsultation = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}doctor/get`,
      headers: {},
    };
    try {
      const response = await axios.request(config);

      const sortedData = response.data.doctorData.sort(
        (a: { id: string }, b: { id: string }) => {
          if (
            a.id === "667e70a56265d6fe80c1b589" ||
            a.id === "667e719c6265d6fe80c1b58a"
          )
            return 1;
          if (
            b.id === "667e70a56265d6fe80c1b589" ||
            b.id === "667e719c6265d6fe80c1b58a"
          )
            return -1;
          return 0;
        }
      );

      setConsultationData(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctorConsultation();
  }, []);

  const checkScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const storyTitle2 = {
    hideBottom: {
      opacity: 0,

      y: isSmallScreen ? 100 : 200,
    },
    showBottom: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1,
      },
    },
    exit: {
      opacity: 0,
      y: isSmallScreen ? -100 : -200,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  return (
    <div>
      <Headerforfaqs setSearch={setSearch} />
      <div className="mt-10 space-y-4 border- shadow-md bg-white rounded-lg xs:mx-[20px] lg:mx-[70px] p-7">
        <div className="flex xs:flex-col  md:flex-row md:justify-between gap-x-5 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">First Name</p>
            <input
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">Last Name</p>
            <input
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
        </div>
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-5 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">Mobile No.</p>
            <input
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Phone No."
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              Email <span className="text-gray-400">{Strings.Optional}</span>
            </p>
            <input
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="Email"
              className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
            {!isValidEmail && (
              <p className="text-red-500 text-xs">
                Please enter a valid email address.
              </p>
            )}
          </div>
        </div>
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-5 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">Date</p>
            <div
              onClick={toggleDatePicker}
              className=" outline-none border border-gray-400 rounded-md h-10 w-full flex items-center"
            >
              <DatePicker
                className="text-black text-sm p-2 outline-none rounded-md w-full"
                selected={startDate}
                onChange={handleDateChange}
                dateFormat="d-M-yyyy"
                wrapperClassName="w-full"
              />
            </div>
          </div>
          <div className=" w-full  space-y-2">
            <p className="font-semibold text-sm text-black">Doctor</p>
            <div className="relative">
              <select
                value={doctor}
                onChange={(e) => handleDoctorChange(e.target.value)}
                className=" text-black text-sm p-2 outline-none border border-gray-400 rounded-md h-10 w-full appearance-none"
                onClick={() => handleToggleRotation("Doctor")}
              >
                <option value="" disabled>
                  Select a Doctor
                </option>
                {Doctor.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div
                className={`absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none ${
                  isRotated2 ? "rotate-180 duration-300" : ""
                }`}
              >
                <Image
                  src={Images.Downiconblack}
                  alt="/"
                  height={6}
                  width={12}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-5 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">Location</p>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10 w-full appearance-none"
                onClick={() => handleToggleRotation("Location")}
              >
                <option value="" disabled>
                  Select a Location
                </option>
                {Location.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div
                className={`absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none ${
                  isRotated3 ? "rotate-180 duration-300" : ""
                }`}
              >
                <Image
                  src={Images.Downiconblack}
                  alt="/"
                  height={6}
                  width={12}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">Message</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Massage"
              className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid()}
            onClick={sendAppointmentData}
            className={`bg-black hover:bg-PictonBlue text-white font-medium text-base flex justify-center items-center h-10 w-[320px] rounded-md ${
              !isFormValid() ? " cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <Loader /> : Strings.SUBMIT}
          </button>
        </div>
      </div>
      <div className="xs:mx-[20px] lg:mx-0 flex justify-center flex-wrap md:gap-x-5 lg:gap-x-10 xl:gap-x-20 mt-5- my-10">
        {ConsultationData.length > 0 ? (
          ConsultationData.map((ele, index) => (
            <motion.div
              initial="hideBottom"
              whileInView="showBottom"
              exit="exit"
              variants={storyTitle2}
              ref={ref}
              animate={isAnimated ? "showBottom" : "hideBottom"}
            >
              <div
                key={index}
                className=" half-bg my-5 bg-white shadow-md rounded-[10px] p-4 md:w-[350px] lg:transition-transform lg:hover:scale-105 lg:transform"
              >
                <div className=" flex justify-center ">
                  <div className=" mb-4 ">
                    <img
                      src={ele.image}
                      alt="shopImage"
                      className="h-40 w-40 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className=" space-y-1 mt-4- ">
                  <h1 className=" font-bold text-lg mb-4">{ele.name}</h1>
                  <h1 className=" text-sm ">
                    <span className="font-semibold ">Specialities : </span>
                    {ele.specialities}
                  </h1>
                  <h1 className="text-sm">
                    <span className="font-semibold ">Education : </span>
                    {ele.education}
                  </h1>
                  <h1 className=" text-sm">
                    <span className="font-semibold "> Experience : </span>
                    {ele.experience} Years
                  </h1>
                  <h1 className="text-sm">
                    <span className="font-semibold "> Timing : </span>
                    {ele.timings}
                  </h1>
                  <h1 className="text-sm">
                    <span className="font-semibold ">Charges : </span> INR {""}
                    {ele.charges}
                  </h1>
                  <h1 className=" text-sm">
                    <span className="font-semibold "> Location : </span>
                    {ele.location}
                  </h1>
                  <div className="flex gap-x-[10px]  items-center">
                    <Image
                      src={Images.PHONE_LOGO_BLUE}
                      width={18}
                      height={18}
                      alt="PhoneIcon"
                      className="h-[20px] w-[20px]"
                    />
                    <Link
                      href={`tel:-${ele.number}`}
                      className="underline text-[#000000] hover:text-[#42b7e9] text-base"
                    >
                      +91 {ele.number}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div>{Strings.NO_DATA_FOUND}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ExpertDoctor;
