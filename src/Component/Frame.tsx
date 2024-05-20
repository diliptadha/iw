import Image from "next/image";
import Link from "next/link";
import React from "react";

interface FrameProps {
  image: string;
  buttonText: string;
  buttonUrl: string;
  onClick?: () => void;
  gender: string;
}

const Frame: React.FC<FrameProps> = ({
  image,
  buttonText,
  buttonUrl,
  onClick,
  gender,
}) => {
  return (
    <div className="flex-none px-2- md:px-0-">
      <div className="relative flex justify-center">
        <Image
          src={image}
          alt="/"
          height={266}
          width={203}
          className="border border-black rounded-xl"
        />
        <Link
          href={`/${buttonText.toLowerCase().replace(/\s+/g, "-")}/${gender}`}
          className="absolute bottom-4"
        >
          <button
            // onClick={() => onClick()}
            className="bg-black font-normal text-xs text-white  h-[34px] w-[137px] rounded-[5px] flex justify-center items-center transition-transform hover:scale-105 transform"
          >
            {buttonText}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Frame;
