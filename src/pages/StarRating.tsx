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
            style={{ color: "#FFC107", marginRight: "5px" }}
            className="star"
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
              marginRight: "5px",
              position: "relative",
            }}
            className="star"
          >
            <span
              className="half-star"
              style={{
                position: "absolute",
                color: "#FFC107",
                top: "-2px",
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
            style={{ color: "#D9D9D9", marginRight: "5px" }}
            className="star"
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