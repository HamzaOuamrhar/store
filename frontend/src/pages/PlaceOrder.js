import React, { useContext, useEffect, useReducer } from "react";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import {toast} from 'react-toastify'
import Spinner from '../components/Spinner'
import {Helmet} from 'react-helmet-async'

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
    try{
      dispatch({type: 'CREATE_REQUEST'})
      const {data} = await Axios.post('/api/orders',{
        orderItems: cartItems,
        paymentMethod: paymentMethod,
        shippingAddress: shippingAddress,
        itemsPrice: itemsPrice,
        shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice
      }, {
        headers:{
          authorization: `Bearer ${userInfo.token}`
        }
      })
      localStorage.removeItem(cartItems)
      dispatch({type: "CREATE_SUCCESS"})
      ctxDispatch({type: "CART_CLEAR"})
      navigate(`/order/${data.order._id}`)
    }catch(err){
      dispatch({type: "CREATE_FAIL"})
      toast.error("Order placed with error!")
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      navigate("/payment");
    }
  }, [paymentMethod, navigate]);
  return (
    <div>
      <Helmet>
        <title>Place Order</title>
      </Helmet>
      <h1>Shipping</h1>
      <div>
        <span>name: {shippingAddress.fullName}</span>
        <br />
        <span>
          Shipping address: {shippingAddress.address}, {shippingAddress.city},{" "}
          {shippingAddress.postalCode}, {shippingAddress.country}
        </span>
        <br />
        <span>Payment method: {paymentMethod}</span>
      </div>
      <hr />
      <div>
        {cartItems.map((item) => (
          <div className="item" key={item._id}>
            <span>{item.name}</span>
            <br />
            <span>quantity: {item.quantity}</span>
            <br />
            <span>price: {item.price}</span>
          </div>
        ))}
      </div>
      <hr />
      <div>
        <span>Items ${itemsPrice.toFixed(2)}</span> {" / "}
        <span>Shipping ${shippingPrice.toFixed(2)}</span> {" / "}
        <span>Tax ${taxPrice.toFixed(2)}</span> {" / "}
        <span>Total ${totalPrice.toFixed(2)}</span>
        <br />
        <button onClick={placeOrderHandler} disabled={cartItems.length === 0}>
          Place Order
        </button>
      </div>
      {loading && <Spinner></Spinner>}
    </div>
  );
}

export default PlaceOrder;
