import React, { useContext } from "react";
import { Store } from "../Store";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const updateCartHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };
  const removeItemHandler = (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };
  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div className="cart-page">
      <Helmet>
        <title>Cart</title>
      </Helmet>
      {cartItems.length === 0 ? (
        <div className="error-message">Cart is empty!</div>
      ) : (
        <div className="cart">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="item-info">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                </div>
                <div className="item-update-quantity">
                  <i
                    className="fa-solid fa-circle-minus"
                    onClick={() => updateCartHandler(item, item.quantity - 1)}
                    disabled={item.quantity === 1}
                  ></i>
                  <p>{item.quantity}</p>
                  <i
                    className="fa-solid fa-circle-plus"
                    onClick={() => updateCartHandler(item, item.quantity + 1)}
                    disabled={item.quantity === item.countInStock}
                  ></i>
                </div>
                <i
                  className="fa-solid fa-trash"
                  onClick={() => removeItemHandler(item)}
                ></i>
              </div>
            ))}
          </div>
          <div className="cart-subtotal">
            <p>
              Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} item
              {cartItems.reduce((a, c) => a + c.quantity, 0) === 1
                ? ""
                : "s"})
            </p>
            <p className="price">${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}</p>
            <button onClick={checkoutHandler}>Proceed to checkout</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
