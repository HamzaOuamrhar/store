import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const {data} = await axios.get(`/api/products/${item._id}`)
    if(data.countInStock < quantity){
      window.alert("Sorry. Product is out of stock")
      return
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: {...item, quantity}
    })
  } 
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: 'CART_REMOVE_ITEM',
      payload: item
    })
  }
  const checkoutHandler = () => {
    navigate('/signin?redirect=/shipping')
  }
  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <div>Cart is empty!</div>
      ) : (
        <div className="cartitems">
          {cartItems.map((item) => (
            <div className="cartitem" key={item._id}>
              <p>{item.name}</p>
              <i
                class="fa-solid fa-circle-minus"
                onClick={() => updateCartHandler(item, item.quantity - 1)}
                disabled={item.quantity === 1}
              ></i>
              <p>{item.quantity}</p>
              <i
                class="fa-solid fa-circle-plus"
                onClick={() => updateCartHandler(item, item.quantity + 1)}
                disabled={item.quantity === item.countInStock}
              ></i>
              <i class="fa-solid fa-trash"
              onClick={() => removeItemHandler(item)}
              ></i>
            </div>
          ))}
          <div>
            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} item
            {cartItems.reduce((a, c) => a + c.quantity, 0) === 1 ? "" : "s"}{" "}
            {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}$)
            <button onClick={checkoutHandler}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
