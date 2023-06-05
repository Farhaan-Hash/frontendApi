import React, {useState} from "react";
import loginpic from "../images/12.png";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // Submit details
  const loginSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };

    try {
      axios
        .post("https://authapi-mb84.onrender.com/auth/login", userData)
        .then((log) => {
          if (log.data.success) {
            toast.success(log.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // save jwt token

            localStorage.setItem("data", JSON.stringify(log.data.token));
            navigate("/dashboard");
          } else {
            toast.error(log.data.msg, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row bgcolor py-2 ">
      <h1 className="text-white text-center">Welcome</h1>
      <div className="col-md-6 py-5">
        <img
          className="img-fluid"
          src={loginpic}
          width="650px"
          height="550px"
          alt="Login"
        />
      </div>
      <div className="col-md-4 py-5 mt-3">
        <div className="card p-3 bg-white">
          <form onSubmit={loginSubmit} className="mt-5 mx-5 ">
            <div className="form-group">
              <h5>Email Address</h5>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                placeholder="Enter Email"
                required
                autoFocus
              />
            </div>
            <div className="form-group mt-4">
              <h5>Password</h5>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                placeholder="Enter Password"
                required
              />
            </div>
            <div className="text-center">
              <button className="submit-btn mt-5" type="submit">
                Submit
              </button>
            </div>
          </form>
          <Link className="text-info mt-4 text-center" to="/register">
            Not Registered? Click Here!
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
