const express = require("express");
const Click = require("../models/click.model");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const Link = require("../models/link.model");
const User = require("../models/user.model");

router.post("/linkClick", async (req, res) => {
  try {
    const { linkId, os, ip } = req.body;

    // Find the user ID from the link
    const link = await Link.findById(linkId);
    if (!link) return res.status(404).json({ message: "Link not found" });

    const userId = link.userId; // Assuming each link has a userId field

    // ✅ Check if click already exists for this IP & linkId
    let existingClick = await Click.findOne({ linkId, ip });

    if (existingClick) {
      return res
        .status(200)
        .json({ message: "Click already recorded for this IP" });
    }

    // ✅ Store new click if not exists
    await Click.create({ linkId, userId, os, ip, count: 1 });

    res.status(200).json({ message: "Link click tracked successfully" });
  } catch (error) {
    console.error("Error tracking link click:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Track clicks on both Shops & Links
router.post("/click", async (req, res) => {
  try {
    const { userId, itemId, type, application, os, ip } = req.body;

    if (!userId || !ip) {
      return res.status(400).json({ message: "User ID and IP are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user ID" });
    }

    // ✅ Tab Click Handling (Now using string `itemId`)
    if (itemId === "tabClick") {
      const uniqueTabId = `${type}_tabClick`; // Now a string

      const existingTabClick = await Click.findOne({
        userId,
        itemId: uniqueTabId,
        ip,
      });

      if (existingTabClick) {
        return res.status(200).json({ message: "Tab click already recorded" });
      }

      await Click.create({
        userId,
        itemId: uniqueTabId, // ✅ Now a valid string, won't cause BSONError
        type,
        application,
        os,
        ip,
        count: 1,
      });

      return res
        .status(200)
        .json({ message: "Tab click tracked successfully" });
    }

    if (!itemId || itemId === "undefined") {
      return res.status(400).json({ message: "itemId is missing or invalid" });
    }

    try {
      await Click.create({
        userId,
        itemId,
        type,
        application,
        os,
        ip,
        count: 1,
      });
      return res.status(200).json({ message: "Click tracked successfully" });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(200)
          .json({ message: "Click already recorded for this user and IP" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error tracking click:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/cta-click", async (req, res) => {
  try {
    const { userId, ip, os } = req.body;

    if (!userId || !ip) {
      return res.status(400).json({ message: "User ID and IP are required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Invalid user ID" });
    }

    // ✅ Check if CTA click already recorded for this IP
    const existingCTA = await Click.findOne({ userId, type: "cta", ip });

    if (existingCTA) {
      return res.status(200).json({ message: "CTA click already recorded" });
    }

    // ✅ Store CTA click
    await Click.create({
      userId,
      itemId: "ctaButton",
      type: "cta",
      application: "Get Connected",
      os,
      ip,
      count: 1,
    });

    return res.status(200).json({ message: "CTA click tracked successfully" });
  } catch (error) {
    console.error("Error tracking CTA click:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/analytics", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request

    // Fetch clicks where the user owns the shop or link
    const analytics = await Click.find({ userId }).sort({ timestamp: -1 });

    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
