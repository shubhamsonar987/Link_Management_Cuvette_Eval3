import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import "./Navbar.css";
import share from "../../assets/components/Vector-2.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Navbar = () => {
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData({
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);
  const location = useLocation();

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

  const handleShare = async () => {
    navigator.clipboard.writeText(`http://spark-tree.vercel.app`);
    showSuccessToast("link copied");
  };

  return (
    <div>
      <div className="navbar-container">
        {/* Header section with Greeting and Share button */}
        <div className="navbar-header">
          <h1 className="navbar-greeting">
            Hi, <span>{`${userData.firstname}  ${userData.lastname}`}!</span>
          </h1>
          <button className="navbar-share-btn" onClick={handleShare}>
            <img src={share} alt="" />
            <span>Share</span>
          </button>
        </div>

        <p className="navbar-subtext">
          Congratulations. You got a great response today.
        </p>
      </div>
    </div>
  );
};

export default Navbar;
