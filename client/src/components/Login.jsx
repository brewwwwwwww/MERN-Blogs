import React, { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios"
import Swal from "sweetalert2";
import { authenticate } from "../../service/authorize";

const Login = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });

  const { username, password } = state;

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value });
  };

  const submitForm = (e) => {
    e.preventDefault()
    axios.post(`${import.meta.env.VITE_API_URL}/login`, {username, password})
    .then(response => {
      //login success
      authenticate(response, next)
    }).catch(err => {
      Swal.fire({
        title: "Fail!",
        text: err.response.data.err,
        icon: "error"
      });
    })
  }
  return (
    <div className="container p-5">
      <Navbar />
      <h1>Login | Admin</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Login;
