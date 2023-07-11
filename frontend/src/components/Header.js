import React from "react";
import { Link } from "react-router-dom";

function Header({cart}) {
  return (
    <div>
    <Link to={'/cart'}>
    <p
        style={{
          backgroundColor: "crimson",
          color: "white",
          padding: "10px",
          borderRadius: "50%",
          width: "fit-content"
        }}
      >
        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
      </p></Link>
    </div>
  );
}

export default Header;
