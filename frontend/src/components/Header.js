import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";

function Header({ cart }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem('shippingAddress')
  };
  return (
    <div>
      <Link to={"/cart"}>
        <p
          style={{
            backgroundColor: "crimson",
            color: "white",
            padding: "10px",
            borderRadius: "50%",
            width: "fit-content",
          }}
        >
          {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
        </p>
      </Link>
      <div>
        {userInfo ? (
          <>
            <div>{userInfo.name}</div>{" "}
            <button onClick={signoutHandler}>Signout</button>
          </>
        ) : (
          <Link to={'/signin'}><button>Sign In</button></Link>
        )}
      </div>
    </div>
  );
}

export default Header;
