import React, { useState } from "react";

function Rating({ value, onRatingChange, disabled }) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(value || 0);

  const handleMouseEnter = (rating) => {
    if (!disabled) setHoveredRating(rating);
  };
  const handleMouseLeave = () => {
    if (!disabled) setHoveredRating(0);
  };
  const handleClick = (rating) => {
    if (!disabled) {
      setSelectedRating(rating);
      if (onRatingChange) onRatingChange(rating);
    }
  };

  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const isFilled = i <= (hoveredRating || selectedRating);
      stars.push(
        <button
          key={i}
          type="button"
          aria-label={`${i} Star`}
          disabled={disabled}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(i)}
          className={`
            text-3xl transition-colors duration-300
            ${isFilled ? "text-yellow-400" : "text-gray-300"}
            ${disabled ? "cursor-default" : "cursor-pointer hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded"}
          `}
        >
          ★
        </button>
      );
    }
    return stars;
  };

  return <div className="flex space-x-1 select-none">{generateStars()}</div>;
}

export default Rating;
