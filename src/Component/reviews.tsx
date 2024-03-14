import React, { useState } from 'react';
import { Images, Strings } from '@/constant';
import StarRating from './StarRating';

interface ReviewProps {
  userImage: any;
  firstName: string;
  lastName: string;
  year: any;
  starRating: any;
  reviewText: string;
  index: number;
  totalReviews: number;
}

const Review: React.FC<ReviewProps> = ({ userImage, firstName, lastName, year, starRating = 0, reviewText }) => {
 
  return (
    <div className="mt-6 relative">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center">
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-200- flex justify-center items-center">
            {userImage ? (
              <img src={userImage} alt="User" className="user-image" />
            ) : (
              <img src={Images.AVTAR} alt="Default Avatar" className="user-image" />
            )}
          </div>
          <div className="flex flex-col ml-2 md:ml-4 text-[12px] md:text-[16px]">
            <div className='flex '><p className="">{firstName}</p><p className="ml-1"> {lastName}</p></div>
            <p>{year}</p>
          </div>
        </div>
        <div className="md:ml-auto">
          <StarRating rating={starRating} />
        </div>
      </div>
      <p className="review-text mt-2 mb-6">{reviewText}</p>
    </div>
  );
};

export default Review;
