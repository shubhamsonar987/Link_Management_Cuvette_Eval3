const mongoose = require("mongoose");
const Link = require("../models/link.model");

const authAnalytics = async (req, res, next) => {
  try {
    const { linkId } = req.params;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const userAgent = req.headers["user-agent"] || "Unknown";
    const referrer = req.headers.referer || "Direct";

    let device = "Unknown";
    if (/windows/i.test(userAgent)) device = "Desktop";
    else if (/android/i.test(userAgent)) device = "Mobile";
    else if (/iphone|ipad/i.test(userAgent)) device = "Mobile";
    else if (/mac/i.test(userAgent)) device = "Desktop";
    else if (/linux/i.test(userAgent)) device = "Desktop";

    // Ensure linkId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(linkId)) {
      return res.status(400).json({ message: "Invalid link ID" });
    }

    // Find the link
    const link = await Link.findOne({ "link._id": linkId });

    if (!link) {
      return res.status(404).json({ message: "Link not found" });
    }

    // Find the specific link inside the array
    const targetLink = link.link.find((l) => l._id.toString() === linkId);
    if (!targetLink) {
      return res.status(404).json({ message: "Target link not found" });
    }

    // Check if this IP + UserAgent already exists (prevent duplicate views)
    const existingView = targetLink.analytics.find(
      (entry) => entry.userIp === ip && entry.deviceType === device
    );

    if (!existingView) {
      // Add a new unique view
      targetLink.analytics.push({
        userIp: ip,
        deviceType: device,
        referrer,
        timestamp: new Date(),
      });
    }

    // Save updated link document
    await link.save();
    next();
  } catch (error) {
    console.error("Analytics Middleware Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = authAnalytics;
