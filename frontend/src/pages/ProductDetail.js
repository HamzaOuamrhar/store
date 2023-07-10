import React, { useContext } from "react";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Spinner from "../components/Spinner";
import { Store } from "../Store";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, product: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductDetail() {
  const params = useParams();
  const { slug } = params;
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get(`/api/product/${slug}`);
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [slug]);
  const {state, dispatch: ctxDispatch} = useContext(Store)
  const addToCartHandler = () => {
    ctxDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity: 1}})
  }
  return (
    <div>
      {loading ? (
        <Spinner/>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <div>
          <Helmet>
            <title>{product.name}</title>
          </Helmet>
          <div>{product.name}</div>
          {product.countInStock > 0 ? (
            <div>In Stock</div>
          ) : (
            <div>Unavailable</div>
          )}
          <button onClick={addToCartHandler}>ADD TO CART</button>
        </div>
      )}
    </div>
  );
}

export default ProductDetail;
