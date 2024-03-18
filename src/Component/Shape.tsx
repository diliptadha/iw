import Image from "next/image";
import React from "react";

interface ShapeProps {
  image: string;
  title: string;
  isSelected: boolean;
  onClick: () => void;
}

const Shape: React.FC<ShapeProps> = ({ image, title, isSelected, onClick }) => {
  return (
    <div>
      <div
        className={`border ${
          isSelected ? "border-PictonBlue bg-white" : "border-black"
        } xs:w-full md:w-[118px] h-[58px] rounded-[5px] flex justify-center items-center cursor-pointer`}
        onClick={onClick}
      >
        <Image src={image} alt="/" height={36} width={90} />
      </div>
      <p className="text-black font-normal text-sm">{title}</p>
    </div>
  );
};

export default Shape;
