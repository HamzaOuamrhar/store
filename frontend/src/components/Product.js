import React from "react";
import Rating from "./Rating";

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <div>{product.name}</div>
      <div>{product.price}</div>
      <div>{product.slug}</div>
      <Rating rating={product.rating} numReviews={product.numReviews} />
    </div>
  );
}

export default Product;
