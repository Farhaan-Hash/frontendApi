import React from "react";
import loginpic from "../images/8.png";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
  } = useForm();

  //SUBMIT FORM
  const registerSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const userData = {
        user: data.user,
        email: data.email,
        password: data.password,
      };

      // console.log(userData);
      await axios
        .post("https://backend-api-seven.vercel.app/auth/register", userData)
        .then((log) => {
          log.data.success
            ? toast.success(log.data.msg, {
                position: "top-center",
                autoClose: 9000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              })
            : toast.error(log.data.msg, {
                position: "top-center",
                autoClose: 9000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        })
        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 9000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
      // setTimeout(navigate("/"), 5000);
    } else {
      toast.error("Passwords dont match!", {
        position: "top-center",
        autoClose: 9000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
    }
  };

  return (
    <div className="row bgcolor pb-2">
      <h1 className="text-white text-center pb-1">Register Here</h1>
      <div className="col-md-5 mx-auto  py-5 px-5">
        <div className="card p-3 bg-white">
          <h1 className="pt-2 px-4">Register</h1>
          <form className="mt-5 mx-5 " onSubmit={handleSubmit(registerSubmit)}>
            <div className="form-group">
              <h5>Name</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                required
                autoFocus
                {...register("user", {required: true, minLength: 6})}
              />
              {errors.user && (
                <p className="text-danger mt-1">
                  Name should be of atleast 6 characters
                </p>
              )}
            </div>
            <div className="form-group mt-4">
              <h5>Email Address</h5>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                required
                autoFocus
                {...register("email", {
                  required: true,
                  pattern:
                    /^[A-Z0-9_'%=+!`#~$*?^{}&|-]+([.][A-Z0-9_'%=+!`#~$*?^{}&|-]+)*@[A-Z0-9-]+(\.[A-Z0-9-]+)+$/i,
                })}
              />
              {errors.email && (
                <p className="text-danger mt-1">
                  Please check and enter correct email!
                </p>
              )}
            </div>
            <div className="form-group mt-4">
              <h5>Password</h5>
              <input
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter password"
                id="password"
                required
                autoFocus
                {...register("password", {
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                })}
              />
              {errors.password && (
                <div className="text-danger mt-1">
                  <p>Password should be of length 6-15!</p>
                  <p>
                    Should contain atleast one uppercase, lowercase, number &
                    special character
                  </p>
                </div>
              )}
            </div>
            <div className="form-group mt-4">
              <h5>Confirm Password</h5>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                required
                autoFocus
                {...register("cpassword", {
                  pattern:
                    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                })}
              />

              {errors.password && (
                <div className="text-danger mt-1">
                  <p>Password should be of length 6-15!</p>
                  <p>
                    Should contain atleast one uppercase, lowercase, number &
                    special character
                  </p>
                </div>
              )}
              {/* here we watch the both password and confirm password filed and if both not match, trigger the validation */}
              {watch("cpassword") !== watch("password") &&
              getValues("cpassword") ? (
                <p className="text-danger mt-1">Password does not match</p>
              ) : null}
            </div>
            <div className="text-center">
              <button className="submit-btn mt-5" type="submit">
                Submit
              </button>
            </div>
          </form>
          <Link className="text-info mt-4 text-center" to="/">
            Already Registered? Click here to Login!
          </Link>
        </div>
      </div>
      <div className="col-md-6 mt-5">
        <img
          className="img-fluid"
          src={loginpic}
          width="650px"
          height="550px"
          alt="Login"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
