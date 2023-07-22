import React, { useContext, useEffect, useReducer } from "react";
import Spinner from "../components/Spinner";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function Order() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const params = useParams();
  const { id: orderId } = params;
  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
  });
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err });
      }
    };
    if (!userInfo) {
      return navigate("/login");
    }
    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [navigate, userInfo, orderId, order]);
  return loading ? (
    <Spinner></Spinner>
  ) :  (
    <div>
      <h1>Order {orderId}</h1>
      <span>{order.shippingAddress.city}</span>
      {order.isDelivered ? (
        <span>Delivered at: {order.deliveredAt}</span>
      ) : (
        <span>Not delivered</span>
      )}
      <strong>Payment: {order.paymentMethod}</strong>
      {order.isPaid ? (
        <span>Paid at: {order.paidAt}</span>
      ) : (
        <span>Not paid!</span>
      )}
      <div className="items">
        {order.orderItems.map((item) => (
          <div className="item" key={item._id}>
            {item.name} <br />
            {item.quantity} <br />
            {item.price}
          </div>
        ))}
      </div>
      <div>
        <span>Items: {order.itemsPrice}</span>
        <span>Shipping: {order.shippingPrice}</span>
        <span>Tax: {order.taxPrice}</span>
        <span>Total: {order.totalPrice}</span>
      </div>
    </div>
  );
}

export default Order;
