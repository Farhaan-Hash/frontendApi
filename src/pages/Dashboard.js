import React, {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState(null);

  // FORM
  const {
    register,
    handleSubmit,
    formState: {errors},
    getValues,
    watch,
  } = useForm();

  // Form submit-----------------------------------------
  const updateSubmit = async (data) => {
    if (data.password === data.cpassword) {
      const updateUser = {
        email: name.email,
        password: data.password,
        cupassword: data.cupassword, //whether current password matches with the current password in the database or not
      };
      axios
        .post("https://backauth.onrender.com/auth/update", {updateUser})
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.msg, {
              position: "top-right",
              autoClose: 2500,
              closeOnClick: true,
              theme: "light",
            });
            localStorage.removeItem("data");
            setTimeout(() => {
              window.location.href = "/";
            }, 3500);
          } else {
            toast.error(res.data.msg, {
              position: "top-right",
              autoClose: 5000,
              closeOnClick: true,
              theme: "light",
            });
          }
        })
        .catch((err) => console.log(err));
    } else {
      toast.error("Passwords doesn't match", {
        position: "top-right",
        autoClose: 2500,
        closeOnClick: true,
        theme: "light",
      });
    }
  };

  // Logout-------------------------------------
  const logout = () => {
    localStorage.removeItem("data");
    navigate("/");
  };
  // ---------Data auth Token load on startup
  const loadData = async () => {
    try {
      const token = await JSON.parse(localStorage.getItem("data"));
      const res = await axios.get(
        "https://backauth.onrender.com/auth/userdata",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        setName(res.data.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // -------------------------load token data on render
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div class="row">
      <div className="bgcolor p-4">
        <h2 className="text-white text-center">
          Dashboard
          <button className=" mt-4 btn btn-danger float-end" onClick={logout}>
            Logout
          </button>
        </h2>
      </div>
      <br />
      <div className="mt-5 col-md-4 py-5">
        <h3 className="mt-5"> Name: {name?.user}</h3>
        <h3 className="mt-3">Email: {name?.email}</h3>
      </div>

      <div className="mt-5 col-md-6 py-5">
        <div className="col-md-7 mx-2 mt-5 py-2">
          <div className="customBackground card p-3">
            <h2 className="pt-4 px-2 text-center text-white">Update details</h2>
            <form className="mt-5 mx-4" onSubmit={handleSubmit(updateSubmit)}>
              <div className="form-group">
                <h5 className="text-white">Name</h5>
                <input
                  type="text"
                  value={name?.user}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group mt-4">
                <h5 className="text-white">Email</h5>
                <input
                  type="email"
                  value={name?.email}
                  className="form-control"
                  readOnly
                />
              </div>
              <div className="form-group mt-4">
                <h5 className="text-white">Current Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter current Password"
                  {...register("cupassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                  })}
                />
                {errors.cupassword && (
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
                <h5 className="text-white">New Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new Password"
                  {...register("password", {
                    required: true,
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
                <h5 className="text-white">Confirm New Password</h5>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new Password"
                  {...register("cpassword", {
                    required: true,
                    pattern:
                      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/,
                  })}
                />
                {errors.cpassword && (
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
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
