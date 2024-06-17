import React, { memo, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({ defaultValue }) => {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    setRating(defaultValue);
  }, [defaultValue]);

  return (
    <div className="flex items-center gap-1">
      {defaultValue}
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index} htmlFor="">
            <input
              className="hidden"
              type="radio"
              name="rating"
              value={currentRating}
            />
            <FaStar
              className={[
                `cursor-pointer`,
                currentRating <= (hover || rating)
                  ? `text-yellow-500`
                  : `text-stone-300`,
              ].join(" ")}
              onClick={() => setRating(currentRating)}
              onMouseEnter={() => {
                setHover(currentRating);
              }}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default memo(StarRating);
