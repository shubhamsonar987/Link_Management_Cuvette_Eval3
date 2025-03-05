import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/navbar/Naavbar";
import lastlogo from "../../assets/components/Auto Layout Horizontal.png";
import grid from "../../assets/components/Group 1171274800.png";
import Carousel from "../../assets/components/Group 1171274799.png";
import stack from "../../assets/components/Group 1171274801.png";
import "./Appearence.css";
import styleArray from "../../components/array of style/styleArray";
import axios from "axios";
import insagram from "../../assets/icons/icons8-instagram-48.png";
import youtube from "../../assets/icons/icons8-youtube-48.png";
import xpng from "../../assets/icons/icons8-twitter-50.png";
import facebook from "../../assets/icons/icons8-facebook-logo-48.png";
import WooCommerce from "../../assets/icons/icons8-woocommerce-24.png";
import BigCommerce from "../../assets/icons/icons8-bigcommerce-48.png";
import shopify from "../../assets/icons/icons8-shopify-48.png";
import magento from "../../assets/icons/magento-icon.png";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const Appearence = () => {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [tempButtonColor, setTempButtonColor] = useState(buttonColor);
  const [tempButtonTextColor, setTempButtonTextColor] =
    useState(buttonTextColor);
  const [selected, setSelected] = useState("colopatlet3");
  const [frameStyle, setFrameStyle] = useState(styleArray["colopatlet3"]);
  const [selectedTheme, setSelectedTheme] = useState("Themecont1");
  const [frameBgColor, setFrameBgColor] = useState("#ffffff");
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const [selectedFont, setSelectedFont] = useState("DM Sans");
  const [userData, setUserData] = useState("");
  const [banner, setBanner] = useState("");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [showModal, setShowModal] = useState(false);

  // Button groups
  const buttonGroups = [
    { label: "Fill", buttons: ["colopatlet1", "colopatlet2", "colopatlet3"] },
    {
      label: "Outline",
      buttons: ["colopatlet4", "colopatlet5", "colopatlet6"],
    },
    {
      label: "Hard shadow",
      buttons: ["colopatlet7", "colopatlet8", "colopatlet9"],
    },
    {
      label: "Soft shadow",
      buttons: ["colopatlet10", "colopatlet11", "colopatlet12"],
    },
    {
      label: "Special",
      buttons: [
        "colopatlet13",
        "colopatlet14",
        "colopatlet15",
        "colopatlet16",
        "colopatlet17",
        "colopatlet18",
      ],
    },
  ];
  const themeMapping = {
    white: "Themecont1",
    "#E0E2D9": "Themecont2",
    "#272d2f": "Themecont3",
    black: "Themecont4",
    "#e4f5fe": "Themecont5",
    "#e5f9ef": "Themecont6",
    "#fcefe3": "Themecont7",
  };

  const appIcon = [
    { application: "Instagram", value: insagram },
    { application: "YouTube", value: youtube },
    { application: "Facebook", value: facebook },
    { application: "Twitter", value: xpng },
    { application: "Shopify", value: shopify },
    { application: "WooCommerce", value: WooCommerce },
    { application: "BigCommerce", value: BigCommerce },
    { application: "Magento", value: magento },
  ];

  const handleButtonClick = (button) => {
    setSelected(button);
    let style = {
      ...styleArray[button],
      backgroundColor: buttonColor,
      color: buttonTextColor,
      fontFamily: selectedFont,
    };
    if (
      button.includes("colopatlet1") ||
      button.includes("colopatlet2") ||
      button.includes("colopatlet3")
    ) {
      style.border = "2px solid " + buttonTextColor;
      style.backgroundColor = buttonColor;
      style.borderRadius = button.includes("colopatlet3")
        ? "2rem"
        : button.includes("colopatlet2")
        ? "1rem"
        : "0rem";
    }
    if (
      button.includes("colopatlet4") ||
      button.includes("colopatlet5") ||
      button.includes("colopatlet6")
    ) {
      style.border = "2px solid " + buttonTextColor;
      style.backgroundColor = "transparent";
      style.borderRadius = button.includes("colopatlet6")
        ? "2rem"
        : button.includes("colopatlet5")
        ? "1rem"
        : "0rem";
    }

    if (
      button.includes("colopatlet7") ||
      button.includes("colopatlet8") ||
      button.includes("colopatlet9")
    ) {
      style.boxShadow = "6px 6px 0px rgba(0, 0, 0, 1)";
      style.borderRadius = button.includes("colopatlet9")
        ? "2rem"
        : button.includes("colopatlet8")
        ? "1rem"
        : "0rem";
    }
    if (
      button.includes("colopatlet10") ||
      button.includes("colopatlet11") ||
      button.includes("colopatlet12")
    ) {
      style.boxShadow = "6px 6px 0px rgba(0, 0, 0, 0.3)";
      style.borderRadius =
        button.includes("colopatlet12") || button.includes("colopatlet12")
          ? "2rem"
          : button.includes("colopatlet11")
          ? "1rem"
          : "0rem";
    }
    if (button.includes("colopatlet13") || button.includes("colopatlet14")) {
      style.clipPath =
        "polygon(0% 10%, 5% 0%, 10% 8%, 15% 2%, 20% 6%, 25% 0%, 30% 6%, 35% 2%, 40% 10%, 45% 4%, 50% 6%, 55% 2%, 60% 10%, 65% 0%, 70% 8%, 75% 2%, 80% 6%, 85% 0%, 90% 8%, 95% 2%, 100% 10%, 100% 90%, 95% 100%, 90% 92%, 85% 100%, 80% 94%, 75% 100%, 70% 92%, 65% 100%, 60% 94%, 55% 100%, 50% 92%, 45% 100%, 40% 94%, 35% 100%, 30% 92%, 25% 100%, 20% 94%, 15% 100%, 10% 92%, 5% 100%, 0% 90%)";
    }

    if (button.includes("colopatlet15")) {
      style.border = "1px solid black";
    }

    if (button.includes("colopatlet16")) {
      style.borderRadius = "2rem";
    }
    if (button.includes("colopatlet17")) {
      style.position = "relative";
      style.border = "2px solid black";
    }

    if (button.includes("colopatlet18")) {
      style.borderRadius = "2rem 0px 0px 2rem";
    }
    setFrameStyle(style);
  };

  const handleButtonColorChange = (e) => {
    setButtonColor(e.target.value);
    setTempButtonColor(e.target.value);
    setFrameStyle((prevStyle) => ({
      ...prevStyle,
      backgroundColor: e.target.value,
    }));
  };

  const handleButtonTextColorChange = (e) => {
    setButtonTextColor(e.target.value);
    setTempButtonTextColor(e.target.value);
    setFrameStyle((prevStyle) => ({ ...prevStyle, color: e.target.value }));
  };

  useEffect(() => {
    if (selected && styleArray[selected]) {
      setFrameStyle({
        ...styleArray[selected],
        backgroundColor: buttonColor,
        color: buttonTextColor,
        fontFamily: selectedFont,
      });
    }
  }, [selected, buttonColor, buttonTextColor, selectedFont]);

  const handleFontChange = (e) => {
    setFrameStyle((prevStyle) => ({
      ...prevStyle,
      fontFamily: e.target.value,
    }));
  };
  const handleThemeChange = (themeClass) => {
    setSelectedTheme(themeClass);
    const themeElement = document.querySelector(`.${themeClass}`);
    if (themeElement) {
      const computedStyle = window.getComputedStyle(themeElement);
      setFrameBgColor(computedStyle.backgroundColor);
    }
  };

  // Fetch Appearance Settings from Backend
  const fetchAppearanceSettings = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/appearance`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.appearance) {
        const { layout, button, button_text, font, fontcolor, themes } =
          response.data.appearance;

        setSelectedLayout(layout);
        setSelected(button);
        setButtonColor(button_text);
        setButtonTextColor(fontcolor);
        setSelectedFont(font);
        setSelectedTheme(themeMapping[themes] || "Themecont1");

        // Ensure styles are applied properly
        let newFrameStyle = {
          ...(styleArray[button] || {}),
          backgroundColor: button_text,
          color: fontcolor,
          fontFamily: font,
        };

        // Apply border and shadow based on button style
        if (
          button.includes("colopatlet1") ||
          button.includes("colopatlet2") ||
          button.includes("colopatlet3")
        ) {
          newFrameStyle.border = "2px solid " + fontcolor;
          newFrameStyle.borderRadius = button.includes("colopatlet3")
            ? "2rem"
            : button.includes("colopatlet2")
            ? "1rem"
            : "0rem";
        }
        if (
          button.includes("colopatlet4") ||
          button.includes("colopatlet5") ||
          button.includes("colopatlet6")
        ) {
          newFrameStyle.border = "2px solid " + buttonTextColor;
          newFrameStyle.backgroundColor = "transparent";
          newFrameStyle.borderRadius = button.includes("colopatlet6")
            ? "2rem"
            : button.includes("colopatlet5")
            ? "1rem"
            : "0rem";
        }

        if (
          button.includes("colopatlet7") ||
          button.includes("colopatlet8") ||
          button.includes("colopatlet9")
        ) {
          newFrameStyle.boxShadow = "6px 6px 0px rgba(0, 0, 0, 1)";
          newFrameStyle.borderRadius = button.includes("colopatlet9")
            ? "2rem"
            : button.includes("colopatlet8")
            ? "1rem"
            : "0rem";
        }
        if (
          button.includes("colopatlet10") ||
          button.includes("colopatlet11") ||
          button.includes("colopatlet12")
        ) {
          newFrameStyle.boxShadow = "6px 6px 0px rgba(0, 0, 0, 0.3)";
          newFrameStyle.borderRadius =
            button.includes("colopatlet12") || button.includes("colopatlet12")
              ? "2rem"
              : button.includes("colopatlet11")
              ? "1rem"
              : "0rem";
        }
        if (
          button.includes("colopatlet13") ||
          button.includes("colopatlet14")
        ) {
          newFrameStyle.clipPath =
            "polygon(0% 10%, 5% 0%, 10% 8%, 15% 2%, 20% 6%, 25% 0%, 30% 6%, 35% 2%, 40% 10%, 45% 4%, 50% 6%, 55% 2%, 60% 10%, 65% 0%, 70% 8%, 75% 2%, 80% 6%, 85% 0%, 90% 8%, 95% 2%, 100% 10%, 100% 90%, 95% 100%, 90% 92%, 85% 100%, 80% 94%, 75% 100%, 70% 92%, 65% 100%, 60% 94%, 55% 100%, 50% 92%, 45% 100%, 40% 94%, 35% 100%, 30% 92%, 25% 100%, 20% 94%, 15% 100%, 10% 92%, 5% 100%, 0% 90%)";
        }

        if (button.includes("colopatlet15")) {
          newFrameStyle.border = "1px solid black";
        }

        if (button.includes("colopatlet16")) {
          newFrameStyle.borderRadius = "2rem";
        }
        if (button.includes("colopatlet17")) {
          newFrameStyle.position = "relative";
          newFrameStyle.border = "2px solid black";
        }

        if (button.includes("colopatlet18")) {
          newFrameStyle.borderRadius = "2rem 0px 0px 2rem";
        }

        setFrameStyle(newFrameStyle);
        setFrameBgColor(themes);
      }
    } catch (error) {
      console.error("Error fetching appearance settings:", error);
    }
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

  // Save Appearance to Backend
  const handleSaveAppearance = async () => {
    const reverseThemeMapping = Object.entries(themeMapping).reduce(
      (acc, [key, value]) => ({ ...acc, [value]: key }),
      {}
    );

    const appearanceData = {
      layout: selectedLayout,
      button: selected,
      button_text: buttonColor, // FIXED: Sending buttonColor instead of buttonTextColor
      font: selectedFont,
      fontcolor: buttonTextColor, // This correctly sends font color
      themes: reverseThemeMapping[selectedTheme] || "Air Snow",
    };

    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/appearance`,
        appearanceData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      showSuccessToast("Appearance updated!");
    } catch (error) {
      showErrorToast("Error updating appearance:", error);
    }
  };

  const handleLayoutChange = (layout) => {
    setSelectedLayout(layout);
  };

  useEffect(() => {
    const fetchuserDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from local storage
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchLinks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/link/linkdetails`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200 && response.data.data) {
          const fetchedData = response.data.data;
          setBanner(fetchedData.banner);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchAppearanceSettings();
    fetchuserDetails();
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/link/linkdetails`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 && response.data.data) {
        const fetchedData = response.data.data;
        setLinks(fetchedData.link || []);
        setShops(fetchedData.shop || []);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1023);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClick = () => {
    if (isMobile) {
      setShowModal(true);
    }
  };

  const handleClose = () => setShowModal(false);

  return (
    <div className="container1">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content-wrapper">
          <div
            className="frame-section"
            style={{ width: selectedLayout === "Carousel" ? "440px" : "auto" }}
          >
            <div className="frame" style={{ backgroundColor: frameBgColor }}>
              <div
                className="frame-username"
                style={{ backgroundColor: banner }}
              >
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt="Avatar"
                  className="frame-img"
                />
                <h2 style={{ color: buttonTextColor }}>@{userData.username}</h2>
              </div>

              <div className="frame-buttons">
                {["Link", "Shop"].map((tab) => (
                  <button
                    key={tab}
                    className={`tab-btn ${selectedTab === tab ? "active" : ""}`}
                    onClick={() => setSelectedTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="content1">
                {selectedTab === "Link" ? (
                  <div
                    className="frame-links"
                    style={{
                      display: selectedLayout === "grid" ? "grid" : "flex",
                      gridTemplateColumns:
                        selectedLayout === "grid" ? "1fr 1fr" : "unset",
                      flexDirection:
                        selectedLayout === "Carousel" ? "row" : "column",
                      height:
                        selectedLayout === "grid"
                          ? "150%"
                          : selectedLayout === "Carousel"
                          ? "100%"
                          : "",
                      width: selectedLayout === "Carousel" ? "35rem" : "",
                    }}
                  >
                    {links.length > 0 ? (
                      links.map((link) => (
                        <div
                          key={link._id}
                          className="frame-link"
                          style={{
                            ...frameStyle,
                            ...(["grid", "Carousel"].includes(
                              selectedLayout
                            ) && {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height:
                                selectedLayout === "grid"
                                  ? "8rem"
                                  : selectedLayout === "Carousel"
                                  ? "100%"
                                  : "",
                              width: "90%",
                              flexDirection: "column",
                            }),
                          }}
                        >
                          <span className="frame-icon">
                            <img
                              src={
                                appIcon.find(
                                  (icon) =>
                                    icon.application === link.application
                                )?.value
                              }
                              alt={link.application}
                            />
                          </span>

                          <span
                            style={{
                              textAlign: ["grid", "Carousel"].includes(
                                selectedLayout
                              )
                                ? "center"
                                : "left",
                            }}
                          >
                            {link.linktitle}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No links available</p>
                    )}
                  </div>
                ) : (
                  <div
                    className="frame-links"
                    style={{
                      display: selectedLayout === "grid" ? "grid" : "flex",
                      gridTemplateColumns:
                        selectedLayout === "grid" ? "1fr 1fr" : "unset",
                      flexDirection:
                        selectedLayout === "Carousel" ? "row" : "column",
                      height: selectedLayout === "Carousel" ? "100%" : "",
                      width: selectedLayout === "Carousel" ? "35rem" : "",
                    }}
                  >
                    {shops.length > 0 ? (
                      shops.map((shop) => (
                        <div
                          key={shop._id}
                          className="frame-link"
                          onClick={() => window.open(shop.shopurl, "_blank")}
                          style={{
                            ...frameStyle,
                            ...(["grid", "Carousel"].includes(
                              selectedLayout
                            ) && {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height:
                                selectedLayout === "grid"
                                  ? "8rem"
                                  : selectedLayout === "Carousel"
                                  ? "100%"
                                  : "",
                              width: "100%",
                              flexDirection: "column",
                            }),
                          }}
                        >
                          <span className="frame-icon">
                            <img
                              src={
                                appIcon.find(
                                  (icon) =>
                                    icon.application === shop.application
                                )?.value
                              }
                              alt={shop.application}
                            />
                          </span>

                          <span
                            style={{
                              textAlign: ["grid", "Carousel"].includes(
                                selectedLayout
                              )
                                ? "center"
                                : "left",
                            }}
                          >
                            {shop.shopname}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p>No shops available</p>
                    )}
                  </div>
                )}
              </div>

              <button className="get-connected">Get Connected</button>

              <div className="last-logo">
                <img src={lastlogo} alt="Logo" />
              </div>
            </div>
          </div>

          {isMobile && showModal && (
            <>
              <div
                className="frame-sections"
                style={{
                  width: selectedLayout === "Carousel" ? "440px" : "auto",
                }}
              >
                <div
                  className="frame"
                  style={{ backgroundColor: frameBgColor }}
                >
                  <div
                    className="frame-username"
                    style={{ backgroundColor: banner }}
                  >
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="Avatar"
                      className="frame-img"
                    />
                    <h2 style={{ color: buttonTextColor }}>
                      @{userData.username}
                    </h2>
                  </div>

                  <div className="frame-buttons">
                    {["Link", "Shop"].map((tab) => (
                      <button
                        key={tab}
                        className={`tab-btn ${
                          selectedTab === tab ? "active" : ""
                        }`}
                        onClick={() => setSelectedTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="content1">
                    {selectedTab === "Link" ? (
                      <div
                        className="frame-links"
                        style={{
                          display: selectedLayout === "grid" ? "grid" : "flex",
                          gridTemplateColumns:
                            selectedLayout === "grid" ? "1fr 1fr" : "unset",
                          flexDirection:
                            selectedLayout === "Carousel" ? "row" : "column",
                          height:
                            selectedLayout === "grid"
                              ? "150%"
                              : selectedLayout === "Carousel"
                              ? "100%"
                              : "",
                          width: selectedLayout === "Carousel" ? "35rem" : "",
                        }}
                      >
                        {links.length > 0 ? (
                          links.map((link) => (
                            <div
                              key={link._id}
                              className="frame-link"
                              style={{
                                ...frameStyle,
                                ...(["grid", "Carousel"].includes(
                                  selectedLayout
                                ) && {
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height:
                                    selectedLayout === "grid"
                                      ? "8rem"
                                      : selectedLayout === "Carousel"
                                      ? "100%"
                                      : "",
                                  width: "100%",
                                  flexDirection: "column",
                                }),
                              }}
                            >
                              <span className="frame-icon">
                                <img
                                  src={
                                    appIcon.find(
                                      (icon) =>
                                        icon.application === link.application
                                    )?.value
                                  }
                                  alt={link.application}
                                />
                              </span>

                              <span
                                style={{
                                  textAlign: ["grid", "Carousel"].includes(
                                    selectedLayout
                                  )
                                    ? "center"
                                    : "left",
                                }}
                              >
                                {link.linktitle}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p>No links available</p>
                        )}
                      </div>
                    ) : (
                      <div
                        className="frame-links"
                        style={{
                          display: selectedLayout === "grid" ? "grid" : "flex",
                          gridTemplateColumns:
                            selectedLayout === "grid" ? "1fr 1fr" : "unset",
                          flexDirection:
                            selectedLayout === "Carousel" ? "row" : "column",
                          height: selectedLayout === "Carousel" ? "100%" : "",
                          width: selectedLayout === "Carousel" ? "35rem" : "",
                        }}
                      >
                        {shops.length > 0 ? (
                          shops.map((shop) => (
                            <div
                              key={shop._id}
                              className="frame-link"
                              onClick={() =>
                                window.open(shop.shopurl, "_blank")
                              }
                              style={{
                                ...frameStyle,
                                ...(["grid", "Carousel"].includes(
                                  selectedLayout
                                ) && {
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  height:
                                    selectedLayout === "grid"
                                      ? "8rem"
                                      : selectedLayout === "Carousel"
                                      ? "100%"
                                      : "",
                                  width: "100%",
                                  flexDirection: "column",
                                }),
                              }}
                            >
                              <span className="frame-icon">
                                <img
                                  src={
                                    appIcon.find(
                                      (icon) =>
                                        icon.application === shop.application
                                    )?.value
                                  }
                                  alt={shop.application}
                                />
                              </span>

                              <span
                                style={{
                                  textAlign: ["grid", "Carousel"].includes(
                                    selectedLayout
                                  )
                                    ? "center"
                                    : "left",
                                }}
                              >
                                {shop.shopname}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p>No shops available</p>
                        )}
                      </div>
                    )}
                  </div>

                  <button className="get-connected">Get Connected</button>

                  <div className="last-logo">
                    <img src={lastlogo} alt="Logo" />
                  </div>
                </div>
              </div>
              <button className="people" onClick={handleClose}>
                x
              </button>
            </>
          )}

          <div className="profile-container">
            <button className="open-frame" onClick={handleClick}>
              <i className="ri-eye-line"></i> Preview
            </button>
            <div className="layout">
              <label className="nameoflay">Layout</label>
              <div className="layout-buttons">
                <button
                  className={`layoutbtn ${
                    selectedLayout === "stack" ? "active-layout" : ""
                  }`}
                  onClick={() => handleLayoutChange("stack")}
                >
                  <img className="layoutimg" src={stack} />
                  Stack
                </button>
                <button
                  className={`layoutbtn ${
                    selectedLayout === "grid" ? "active-layout" : ""
                  }`}
                  onClick={() => handleLayoutChange("grid")}
                >
                  <img className="layoutimg" src={grid} />
                  Grid
                </button>
                <button
                  className={`layoutbtn ${
                    selectedLayout === "Carousel" ? "active-layout" : ""
                  }`}
                  onClick={() => handleLayoutChange("Carousel")}
                >
                  <img className="layoutimg" src={Carousel} />
                  Carousel
                </button>
              </div>
            </div>
            <div className="buttonbg">
              <p className="nameoflay1">Buttons</p>
              <div className="buttons">
                <div className="buttons">
                  {buttonGroups.map((group, index) => (
                    <div
                      key={index}
                      className={`layout-buttons${
                        group.label === "Special" ? "12" : "1"
                      }`}
                    >
                      <p>{group.label}</p>
                      <div
                        className={
                          group.label === "Special"
                            ? "layout-buttons3"
                            : "layout-buttons2"
                        }
                      >
                        {group.buttons.map((button) => (
                          <button
                            key={button}
                            className={`${button} ${
                              selected === button ? "selected" : ""
                            }`}
                            onClick={() => handleButtonClick(button)}
                          >
                            {button.includes("colopatlet") ? "" : ""}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="Button-color">
                  <p>Button color</p>
                  <div className="buttonconts1">
                    <input
                      className="inputofcolor"
                      type="color"
                      value={buttonColor}
                      onChange={handleButtonColorChange}
                    />
                    <div className="bucont">
                      <p className="butext">Button color</p>
                      <input
                        type="text"
                        className="buinp"
                        value={buttonColor}
                        onChange={handleButtonColorChange}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
                <div className="Button-color">
                  <p>Button font color</p>
                  <div className="buttonconts1">
                    <input
                      className="inputofcolor"
                      type="color"
                      value={buttonTextColor}
                      onChange={handleButtonTextColorChange}
                    />
                    <div className="bucont">
                      <p className="butext">Button font color</p>
                      <input
                        type="text"
                        className="buinp"
                        value={buttonTextColor}
                        onChange={handleButtonTextColorChange}
                        placeholder="#FFFFFF"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="Fonts-style">
              <label>Fonts</label>
              <div className="fontcont">
                <h5 style={{ marginLeft: "0.8rem" }}>Font</h5>
                <div className="fontscontainer">
                  <div className="fonttext" style={{ buttonTextColor }}>
                    Aa
                  </div>
                  <select className="fontinput" onChange={handleFontChange}>
                    <option value="DM Sans">DM Sans</option>
                    <option value="Arial">Arial</option>
                    <option value="Poppins">Poppins</option>
                  </select>
                </div>
                <div className="fontcont1">
                  <h5
                    style={{
                      marginLeft: "1rem",
                      marginTop: "1rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    Color
                  </h5>
                  <div className="fontscontainers">
                    {/* Color Picker */}
                    <input
                      className="inputofcolor"
                      type="color"
                      value={buttonTextColor}
                      onChange={handleButtonTextColorChange}
                    />
                    <div className="bucont">
                      <p className="butext">Font color</p>
                      {/* Text Input */}
                      <input
                        type="text"
                        className="buinp"
                        value={buttonTextColor}
                        onChange={handleButtonTextColorChange}
                        placeholder="#000000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="Themes-cont">
              <label className="nameoflay">Themes</label>
              <div className="Themesdisplay">
                {Object.entries(themeMapping).map(([themeName, themeClass]) => (
                  <div className="buttonoftheme" key={themeClass}>
                    <button
                      className={`${themeClass} ${
                        selectedTheme === themeClass ? "selected-theme" : ""
                      }`}
                      onClick={() => handleThemeChange(themeClass)}
                    >
                      <span>&#9776;</span>
                    </button>
                    <span className="airg">{themeName}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="savestylecont">
              <button className="stylesave" onClick={handleSaveAppearance}>
                save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appearence;
