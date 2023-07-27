import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Store } from "../Store";
import SearchBox from "./SearchBox";

function Header({ cart }) {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };
  return (
    <div className="header">
      <Link to={"/"}>
        <p className="logo">sosa</p>
      </Link>
      <SearchBox />
      <>
        {userInfo ? (
          <ul>
            <li>
              <Link to={"/profile"}>
                <i class="fa-solid fa-user"></i>
              </Link>
              <ul className="dropdown">
                <li className="dropdown-list">
                  <Link to={"/profile"}>
                    <i class="fa-solid fa-user"></i>
                  </Link>
                  <Link to={"/profile"}>
                    <span>{userInfo.name}</span>
                  </Link>
                </li>
                <li className="dropdown-list">
                  <Link to={"/orderhistory"}>
                    <i class="fa-solid fa-book"></i>
                  </Link>
                  <Link to={"/orderhistory"}>
                    <span>Order History</span>
                  </Link>
                </li>
                <li className="dropdown-list" onClick={signoutHandler}>
                  <Link>
                    <i class="fa-solid fa-right-from-bracket"></i>
                  </Link>
                  <Link>
                    <span>Signout</span>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="mobile-icon">
              <Link to={"/orderhistory"}>
                <i class="fa-solid fa-book"></i>
              </Link>
            </li>
            <li>
              <Link to={"/cart"}>
                <i class="fa-solid fa-bag-shopping">
                  {/* <span className="cartitems">
                    {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                  </span> */}
                </i>
              </Link>
            </li>
            <li className="mobile-icon" onClick={signoutHandler}>
              <Link>
                <i class="fa-solid fa-right-from-bracket"></i>
              </Link>
            </li>
          </ul>
        ) : (
          <Link to={"/signin"}>
            <button>Sign In</button>
          </Link>
        )}
      </>
    </div>
  );
}

export default Header;
