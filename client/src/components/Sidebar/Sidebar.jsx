import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import Logo from "../../assets/components/Group 1000000866.svg";
import "remixicon/fonts/remixicon.css";
import Linkimage from "../../assets/logo/Linkimage";
import Apperanceimage from "../../assets/logo/Apperance";
import Analiticsimage from "../../assets/logo/Analitics";
import Settingsimage from "../../assets/logo/Settingss";
import iconSignOut from "../../assets/components/circum_logout.png";

const Sidebar = () => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
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

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };
  const navigate = useNavigate();
  const signOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleCloseModal = (e) => {
    if (!e.target.closest(".profile-section")) {
      setShowModal(false);
    }
  };

  return (
    <div className="sidebar" onClick={handleCloseModal}>
      <img src={Logo} className="sidebar-logo " />

      <NavLink
        to="/links"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Linkimage
          className="icon"
          style={{ marginRight: windowWidth > 1023 ? "1rem" : "0" }}
        />
        <label>Links</label>
      </NavLink>

      <NavLink
        to="/appearance"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Apperanceimage />
        <label>Appearance</label>
      </NavLink>

      <NavLink
        to="/analytics"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Analiticsimage />

        <label>Analytics</label>
      </NavLink>

      <NavLink
        to="/settings"
        className={({ isActive }) =>
          isActive ? "menu-item active" : "menu-item"
        }
      >
        <Settingsimage />
        <label>Settings</label>
      </NavLink>

      {/* User Profile Section */}
      <div className="profile-section" onClick={handleModalToggle}>
        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt=""
          className="user-avatar"
        />
        <h4 className="username">{`${userData.firstname} ${userData.lastname}`}</h4>
      </div>

      {/* Sign-Out Modal */}
      {showModal && (
        <div className="modal">
          <button className="signout-button" onClick={signOut}>
            <img src={iconSignOut} alt="Sign Out" className="signout-icon" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
