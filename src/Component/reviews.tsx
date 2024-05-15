import { Images, Strings } from "@/constant";
import React, { useState } from "react";

import Image from "next/image";
import StarRating from "./StarRating";

interface ReviewProps {
  userImage: any;
  fName: string;
  lName: string;
  createdAt: any;
  rating: any;
  comment: string;
  index: number;
  totalReviews: number;
}

const Review: React.FC<ReviewProps> = ({
  userImage,
  fName,
  lName,
  createdAt,
  rating = 0,
  comment,
}) => {
  return (
    <div className="mt-6 relative">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-200- flex justify-center items-center">
            {userImage ? (
              <Image
                height={30}
                width={30}
                src={userImage}
                alt="User"
                className="user-image"
              />
            ) : (
              <Image
                height={30}
                width={30}
                src={Images.AVTAR}
                alt="Default Avatar"
                className="user-image"
              />
            )}
          </div>
          <div className="flex flex-col ml-2 md:ml-4 text-[12px] md:text-[16px]">
            <div className="flex ">
              <p className="">{fName}</p>
              <p className="ml-1"> {lName}</p>
            </div>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="md:ml-auto">
          <StarRating rating={rating} />
        </div>
      </div>
      <p className="review-text mt-2 mb-6 mx-4">{comment}</p>
    </div>
  );
};

export default Review;
