import React, { useContext, useReducer, useState } from "react";
import { Store } from "../Store";
import {toast} from 'react-toastify'
import axios from "axios";
import {Helmet} from 'react-helmet-async'


const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, loadingUpdate: true };
    case "UPDATE_SUCCESS":
      return { ...state, loadingUpdate: false };
    case "UPDATE_FAIL":
      return { ...state, loadingUpdate: false };
    default:
      return state;
  }
};

function Profile() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [{ loadingUpdate }, dispatch] = useReducer(reducer, {
    loadingUpdate: false,
  });
  const submitHandler = async (e) => {
    e.preventDefault()
    try{
      const {data} = await axios.put('/api/users/profile', {
        name,
        email,
        password
      },
      {
        headers: {Authorization: `Bearer ${userInfo.token}`}
      })
      dispatch({type: "UPDATE_SUCCESS"})
      ctxDispatch({type: "USER_SIGNIN", payload: data})
      localStorage.setItem('userInfo', JSON.stringify(data))
      toast.success('Profile Updated Successfully')
    }catch(err){
      dispatch({type: "UPDATE_FAIL"})
      toast.error(err)
    }
  };
  return (
    <div className="profile">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default Profile;
