import React, { useContext, useEffect, useReducer } from "react";
import Spinner from "../components/Spinner";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, error: "", order: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
    case "PAY_FAIL":
      return { ...state, loadingPay: false };
    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false };
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
  const [{ loading, error, order, successPay, loadingPay }, dispatch] = useReducer(reducer, {
    loading: true,
    order: {},
    error: "",
    successPay: false,
    loadingPay: false
  });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
        dispatch({ type: "PAY_SUCCESS", payload: data });
        toast.success("Order is paid");
      } catch (err) {
        dispatch({ type: "PAY_FAIL", payload: err });
        toast.error(err);
      }
    });
  }
  function onError(err) {
    toast.error(err);
  }

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
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if(successPay){
         dispatch({type: "PAY_RESET"})
      }
    } else {
      const loadPaypalScript = async () => {
        const { data: clientId } = await axios.get("/api/keys/paypal", {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      loadPaypalScript();
    }
  }, [navigate, userInfo, orderId, order, paypalDispatch, successPay]);
  return loading ? (
    <Spinner></Spinner>
  ) : (
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
      <div>
        {!order.isPaid && (
          <div>
            {isPending ? (
              <Spinner />
            ) : (
              <div>
                <PayPalButtons>
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={onError}
                </PayPalButtons>
              </div>
            )}
            {loadingPay && <Spinner/>}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
