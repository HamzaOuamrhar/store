import React from "react";

function Rating(props) {
  const { rating, numReviews, caption } = props;
  return (
    <span className="rating">
      {rating >= 1 ? (
        <i className="fa-solid fa-star"></i>
      ) : rating >= 0.5 ? (
        <i className="fa-solid fa-star-half-stroke"></i>
      ) : (
        <i className="fa-regular fa-star"></i>
      )}
      {rating >= 2 ? (
        <i className="fa-solid fa-star"></i>
      ) : rating >= 1.5 ? (
        <i className="fa-solid fa-star-half-stroke"></i>
      ) : (
        <i className="fa-regular fa-star"></i>
      )}
      {rating >= 3 ? (
        <i className="fa-solid fa-star"></i>
      ) : rating >= 2.5 ? (
        <i className="fa-solid fa-star-half-stroke"></i>
      ) : (
        <i className="fa-regular fa-star"></i>
      )}
      {rating >= 4 ? (
        <i className="fa-solid fa-star"></i>
      ) : rating >= 3.5 ? (
        <i className="fa-solid fa-star-half-stroke"></i>
      ) : (
        <i className="fa-regular fa-star"></i>
      )}
      {rating >= 5 ? (
        <i className="fa-solid fa-star"></i>
      ) : rating >= 4.5 ? (
        <i className="fa-solid fa-star-half-stroke"></i>
      ) : (
        <i className="fa-regular fa-star"></i>
      )}
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{" " + numReviews + " Reviews"}</span>
      )}
    </span>
  );
}

export default Rating;
