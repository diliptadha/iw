import React from "react";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < filledStars) {
        stars.push(
          <span
            key={i}
            style={{ color: "#FFC107", fontSize: 24, marginRight: "5px" }}
          >
            {"\u2605"}
          </span>
        );
      } else if (i === filledStars && hasHalfStar) {
        stars.push(
          <span
            key={i}
            style={{
              color: "#D9D9D9",
              fontSize: 24,
              marginRight: "5px",
              position: "relative",
            }}
          >
            <span
              className="half-star"
              style={{
                position: "absolute",
                color: "#FFC107",
                top: "-3.5px",
                left: 0,
                width: "50%",
                overflow: "hidden",
              }}
            >
              {"\u2605"}
            </span>
            {"\u2605"}
          </span>
        );
      } else {
        stars.push(
          <span
            key={i}
            style={{ color: "#D9D9D9", fontSize: 24, marginRight: "5px" }}
          >
            {"\u2605"}
          </span>
        );
      }
    }

    return stars;
  };

  return <div>{renderStars()}</div>;
};
export default StarRating;
