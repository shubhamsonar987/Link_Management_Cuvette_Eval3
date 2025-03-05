import React, { useState } from "react";
import Frame from "../../assets/components/Frame-2.png";
import Logo from "../../assets/logo/Logo";
import "./UserPreference.css";
import axios from "axios";
import "../toastify.css";
import { useNavigate } from "react-router-dom";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const categories = [
  { id: 1, name: "Business", icon: "💼" },
  { id: 2, name: "Creative", icon: "🎨" },
  { id: 3, name: "Education", icon: "📚" },
  { id: 4, name: "Entertainment", icon: "🎬" },
  { id: 5, name: "Fashion & Beauty", icon: "👗" },
  { id: 6, name: "Food & Beverage", icon: "🍕" },
  { id: 7, name: "Government & Politics", icon: "🏛️" },
  { id: 8, name: "Health & Wellness", icon: "❤️" },
  { id: 9, name: "Non-Profit", icon: "💕" },
  { id: 10, name: "Other", icon: "✨" },
  { id: 11, name: "Tech", icon: "💻" },
  { id: 12, name: "Travel & Tourism", icon: "✈️" },
];

const UserPreference = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [usernameChange, setUsernameChange] = useState("");
  const navigate = useNavigate();

  const handleCategoryClick = (id, name) => {
    setSelectedCategory(name);
  };

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
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory || !usernameChange.trim()) {
      showErrorToast("Please enter a username and select a category.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/userpreference`,
        { selectedCategory, usernameChange },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        showSuccessToast("Successfully logged in");
        navigate("/links");
        window.location.reload();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      showErrorToast(errorMessage);
    }
  };

  return (
    <div className="mainss">
      <Logo />
      <div className="left-section">
        <div className="content">
          <h2 className="heading">Tell us about yourself</h2>
          <p className="subtext">For a personalized Spark experience</p>
          <input
            className="input-field"
            type="text"
            placeholder="Tell us your username"
            value={usernameChange}
            onChange={(e) => setUsernameChange(e.target.value)}
          />
          <label className="label">
            Select one category that best describes your Linktree:
          </label>

          <div className="categories-container">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id, cat.name)}
                className={`category-button ${
                  selectedCategory === cat.name ? "selected" : ""
                }`}
              >
                <span style={{ marginRight: "8px" }}>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          <button className="continue-button" onClick={handleSubmit}>
            Continue
          </button>
        </div>
      </div>

      <div className="container">
        <img src={Frame} className="image" alt="User Preference Image" />
      </div>
    </div>
  );
};

export default UserPreference;
