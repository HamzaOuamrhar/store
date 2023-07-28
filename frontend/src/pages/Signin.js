import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import { Store } from "../Store";
import { toast } from "react-toastify";

function Signin() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post("/api/users/signin", {
        email,
        password,
      });

      if (response && response.data) {
        const data = response.data;
        ctxDispatch({ type: "USER_SIGNIN", payload: data });
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate(redirect || "/");
        console.log("Server Response:", data);
      } else {
        console.error("Invalid response from server:", response);
        alert("An error occurred during sign-in. Please try again.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      toast.error("Invalid email or password");
    }
  };
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);
  return (
    <div className="signin">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <form action="" onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id=""
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
        <div>
          New customer? <Link to={`/signup?redirect=${redirect}`}>Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
