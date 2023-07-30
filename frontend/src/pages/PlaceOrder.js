import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function PlaceOrder() {
  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod, cartItems },
    userInfo,
  } = state;
  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );
  const shippingPrice = itemsPrice > 100 ? round2(0) : round2(10);
  const taxPrice = round2(0.15 * itemsPrice);
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const placeOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await Axios.post(
        "/api/orders",
        {
          orderItems: cartItems,
          paymentMethod: paymentMethod,
          shippingAddress: shippingAddress,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      localStorage.removeItem(cartItems);
      dispatch({ type: "CREATE_SUCCESS" });
      ctxDispatch({ type: "CART_CLEAR" });
      navigate(`/order/${data.order._id}`);
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      toast.error("Order placed with error!");
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);
  return (
    <div className="placeorder">
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <div className="left">
        <h4>Shipping & Payment</h4>
        <div className="shipping-infos">
          <div>
            <span>Name:</span> {shippingAddress.fullName}
          </div>
          <div>
            <span>Shipping address:</span> {shippingAddress.address},{" "}
            {shippingAddress.city}, {shippingAddress.postalCode},{" "}
            {shippingAddress.country}
          </div>
          <div>
            <span>Payment method:</span> {paymentMethod}
          </div>
        </div>
        <h4>Items</h4>
        <div className="items">
          {cartItems.map((item) => (
            <div className="item" key={item._id}>
              <div>
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
              </div>
              <span>{item.quantity}</span>
              <span className="price">${item.price}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="right">
        <h4>Order Summary</h4>
        <div className="order-summary">
          <div>
            <p>Items</p>
            <span>${itemsPrice.toFixed(2)}</span>
          </div>
          <div>
            <p>Shipping</p>
            <span>${shippingPrice.toFixed(2)}</span>
          </div>
          <div>
            <p>Tax</p>
            <span>${taxPrice.toFixed(2)}</span>
          </div>
          <div className="total">
            <p>Total</p>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button onClick={placeOrderHandler} disabled={cartItems.length === 0}>
            Place Order
          </button>
        </div>
      </div>
      {loading && <Spinner></Spinner>}
    </div>
  );
}

export default PlaceOrder;
