import React, { useContext } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <Link to={`/product/${product.slug}`}>
        <div>{product.name}</div>
      </Link>
      <div>{product.price}</div>
      <div>{product.slug}</div>
      <Rating rating={product.rating} numReviews={product.numReviews} />
    </div>
  );
}

export default Product;
