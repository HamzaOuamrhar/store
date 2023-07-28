import React, { useContext } from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import axios from "axios";

function Product(props) {
  const { product } = props;
  return (
    <div className="product">
      <Link to={`/products/slug/${product.slug}`}>
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-infos">
        <Link to={`/products/slug/${product.slug}`}>
          <div className="product-name">{product.name}</div>
        </Link>
        <div className="product-rating">
          <div className="product-price">${product.price}</div>
          <Rating rating={product.rating} numReviews={product.numReviews} />
        </div>
      </div>
    </div>
  );
}

export default Product;
