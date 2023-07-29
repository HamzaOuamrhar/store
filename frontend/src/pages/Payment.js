import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";

function Payment() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || "paypal"
  );
  const navigate = useNavigate();
  useEffect(() => {
    if (!shippingAddress.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethodName });
    localStorage.setItem("paymentMethod", paymentMethodName);
    navigate("/placeorder");
  };
  return (
    <div className="payment">
      <h2>Choose payment method</h2>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="PayPal">
            <i class="fa-brands fa-paypal"></i>
          </label>
          <input
            onChange={(e) => setPaymentMethodName(e.target.value)}
            type="radio"
            checked={paymentMethodName === "paypal"}
            value="paypal"
            label="PayPal"
            id="PayPal"
          />
        </div>
        <div>
          <label htmlFor="Stripe">
            <i class="fa-brands fa-cc-stripe"></i>
          </label>
          <input
            onChange={(e) => setPaymentMethodName(e.target.value)}
            type="radio"
            checked={paymentMethodName === "stripe"}
            value="stripe"
            label="Stripe"
            id="Stripe"
          />
        </div>
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Payment;
