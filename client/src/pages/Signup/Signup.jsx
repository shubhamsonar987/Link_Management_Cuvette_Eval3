import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../toastify.css";
import Logo from "../../assets/logo/Logo";
import images from "../../assets/components/Frame-2.png";
import "./Signup.css";
import "../Login/Login.css";

const Signup = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [checkboxError, setCheckboxError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [hasTypedFirstname, setHasTypedFirstname] = useState(false);
  const [hasCheckedTerms, setHasCheckedTerms] = useState(false);
  const [hasTypedPassword, setHasTypedPassword] = useState(false);
  const [hasTypedConfirmPass, setHasTypedConfirmPass] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  const navigate = useNavigate();
  const { setUser } = useContext(UserDataContext);

  const validatePassword = (password, confirmpass) => {
    let errors = [];

    if (hasTypedPassword) {
      // Only validate if user started typing
      if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
      }
      if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
        errors.push(
          "Password must contain at least 1 lowercase and 1 uppercase letter."
        );
      }
      if (!/[0-9]/.test(password)) {
        errors.push("Password must contain at least 1 number.");
      }
      if (!/[!@#$%^&*]/.test(password)) {
        errors.push(
          "Password must include at least 1 special character (!@#$%^&*)."
        );
      }
    }

    if (hasTypedConfirmPass && password !== confirmpass) {
      errors.push("Passwords do not match.");
    }

    return errors;
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (!hasTypedPassword) setHasTypedPassword(true);
  };

  const handleConfirmPassChange = (e) => {
    setConfirmpass(e.target.value);
    if (!hasTypedConfirmPass) setHasTypedConfirmPass(true);
  };

  const handleFirstnameChange = (e) => {
    const value = e.target.value;
    setFirstname(value);

    // Mark that user has started typing
    if (!hasTypedFirstname) {
      setHasTypedFirstname(true);
    }

    if (value.trim() === "" && hasTypedFirstname) {
      setFirstnameError("First name is required minimum 3 charecters.");
    } else {
      setFirstnameError(""); // Clear error if valid
    }
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);

    // Mark that user has interacted with the checkbox
    if (!hasCheckedTerms) {
      setHasCheckedTerms(true);
    }

    if (!e.target.checked && hasCheckedTerms) {
      setCheckboxError(
        "You must agree to the Terms of Use and Privacy Policy."
      );
    } else {
      setCheckboxError(""); // Remove error if checked
    }
  };

  useEffect(() => {
    const errors = validatePassword(password, confirmpass);
    setError(errors.join("\n")); // Show all errors
  }, [password, confirmpass, hasTypedPassword, hasTypedConfirmPass]);

  useEffect(() => {
    if (!firstname.trim()) {
      setFirstnameError("First name is required minimum 3 charecters..");
    } else {
      setFirstnameError("");
    }
  }, [firstname]);

  useEffect(() => {
    if (!isChecked) {
      setCheckboxError(
        "You must agree to the Terms of Use and Privacy Policy."
      );
    } else {
      setCheckboxError("");
    }
  }, [isChecked]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let isValid = true;

    if (!firstname.trim()) {
      setFirstnameError("First name is required minimum 3 characters.");
      isValid = false;
    } else {
      setFirstnameError("");
    }

    if (!isChecked) {
      setCheckboxError(
        "You must agree to the Terms of Use and Privacy Policy."
      );
      isValid = false;
    } else {
      setCheckboxError("");
    }

    if (!isValid) return;

    const newUser = { firstname, lastname, email, password };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        if (data.token) {
          localStorage.setItem("token", data.token); // Store token in localStorage
        } else {
          throw new Error("No token received from server");
        }

        setUser(data.user);
        showSuccessToast("User created successfully");
        navigate("/userpreference");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        (error.request
          ? "No response from the server. Please try again later."
          : `An error occurred: ${error.message}`);
      showErrorToast(errorMessage);
    }

    setFirstname("");
    setLastname("");
    setEmail("");
    setPassword("");
    setConfirmpass("");
    setIsChecked(false);
  };

  const isFormInvalid = error !== "" || !isChecked || firstnameError !== "";

  const showSuccessToast = (message) => {
    Toastify({
      text: `<span class="toast-message">${message}</span><span class="toast-close">×</span>`,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "center",
      className: "toastify success-toast",
      escapeMarkup: false,
    }).showToast();
  };

  const showErrorToast = (message) => {
    Toastify({
      text: `<span class="toast-message">${message}</span><span class="toast-close">×</span>`,
      duration: 3000,
      close: false,
      gravity: "top",
      position: "center",
      className: "toastify error-toast",
      escapeMarkup: false,
    }).showToast();
  };

  const getBorderColor = () => {
    if (!confirmpass) return "black";
    return password === confirmpass ? "green" : "red";
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1023);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="mains"
      style={{
        display: isMobile ? "flex" : "grid",
      }}
    >
      <div className="maincontainers">
        <Logo />
        <h1 className="sparkss">Sign up to your Spark</h1>
        <div className="divconts" style={{ marginBottom: "5rem" }}>
          <h5 className="joinuss">
            Create an account{" "}
            <Link
              to="/Login"
              style={{ color: "#28A263", fontSize: "13px", fontWeight: 500 }}
            >
              Sign in instead
            </Link>
          </h5>
          <form className="formcontainers" onSubmit={submitHandler}>
            <div className="inputconts">
              <label className="labelss">First Name</label>
              <input
                className="passinputs"
                type="text"
                value={firstname}
                onChange={handleFirstnameChange}
                required
                minLength={3}
              />
              {hasTypedFirstname && firstnameError && (
                <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                  {firstnameError}
                </p>
              )}
            </div>

            <div className="inputconts">
              <label className="labelss">Last name</label>
              <input
                className="emailinputs"
                required
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                type="text"
                minLength={3}
              />
            </div>
            <div className="inputconts">
              <label className="labelss">Email</label>
              <input
                className="emailinputs"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                minLength={6}
              />
            </div>
            <div className="inputconts">
              <label className="labelss">Password</label>
              <input
                className="passinputs"
                style={{ borderColor: getBorderColor() }}
                type={isTyping ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                minLength={8}
              />
              {hasTypedPassword &&
                error &&
                error.split("\n").map((msg, index) => (
                  <p
                    key={index}
                    style={{ color: "red", fontSize: "14px", margin: "0px" }}
                  >
                    {msg}
                  </p>
                ))}
            </div>

            <div className="inputconts">
              <label className="labelss">Confirm Password</label>
              <input
                className="passinputs"
                style={{ borderColor: getBorderColor() }}
                type={isTyping ? "text" : "password"}
                value={confirmpass}
                onChange={handleConfirmPassChange}
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                required
                minLength={8}
              />
            </div>

            <div className="checkss">
              <input
                className="checkbox"
                type="checkbox"
                id="terms"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label htmlFor="terms">
                By creating an account, I agree to the{" "}
                <span style={{ textDecoration: "underline" }}>
                  Terms of Use
                </span>{" "}
                and{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  Privacy Policy
                </span>
                .
              </label>
            </div>
            {hasCheckedTerms && checkboxError && (
              <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
                {checkboxError}
              </p>
            )}

            <button
              className="registers"
              type="submit"
              disabled={isFormInvalid}
            >
              Register
            </button>
          </form>
        </div>
        <div>
          <p className="lastx">
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
      <img src={images} className="image" />
    </div>
  );
};

export default Signup;
