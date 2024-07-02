import React from "react";

interface StarRatingProps {
  giverating: number;
  onRatingChange: (rating: number) => void;
}

const GiveRatings: React.FC<StarRatingProps> = ({
  giverating,
  onRatingChange,
}) => {
  const handleStarClick = (newRating: number) => {
    onRatingChange(newRating);
  };

  return (
    <div>
      {[...Array(5)].map((_, index) => (
        <span
          key={index}
          onClick={() => handleStarClick(index + 1)}
          style={{
            color: index < giverating ? "#FFC107" : "#D9D9D9",
            fontSize: 24,
            cursor: "pointer",
            marginRight: index < 4 ? 2 : 0,
          }}
        >
          {"\u2605"}
        </span>
      ))}
    </div>
  );
};

export default GiveRatings;
