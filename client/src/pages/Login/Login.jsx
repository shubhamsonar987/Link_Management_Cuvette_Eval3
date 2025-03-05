import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../../context/UserContext";
import axios from "axios";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import Logo from "../../assets/logo/Logo";
import images from "../../assets/components/Frame-2.png";
import "../toastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  const { user, setUser } = useContext(UserDataContext);
  const showSuccessToast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      className: "toastify success-toast",
    }).showToast();
  };

  // Error Toast
  const showErrorToast = (message) => {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top",
      position: "center",
      className: "toastify error-toast",
    }).showToast();
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/login`,
        { email, password }
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        showSuccessToast("Successfully logged in");
        navigate("/links");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      showErrorToast(`${errorMessage}`);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="main">
      <div className="maincontainer">
        <Logo className="logo" />

        <div className="divcont">
          <h3 className="joinus">Sign in to your Spark</h3>
          <form
            className="formcontainer"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <input
              className="emailinput"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Spark/Username"
              minLength={6}
            />
            <div
              className="password-container"
              style={{ position: "relative" }}
            >
              <input
                className="passinput"
                type={isPasswordVisible ? "text" : "password"} // Toggle password visibility
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                minLength={6}
              />
              <i
                className={
                  isPasswordVisible ? "ri-eye-off-line" : "ri-eye-line"
                } // Change icon based on visibility
                onClick={togglePasswordVisibility} // Toggle password visibility on click
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              ></i>
            </div>
            <button className="register">Log in</button>
            <p className="signup">
              Don't have an account ?
              <Link to="/Signup" className="signupline">
                SignUp
              </Link>
            </p>
          </form>
          <div className="last">
            <p>
              This site is protected by reCAPTCHA and the{" "}
              <span style={{ textDecoration: "underline" }}>
                Google Privacy Policy
              </span>{" "}
              and{" "}
              <span style={{ textDecoration: "underline" }}>
                {" "}
                Terms of Service
              </span>{" "}
              apply.
            </p>
          </div>
        </div>
      </div>
      <div className="container">
        <img src={images} className="image" />
      </div>
    </div>
  );
};

export default Login;
