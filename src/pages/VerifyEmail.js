import axios from "axios";
import React, {useEffect} from "react";
import {useParams, Link} from "react-router-dom"; //whatever in the URl we can have access to it
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginpic from "../images/3.png";
import {runFireworks} from "../utils";

const VerifyEmail = () => {
  const params = useParams();

  const tokenVerify = async () => {
    try {
      const res = await axios.post(
        "https://backend-api-seven.vercel.app/auth/verify-mail",
        {
          token: params.token,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // setTimeout(() => {
        //   window.close();
        // }, 4000);
      } else {
        toast.error(res.data.msg, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.close();
        }, 100000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    tokenVerify();
    runFireworks();
  }, []);

  return (
    <div className="mx-auto px-6 col-md-6">
      <Link className="btn btn-dark text-center mt-4" to="/">
        Go to Login Page
      </Link>
      <img
        className="img-fluid"
        src={loginpic}
        width="650px"
        height="550px"
        alt="Login"
      />
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
