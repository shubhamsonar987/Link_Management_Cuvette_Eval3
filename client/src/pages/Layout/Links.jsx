import { useState, useEffect } from "react";
import "./Links.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/navbar/Naavbar";
import lastlogo from "../../assets/components/Auto Layout Horizontal.png";
import Shop from "../../assets/logo/Shop";
import LAdd from "../../assets/logo/LAdd";
import IconFire from "../../assets/components/Exclude.png";
import axios from "axios";
import styleArray from "../../components/array of style/styleArray";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import "../toastify.css";
import Switch from "../../components/Switch/Switch";
import { useNavigate } from "react-router-dom";
import insagram from "../../assets/icons/icons8-instagram-48.png";
import youtube from "../../assets/icons/icons8-youtube-48.png";
import xpng from "../../assets/icons/icons8-twitter-50.png";
import facebook from "../../assets/icons/icons8-facebook-logo-48.png";
import delete1 from "../../assets/icons/material-symbols-light_delete-outline.png";
import paste from "../../assets/components/Frame.svg";
import WooCommerce from "../../assets/icons/icons8-woocommerce-24.png";
import BigCommerce from "../../assets/icons/icons8-bigcommerce-48.png";
import shopify from "../../assets/icons/icons8-shopify-48.png";
import magento from "../../assets/icons/magento-icon.png";
import edit from "../../assets/icons/system-uicons_write.png";

function Links() {
  const [selectedTab, setSelectedTab] = useState("Link");
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [buttonColor, setButtonColor] = useState("#000000");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [frameStyle, setFrameStyle] = useState({});
  const [frameBgColor, setFrameBgColor] = useState("#ffffff");
  const [banner, setBanner] = useState("#342b26");
  const [modal, setModal] = useState(false);
  const [linktitle, setLinktitle] = useState("");
  const [linkurl, setLinkurl] = useState("");
  const [shoptitle, setShoptitle] = useState("");
  const [shopurl, setShopurl] = useState("");
  const [linkapplication, setLinkapplication] = useState("Instagram");

  const [shopapplication, setShopapplication] = useState("Shopify");
  const [userData, setUserData] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [bio, setBio] = useState("");
  const [selectedLayout, setSelectedLayout] = useState("stack");
  const [id, setId] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1023);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    const fetchAppearanceSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/appearance`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
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

    const fetchuserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.status === 200) {
          setUserData(response.data.data); // Store the user data
          setId(response.data.data._id); // Set the user ID properly
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAppearanceSettings();
    fetchuserDetails();
  }, []);

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
        setBanner(fetchedData.banner);
        setBio(fetchedData.bio);
        setId(fetchedData._id);
      }
    } catch (error) {
      console.error("Error fetching links:", error);
    }
  };
  useEffect(() => {
    fetchLinks();
  }, []);

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

  const handlesavelink = async (e) => {
    e.preventDefault();
    try {
      const url = editingItem
        ? `${
            import.meta.env.VITE_BACKEND_URL
          }/api/link/linkupdate/${editingItem}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/link/linkcreate`;

      const method = editingItem ? "put" : "post";

      const res = await axios[method](
        url,
        {
          link: {
            linktitle,
            linkurl,
            application: linkapplication,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status === 200) {
        setModal(false);
        setLinktitle("");
        setLinkurl("");
        setLinkapplication("");
        fetchLinks();
        showSuccessToast(
          editingItem
            ? "Link updated successfully"
            : "Link created successfully"
        );
        setEditingItem(null);
      } else {
        showErrorToast("link created unsuccessful");
      }
    } catch (error) {
      showErrorToast("Error saving data");
    }
  };

  const handlesaveshop = async (e) => {
    e.preventDefault();
    console.log("Sending Update Request for Shop ID:", editingItem);

    try {
      const url = editingItem
        ? `${
            import.meta.env.VITE_BACKEND_URL
          }/api/link/linkupdate/${editingItem}`
        : `${import.meta.env.VITE_BACKEND_URL}/api/link/linkcreate`;

      const method = editingItem ? "put" : "post";

      const res = await axios[method](
        url,
        {
          shop: {
            shopname: shoptitle,
            shopurl,
            application: shopapplication,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.status === 200) {
        setModal(false);
        setShoptitle("");
        setShopurl("");
        setShopapplication("");
        fetchLinks();
        showSuccessToast("Shop updated successfully");
        setEditingItem(null);
      } else {
        throw new Error("Failed to update shop");
      }
    } catch (error) {
      console.error("Error updating shop:", error);
      showErrorToast("Error updating shop");
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/link/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        fetchLinks();
        showSuccessToast("Deleted successfully");
      } else {
        showErrorToast("Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      showErrorToast("Error deleting");
    }
  };
  const handleshopclear = async () => {
    setShoptitle("");
    setShopurl("");
    setShopapplication("");
  };
  const hanlelinkclear = async () => {
    setLinktitle("");
    setLinkurl("");
    setLinkapplication("");
  };

  const handleEdit = (item) => {
    setModal(true);
    console.log("Editing Item ID set in frontend:", item._id);

    if (selectedTab === "Link") {
      setLinktitle(item.linktitle);
      setLinkurl(item.linkurl);
      setLinkapplication(item.application);
      setEditingItem(item._id); // Ensure correct ID is set
    } else {
      setShoptitle(item.shopname);
      setShopurl(item.shopurl);
      setShopapplication(item.application);
      setEditingItem(item._id); // Ensure correct ID is set
    }
  };

  const handlesavebio = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/link/updateBannerBio`,
        { bio, banner },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      if (res.status === 200) {
        fetchLinks();
        showSuccessToast("bio and banner updated successfully");
      } else {
        showErrorToast("click save once more to update/create");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      showErrorToast("error occured ! ", error);
    }
  };

  const handleTabClick = async (tabName) => {
    setSelectedTab(tabName);

    try {
      const deviceInfo = await getDeviceInfo();
      const token = localStorage.getItem("token");

      if (!id) {
        console.error("User ID is missing!");
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

      console.log("CTA Click Tracked!");
    } catch (error) {
      console.error("Error tracking CTA click:", error);
    }
  };

  const handleShare = async () => {
    navigator.clipboard.writeText(`http://spark-tree.vercel.app/frame/${id}`);
    showSuccessToast("link copied");
  };

  const handlePastelinks = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setLinkurl(clipboardText);
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };
  const handlePasteshop = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setShopurl(clipboardText);
    } catch (err) {
      console.error("Failed to paste:", err);
    }
  };

  const handleClick = () => {
    if (isMobile) {
      setShowModal(true);
    }
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1023);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleClose = () => setShowModal(false);
  return (
    <div className="container1">
      <Sidebar />
      <div className="main-content1">
        <Navbar />
        <div className="content-wrapper">
          <div
            className="frame-section"
            style={{ width: selectedLayout === "Carousel" ? "440px" : "auto" }}
          >
            <div className="frame" style={{ backgroundColor: frameBgColor }}>
              <div
                className="frame-username"
                style={{ backgroundColor: banner, position: "relative" }}
              >
                <button className="pastelinks" onClick={handleShare}>
                  <img src={paste} style={{ width: "1.5rem" }} />
                </button>
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
                      flexDirection:
                        selectedLayout === "Carousel" ? "row" : "column",
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
                          onClick={() => handleRedirect(link, "link")}
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

              <button className="get-connected" onClick={handleCTA}>
                Get Connected
              </button>

              <div className="last-logo">
                <img src={lastlogo} alt="" />
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
                  <button className="pastelinks" onClick={handleShare}>
                    <img src={paste} style={{ width: "1.5rem" }} />
                  </button>
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
                              onClick={() => handleRedirect(link, "link")}
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
            <label className="pcf">Profile</label>
            <div className="profile-box">
              <div className="profile-top">
                <div className="profile-imgs">
                  <img
                    src="https://www.w3schools.com/howto/img_avatar.png"
                    alt=""
                    className="profile-img"
                  />
                </div>
                <div className="profile-buttons">
                  <label className="custom-file-upload">
                    <input type="file" />
                    Pick an image
                  </label>
                  <button className="remove">Remove</button>
                </div>
              </div>
              <div className="profile-input">
                <label className="lable">Profile Title</label>
                <h4>@{userData.username}</h4>
              </div>
              <div className="profile-bio">
                <label className="lable">Bio</label>
                <textarea
                  className="textofbio"
                  value={bio}
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  placeholder="bio"
                ></textarea>
              </div>
            </div>

            <div className="add-link-container">
              <div className="add-link">
                <button
                  className={`add-btn ${
                    selectedTab === "Link" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("Link")}
                >
                  <LAdd />
                  Add Link
                </button>
                <button
                  className={`shop-btn ${
                    selectedTab === "Shop" ? "active" : ""
                  }`}
                  onClick={() => setSelectedTab("Shop")}
                >
                  <Shop />
                  Add Shop
                </button>
              </div>

              <button
                className="full-width"
                onClick={() => {
                  setModal(!modal);
                }}
              >
                + Add {selectedTab}
              </button>
              <div className="content">
                {selectedTab === "Link" && links.length > 0 && (
                  <ul
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    {links.map((link, index) => (
                      <li
                        className="liitems"
                        key={index}
                        style={{
                          backgroundColor: "#F3F3F1",
                          padding: "1rem 1rem 1rem 1.5rem",
                          borderRadius: "1rem",
                        }}
                      >
                        <div
                          className="titleslink"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <h5>
                            {link.linktitle}{" "}
                            <button
                              className="edits"
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                              onClick={() => handleEdit(link)}
                            >
                              <img src={edit} />
                            </button>
                          </h5>
                          <div>
                            <div className="toggle-switch">
                              <input
                                className="toggle-input"
                                id="toggle"
                                type="checkbox"
                                defaultChecked
                                disabled
                              />
                              <label
                                className="toggle-label"
                                htmlFor="toggle"
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            {link.linkurl}{" "}
                            <button
                              style={{
                                backgroundColor: "transparent",
                                border: "none",
                              }}
                              className="edits"
                              onClick={() => handleEdit(link)}
                            >
                              <img src={edit} />
                            </button>
                          </p>

                          <button
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            className="deletes"
                            onClick={() => {
                              handleDelete(link._id);
                            }}
                          >
                            <img src={delete1} style={{ width: "1.5rem" }} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {selectedTab === "Shop" && shops.length > 0 && (
                  <ul>
                    {shops.map((shop, index) => (
                      <li key={index}>
                        <h5>
                          {shop.shopname}{" "}
                          <button
                            className="edits"
                            onClick={() => handleEdit(shop)}
                          >
                            <img src={edit} />
                          </button>
                        </h5>
                        <div>
                          <div className="toggle-switch">
                            <input
                              className="toggle-input"
                              id="toggle"
                              type="checkbox"
                              defaultChecked
                              disabled
                            />
                            <label className="toggle-label" htmlFor="toggle" />
                          </div>
                        </div>
                        <h5>
                          {shop.shopurl}{" "}
                          <button
                            className="edits"
                            onClick={() => handleEdit(shop)}
                          >
                            <img src={edit} />
                          </button>
                        </h5>

                        <button
                          className="deletes"
                          onClick={() => {
                            handleDelete(shop._id);
                          }}
                        >
                          <img src={delete1} alt="" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            {modal && (
              <div className="modal-overlay" onClick={() => setModal(false)}>
                <div
                  className="modal-container"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Tab Buttons */}
                  <div className="modal-tabs">
                    <button
                      className={
                        selectedTab === "Link" ? "active-tab" : "add-link1"
                      }
                      onClick={() => setSelectedTab("Link")}
                    >
                      <LAdd />
                      Add Link
                    </button>
                    <button
                      className={
                        selectedTab === "Shop" ? "active-tab" : "add-shop1"
                      }
                      onClick={() => setSelectedTab("Shop")}
                    >
                      <Shop />
                      Add Shop
                    </button>
                  </div>

                  {/* Dynamic Content Based on Tab */}
                  {selectedTab === "Link" ? (
                    <div className="modal-container1">
                      <h4 style={{ margin: "0" }}>Enter URL</h4>
                      <input
                        type="text"
                        placeholder="Link title"
                        className="input-field1"
                        value={linktitle}
                        onChange={(e) => {
                          setLinktitle(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Link URL"
                        className="input-field1"
                        value={linkurl}
                        onChange={(e) => {
                          setLinkurl(e.target.value);
                        }}
                      />

                      <h3>Applications</h3>
                      <div className="app-icons">
                        <button
                          className="app-button"
                          style={{
                            border:
                              linkapplication === "Instagram"
                                ? "1px solid black"
                                : "none",
                          }}
                          onClick={() => {
                            setLinkapplication("Instagram");
                          }}
                        >
                          <img src={insagram} />{" "}
                        </button>
                        <button
                          style={{
                            border:
                              linkapplication === "Facebook"
                                ? "1px solid black"
                                : "none",
                          }}
                          className="app-button"
                          onClick={() => {
                            setLinkapplication("Facebook");
                          }}
                        >
                          <img src={facebook} />
                        </button>
                        <button
                          style={{
                            border:
                              linkapplication === "YouTube"
                                ? "1px solid black"
                                : "none",
                          }}
                          className="app-button"
                          onClick={() => {
                            setLinkapplication("YouTube");
                          }}
                        >
                          <img src={youtube} />
                        </button>
                        <button
                          style={{
                            border:
                              linkapplication === "Twitter"
                                ? "1px solid black"
                                : "none",
                          }}
                          className="app-button"
                          onClick={() => {
                            setLinkapplication("Twitter");
                          }}
                        >
                          <img src={xpng} />
                        </button>
                        <div
                          style={{
                            position: "absolute",
                            right: "16px",
                            top: "4rem",
                          }}
                          onClick={handlesavelink}
                        >
                          <div>
                            <div className="toggle-switch">
                              <input
                                className="toggle-input"
                                id="toggle"
                                type="checkbox"
                              />
                              <label
                                className="toggle-label"
                                htmlFor="toggle"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          className="delete"
                          style={{
                            position: "absolute",
                            top: "8rem",
                            right: "2px",
                          }}
                          onClick={hanlelinkclear}
                        >
                          <img src={delete1} />
                        </button>
                        <button
                          className="delete"
                          style={{
                            position: "absolute",
                            top: "8.3rem",
                            right: "2.5rem",
                          }}
                          onClick={handlePastelinks}
                        >
                          <img style={{ width: "1.5rem" }} src={paste} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="modal-container1">
                      <h4 style={{ margin: "0" }}>Enter URL</h4>
                      <input
                        type="text"
                        placeholder="Shop title"
                        className="input-field1"
                        value={shoptitle}
                        onChange={(e) => {
                          setShoptitle(e.target.value);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Shop URL"
                        value={shopurl}
                        className="input-field1"
                        onChange={(e) => {
                          setShopurl(e.target.value);
                        }}
                      />
                      <h3>Applications</h3>
                      <div className="app-icons">
                        <button
                          className="app-button"
                          onClick={() => setShopapplication("Shopify")}
                          style={{
                            border:
                              shopapplication === "Shopify"
                                ? "1px solid black"
                                : "none",
                          }}
                        >
                          <img src={shopify} />
                        </button>
                        <button
                          className="app-button"
                          onClick={() => setShopapplication("WooCommerce")}
                          style={{
                            border:
                              shopapplication === "WooCommerce"
                                ? "1px solid black"
                                : "none",
                          }}
                        >
                          <img src={WooCommerce} />
                        </button>
                        <button
                          className="app-button"
                          onClick={() => setShopapplication("BigCommerce")}
                          style={{
                            border:
                              shopapplication === "BigCommerce"
                                ? "1px solid black"
                                : "none",
                          }}
                        >
                          <img src={BigCommerce} />
                        </button>
                        <button
                          className="app-button"
                          onClick={() => setShopapplication("Magento")}
                          style={{
                            border:
                              shopapplication === "Magento"
                                ? "1px solid black"
                                : "none",
                          }}
                        >
                          <img src={magento} />
                        </button>

                        <div
                          style={{
                            position: "absolute",
                            right: "16px",
                            top: "4rem",
                          }}
                          onClick={handlesaveshop}
                        >
                          <div>
                            <div className="toggle-switch">
                              <input
                                className="toggle-input"
                                id="toggle"
                                type="checkbox"
                              />
                              <label
                                className="toggle-label"
                                htmlFor="toggle"
                              />
                            </div>
                          </div>
                        </div>

                        <button
                          className="delete"
                          style={{
                            position: "absolute",
                            top: "8.3rem",
                            right: "2.5rem",
                          }}
                          onClick={handlePasteshop}
                        >
                          <img style={{ width: "1.5rem" }} src={paste} />
                        </button>
                        <button
                          className="delete"
                          style={{
                            position: "absolute",
                            top: "8rem",
                            right: "2px",
                          }}
                          onClick={handleshopclear}
                        >
                          <img src={delete1} />
                        </button>
                      </div>
                    </div>
                  )}

                  <button
                    className="close-button"
                    onClick={() => setModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            <label>Banner</label>
            <div className="banner-container">
              <div className="banner" style={{ backgroundColor: banner }}>
                <img
                  src="https://www.w3schools.com/howto/img_avatar.png"
                  alt=""
                  className="frame-img"
                />
                <h4 style={{ color: buttonTextColor }}>@{userData.username}</h4>
                <h3 style={{ color: buttonTextColor }}>
                  <img
                    src={IconFire}
                    alt=""
                    style={{ width: "0.9rem", marginRight: "2px" }}
                  />{" "}
                  /{userData.username}
                </h3>
              </div>
              <label>Custom Background Color</label>
              <div className="color-options">
                <span
                  className="color dark"
                  style={{ backgroundColor: "#342b26" }}
                  onClick={() => {
                    setBanner("#342b26");
                  }}
                ></span>
                <span
                  className="color light"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid black",
                  }}
                  onClick={() => {
                    setBanner("#ffffff");
                  }}
                ></span>
                <span
                  className="color black"
                  style={{ backgroundColor: "black" }}
                  onClick={() => {
                    setBanner("#000000");
                  }}
                ></span>
              </div>
              <div className="color-input">
                <input
                  style={{
                    height: "2.5rem",
                    padding: "0",
                    borderRadius: "1rem",
                  }}
                  type="color"
                  value={banner}
                  onChange={(e) => {
                    setBanner(e.target.value);
                  }}
                />
                <input
                  type="text"
                  value={banner}
                  placeholder="#000000"
                  onChange={(e) => {
                    setBanner(e.target.value);
                  }}
                />
              </div>
            </div>
            <button className="save-btn" onClick={handlesavebio}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Links;
