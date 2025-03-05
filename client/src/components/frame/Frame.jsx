import { useState, useEffect } from "react";
import axios from "axios";
import styleArray from "../array of style/styleArray";
import lastlogo from "../../assets/components/Auto Layout Horizontal.png";
import { useParams } from "react-router-dom";
import insagram from "../../assets/icons/icons8-instagram-48.png";
import youtube from "../../assets/icons/icons8-youtube-48.png";
import xpng from "../../assets/icons/icons8-twitter-50.png";
import facebook from "../../assets/icons/icons8-facebook-logo-48.png";
import WooCommerce from "../../assets/icons/icons8-woocommerce-24.png";
import BigCommerce from "../../assets/icons/icons8-bigcommerce-48.png";
import shopify from "../../assets/icons/icons8-shopify-48.png";
import magento from "../../assets/icons/magento-icon.png";
import "./Frame.css";

const Frame = () => {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [frameStyle, setFrameStyle] = useState({});
  const [frameBgColor, setFrameBgColor] = useState("#ffffff");
  const [banner, setBanner] = useState("");
  const [userData, setUserData] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const { userId } = useParams();
  const [id, setId] = useState(null);

  useEffect(() => {
    if (userId && userId !== "null") {
      setId(userId);
    }
  }, [userId]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!id || id === "null") return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${id}`
        );
        console.log("User data fetched:", response.data.data);
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserDetails();
  }, [id]);

  useEffect(() => {
    if (!id || id === "null") return;
    const fetchAppearanceSettings = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appearance/${id}`
        );

        if (response.status === 200 && response.data.appearance) {
          const { layout, button, button_text, font, fontcolor, themes } =
            response.data.appearance;

          setButtonColor(button_text || "#000000");
          setButtonTextColor(fontcolor || "#FFFFFF");
          setSelectedFont(font || "Arial");
          setSelectedLayout(layout);

          // Update styles
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

    const fetchLinks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/link/linkdetails/${id}`
        );

        console.log("Link details response:", response.data);

        if (response.status === 200 && Array.isArray(response.data.data)) {
          const fetchedData = response.data.data[0];
          setLinks(fetchedData.link || []);
          setShops(fetchedData.shop || []);
          setBanner(fetchedData.banner);
        }
      } catch (error) {
        console.error("Error fetching links:", error);
      }
    };

    fetchAppearanceSettings();
    fetchLinks();
  }, [id]);

  const getDeviceInfo = async () => {
    const userAgent = navigator.userAgent;
    let os = "Unknown OS";

    if (userAgent.indexOf("Win") !== -1) os = "Windows";
    if (userAgent.indexOf("Mac") !== -1) os = "MacOS";
    if (userAgent.indexOf("X11") !== -1) os = "UNIX";
    if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    if (userAgent.indexOf("Android") !== -1) os = "Android";
    if (userAgent.indexOf("like Mac") !== -1) os = "iOS";

    const ipResponse = await axios.get("https://api64.ipify.org?format=json");
    const ipAddress = ipResponse.data.ip;

    return { os, ipAddress };
  };

  const handleTabClick = async (tabName) => {
    setSelectedTab(tabName);

    try {
      const deviceInfo = await getDeviceInfo();
      const token = localStorage.getItem("token");

      if (!id) {
        return;
      }

      // ✅ Send a default `itemId` and `application` for tab clicks
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/track/click`,
        {
          userId: id, // Ensure user ID is sent
          itemId: "tabClick", // Use a dummy ID for tab clicks
          type: tabName.toLowerCase(), // Ensure lowercase ("link" or "shop")
          application: "Tab Click", // Provide a default application name
          os: deviceInfo.os,
          ip: deviceInfo.ipAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error tracking click:", error);
    }
  };

  const handleCTA = async () => {
    try {
      const deviceInfo = await getDeviceInfo();
      const token = localStorage.getItem("token");

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/track/cta-click`,
        {
          userId: id, // ✅ Current user ID
          ip: deviceInfo.ipAddress, // ✅ User IP
          os: deviceInfo.os, // ✅ Device OS
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.error("Error tracking CTA click:", error);
    }
  };

  const handleRedirect = async (item, type) => {
    try {
      if (!id) {
        console.error("User ID is missing!");
        return;
      }

      const deviceInfo = await getDeviceInfo();
      const token = localStorage.getItem("token");

      let url = item.shopurl || item.linkurl;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = `https://${url}`;
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/track/click`,
        {
          userId: id, // Use correct user ID
          itemId: item._id, // **Yeh NULL ya UNDEFINED ho sakta hai**
          type,
          application: item.application,
          os: deviceInfo.os,
          ip: deviceInfo.ipAddress,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.open(url, "_blank");
    } catch (error) {
      console.error("Error tracking click:", error);
    }
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

  return (
    <div
      className="frame-sections"
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div className="frames" style={{ backgroundColor: frameBgColor }}>
        <div className="frame-username" style={{ backgroundColor: banner }}>
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
              onClick={() => {
                setSelectedTab(tab); // Switches tab
                handleTabClick(tab); // Tracks clicks
              }}
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
                flexDirection: selectedLayout === "Carousel" ? "row" : "column",
                height: selectedLayout === "Carousel" ? "100%" : "",
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
                      ...(["grid", "Carousel"].includes(selectedLayout) && {
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
                    onClick={() => handleRedirect(link, "link")}
                  >
                    <span className="frame-icon">
                      <img
                        src={
                          appIcon.find(
                            (icon) => icon.application === link.application
                          )?.value
                        }
                        alt={link.application}
                      />
                    </span>
                    <span
                      style={{
                        textAlign: ["grid", "Carousel"].includes(selectedLayout)
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
                flexDirection: selectedLayout === "Carousel" ? "row" : "column",
                height: selectedLayout === "Carousel" ? "100%" : "",
                width: selectedLayout === "Carousel" ? "35rem" : "",
              }}
            >
              {shops.length > 0 ? (
                shops.map((shop) => (
                  <div
                    key={shop._id}
                    className="frame-link"
                    onClick={async () => {
                      await handleRedirect(shop, "shop"); // Ensure tracking is recorded
                      window.open(
                        shop.shopurl.startsWith("http")
                          ? shop.shopurl
                          : `https://${shop.shopurl}`,
                        "_blank"
                      );
                    }}
                    style={{
                      ...frameStyle,
                      ...(["grid", "Carousel"].includes(selectedLayout) && {
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
                            (icon) => icon.application === shop.application
                          )?.value
                        }
                        alt={shop.application}
                      />
                    </span>
                    <span
                      style={{
                        textAlign: ["grid", "Carousel"].includes(selectedLayout)
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

        <button className="get-connected" onClick={handleCTA}>
          Get Connected
        </button>
        <div className="last-logo">
          <img src={lastlogo} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Frame;
