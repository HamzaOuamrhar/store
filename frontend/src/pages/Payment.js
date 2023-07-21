import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {Store} from "../Store";
import {useNavigate} from 'react-router-dom'

function Payment() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { shippingAddress, paymentMethod },
  } = state;
  const [paymentMethodName, setPaymentMethodName] = useState(paymentMethod || "paypal");
  const navigate = useNavigate()
  useEffect(() => {
    if(!shippingAddress.address){
      navigate('/shipping')
    }
  }, [shippingAddress, navigate])
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({type: 'SAVE_PAYMENT_METHOD', payload: paymentMethodName})
    localStorage.setItem('paymentMethod', paymentMethodName)
    navigate('/placeorder')
  };
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <form onSubmit={submitHandler}>
        <label htmlFor="PayPal">PayPal</label>
        <input
          onChange={(e) => setPaymentMethodName(e.target.value)}
          type="radio"
          checked={paymentMethodName === "paypal"}
          value="paypal"
          label="PayPal"
          id="PayPal"
        />
        <br />
        <label htmlFor="Stripe">Stripe</label>
        <input
          onChange={(e) => setPaymentMethodName(e.target.value)}
          type="radio"
          checked={paymentMethodName === "stripe"}
          value="stripe"
          label="Stripe"
          id="Stripe"
        />
        <br />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Payment;
