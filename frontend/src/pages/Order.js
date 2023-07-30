import React, { useContext, useEffect, useReducer } from "react";
import Spinner from "../components/Spinner";
import { Store } from "../Store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

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
  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: "",
      successPay: false,
      loadingPay: false,
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
      if (successPay) {
        dispatch({ type: "PAY_RESET" });
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
    <div className="placeorder">
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <div className="left">
        <h4>Shipping & Payment</h4>
        <div className="shipping-infos">
          <div>
            <span>Name:</span> {order.shippingAddress.fullName}
          </div>
          <div>
            <span>Shipping address:</span> {order.shippingAddress.address},{" "}
            {order.shippingAddress.city}, {order.shippingAddress.postalCode},{" "}
            {order.shippingAddress.country}
          </div>
          {order.isDelivered ? (
            <div className="success-message">Delivered at: {order.deliveredAt}</div>
          ) : (
            <div className="error-message">Not delivered</div>
          )}
          <div>
            <span>Payment method:</span> {order.paymentMethod}
          </div>
          {order.isPaid ? (
            <div className="success-message">Paid at: {order.paidAt}</div>
          ) : (
            <div className="error-message">Not paid</div>
          )}
        </div>
        <h4>Items</h4>
        <div className="items">
          {order.orderItems.map((item) => (
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
            <span>${order.itemsPrice.toFixed(2)}</span>
          </div>
          <div>
            <p>Shipping</p>
            <span>${order.shippingPrice.toFixed(2)}</span>
          </div>
          <div>
            <p>Tax</p>
            <span>${order.taxPrice.toFixed(2)}</span>
          </div>
          <div className="total">
            <p>Total</p>
            <span>${order.totalPrice.toFixed(2)}</span>
          </div>
          {!order.isPaid && (
            <>
              {isPending ? (
                <Spinner />
              ) : (
                <div className="my-paypal-buttons">
                  <PayPalButtons
                    className="my-paypal-button"
                    createOrder={createOrder}
                    onApprove={onApprove}
                    onError={onError}
                  ></PayPalButtons>
                </div>
              )}
              {loadingPay && <Spinner />}
            </>
          )}
        </div>
      </div>
      {loading && <Spinner></Spinner>}
    </div>
  );
}

export default Order;
