import "../app/Listingpage.css";
import "react-datepicker/dist/react-datepicker.css";

import { Expert, Images, Strings } from "@/constant";
import React, { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import { Footer } from "@/Component/footer";
import Headerforfaqs from "@/Component/headerforfaqs";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/Component/Loader";
import Swal from "sweetalert2";
import WhatsAppButton from "@/Component/WhatsAppButton";
import axios from "axios";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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
  const [isMobile, setIsMobile] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      setIsAnimated(true);
    }
  }, [inView]);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      const today = new Date();
      if (date >= today) {
        setStartDate(date);
        const formattedDate = format(date, "d-M-yyyy");
        console.log(formattedDate);
      }
    }
  };
  const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
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
        setIsRotated3(false);
        break;
      case "Location":
        setIsRotated3(!isRotated3);
        setIsRotated2(false);
        break;
      default:
        break;
    }
  };

  const Time = ["10:00 AM to 1:00 PM", "2:00 PM to 6:00 PM"];
  const Doctor = [
    "Dr Deepak Garg",
    "Dr Chinmay Nakhava ",
    "Dr Urmi shah",
    "Dr Shreyansh Doshi",
    "Dr Kartik Panikkar",
    "Dr Poonam Rai",
    "Dr Akshay Nair",
    "Dr Rupali Sinha",
  ];
  const Location = ["Kemps Corner ", "Dadar", "Juhu"];

  const isFormValid = () => {
    return (
      firstName.trim() &&
      lastName.trim() &&
      mobile.trim() &&
      (email.trim() === "" || isValidEmail) &&
      isValidEmail &&
      doctor.trim() &&
      location.trim() &&
      startDate &&
      message.trim()
    );
  };

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      showAlert("success", "Appointment booked successfully!");
      setfirstName("");
      setlastName("");
      setMobile("");
      setEmail("");
      setStartDate(new Date());
      setDoctor("");
      setLocation("");
      setMessage("");
    }
  };

  const showAlert = async (icon: "success", message: string) => {
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

  const fetchDoctorConsultation = async () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_API_URL}doctor/get`,
      headers: {},
    };
    try {
      const response = await axios.request(config);
      const sortedData = response.data.doctorData;
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="max-w-screen-2xl m-auto ">
      <Headerforfaqs setSearch={setSearch} />
      <div className="flex justify-center my-10">
        <h1 className="text-black font-extrabold text-4xl">
          {Expert.Book_Appointment}
        </h1>
      </div>
      <div className=" space-y-4 border- shadow-md bg-white rounded-lg xs:mx-[20px] lg:mx-32 py-7 xs:px-5 lg:px-12">
        <div className="flex xs:flex-col  md:flex-row md:justify-between gap-x-7 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              {Expert.First_Name}
            </p>
            <input
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              placeholder="First Name"
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              {Expert.Last_Name}
            </p>
            <input
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              placeholder="Last Name"
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
        </div>
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-7 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              {Expert.Mobile_No}
            </p>
            <input
              value={mobile}
              onChange={handleMobileChange}
              placeholder="Mobile No."
              className="text-black p-2 text-sm outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
          </div>
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              {Expert.Email}
              <span className="text-gray-400">{Strings.Optional}</span>
            </p>
            <input
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="Email"
              className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10 w-full"
            />
            {!isValidEmail && (
              <p className="text-red-500 text-xs">{Expert.Email_Err}</p>
            )}
          </div>
        </div>
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-7 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">{Expert.Date}</p>
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
                minDate={getFirstDayOfCurrentMonth()}
              />
            </div>
          </div>
          <div className=" w-full  space-y-2">
            <p className="font-semibold text-sm text-black">{Expert.Doctor}</p>
            <div className="relative">
              <select
                value={doctor}
                onChange={(e) => handleDoctorChange(e.target.value)}
                className=" text-black text-sm p-2 outline-none border border-gray-400 rounded-md h-10 w-full appearance-none"
                onClick={() => handleToggleRotation("Doctor")}
                onBlur={() => setIsRotated2(false)}
              >
                <option value="" disabled>
                  {Expert.Select_a_Doctor}
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
        <div className="flex xs:flex-col md:flex-row md:justify-between gap-x-7 xs:space-y-4 md:space-y-0">
          <div className="w-full space-y-2">
            <p className="font-semibold text-sm text-black">
              {Expert.Location}
            </p>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10 w-full appearance-none"
                onClick={() => handleToggleRotation("Location")}
                onBlur={() => setIsRotated3(false)}
              >
                <option value="" disabled>
                  {Expert.Select_a_Location}
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
            <p className="font-semibold text-sm text-black">{Expert.Message}</p>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Message"
              className="text-black text-sm p-2 outline-none border  border-gray-400 rounded-md h-10- w-full"
              rows={isMobile ? 4 : 1}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={!isFormValid()}
            onClick={sendAppointmentData}
            className={`bg-black hover:bg-PictonBlue text-white font-medium text-base flex justify-center items-center h-10 w-[200px] rounded-md ${
              !isFormValid() ? " cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? <Loader /> : Strings.SUBMIT}
          </button>
        </div>
      </div>
      <div className="flex justify-center my-12">
        <h1 className="text-black font-extrabold text-4xl">
          {Expert.All_Doctors}
        </h1>
      </div>
      <div className="xs:mx-[20px]-  lg:mx-0 flex justify-center  flex-wrap md:gap-x-5 lg:gap-x-10 xl:gap-x-14">
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
                className=" half-bg mb-10 bg-white shadow-md rounded-[10px] p-4 xs:w-[330px] md:w-[350px]  md:h-[475px] lg:transition-transform lg:hover:scale-105 lg:transform"
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
                <div className=" space-y-[10px] mt-4- ">
                  <div className=" font-bold text-lg mb-4">{ele.name}</div>
                  <div className=" text-sm ">
                    <span className="font-semibold ">
                      {Expert.Specialities}
                    </span>
                    {ele.specialities}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold ">{Expert.Education}</span>
                    {ele.education}
                  </div>
                  <div className=" text-sm">
                    <span className="font-semibold ">{Expert.Experience}</span>
                    {ele.experience} {Expert.Years}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold "> {Expert.Timing}</span>
                    {ele.timings}
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold ">{Expert.Charges}</span>{" "}
                    {Expert.INR} {""}
                    {ele.charges}
                  </div>
                  <div className=" text-sm">
                    <span className="font-semibold "> {Expert.location} </span>
                    {ele.location}
                  </div>
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
      <div className="flex justify-end xs:mx-[20px] lg:mx-32 mb-10">
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

export default ExpertDoctor;
