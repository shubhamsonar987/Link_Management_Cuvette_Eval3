const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const authAnalytics = require("../middleware/analytics.middleware");
const Link = require("../models/link.model");
const User = require("../models/user.model");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();
router.use(express.json());

router.post("/linkcreate", authMiddleware, async (req, res) => {
  const { bio, link, shop, banner } = req.body;

  try {
    const user = req.user.id;
    let existingLink = await Link.findOne({ user });

    if (existingLink) {
      if (bio) existingLink.bio = bio;
      if (banner) existingLink.banner = banner;

      if (link) {
        existingLink.link.push({
          linktitle: link.linktitle,
          linkurl: link.linkurl,
          application: link.application,
          analytics: [],
        });
      }

      if (shop) {
        existingLink.shop.push({
          shopname: shop.shopname,
          shopurl: shop.shopurl,
          application: shop.application,
          analytics: [],
        });
      }

      await existingLink.save();
      return res
        .status(200)
        .json({ message: "Link updated successfully", data: existingLink });
    } else {
      const newLink = new Link({
        username: req.user.username,
        bio,
        link: link
          ? [
              {
                linktitle: link.linktitle,
                linkurl: link.linkurl,
                application: link.application,
                analytics: [],
              },
            ]
          : [],
        shop: shop
          ? [
              {
                shopname: shop.shopname,
                shopurl: shop.shopurl,
                application: shop.application,
                analytics: [],
              },
            ]
          : [],
        banner,
        user,
      });

      await newLink.save();
      return res
        .status(201)
        .json({ message: "Link created successfully", data: newLink });
    }
  } catch (error) {
    console.error("Error creating/updating link:", error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
});

// Get User's Link Details
router.get("/linkdetails", authMiddleware, async (req, res) => {
  try {
    const link = await Link.findOne({ user: req.user.id });

    if (!link) {
      return res.status(404).json({ message: "Link details not found" });
    }

    res.status(200).json({ message: "Link details fetched", data: link });
  } catch (error) {
    console.error("Error fetching link details:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});

// Update Link
router.put("/linkupdate/:id", authMiddleware, async (req, res) => {
  const { bio, link, shop, banner } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }
    const linkId = new mongoose.Types.ObjectId(req.params.id);

    let existingLink = await Link.findOne({
      $or: [{ "link._id": linkId }, { "shop._id": linkId }],
      user: req.user.id,
    });

    if (!existingLink) {
      return res
        .status(404)
        .json({ message: "Link or Shop details not found in database" });
    }

    // Update the specific `link` inside `link[]`
    if (link) {
      existingLink.link = existingLink.link.map((l) =>
        l._id.toString() === req.params.id ? { ...l, ...link } : l
      );
    }

    // Update the specific `shop` inside `shop[]`
    if (shop) {
      existingLink.shop = existingLink.shop.map((s) =>
        s._id.toString() === req.params.id ? { ...s, ...shop } : s
      );
    }

    await existingLink.save();

    res.status(200).json({
      message: "Link or Shop details updated successfully",
      data: existingLink,
    });
  } catch (error) {
    console.error("Error updating link/shop details:", error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
});

// Update Banner and Bio
router.put("/updateBannerBio", authMiddleware, async (req, res) => {
  const { bio, banner } = req.body;
  if (!bio && !banner) {
    return res.status(400).json({ message: "Bio or Banner is required" });
  }

  try {
    const user = req.user._id; // ✅ Ensure user ID is available

    let existingLink = await Link.findOne({ user });
    console.log("✅ Found Link Document:", existingLink);

    if (!existingLink) {
      console.log("🚀 No existing document found. Creating a new one...");

      // ✅ Ensure the `username` field is included
      const newLink = new Link({
        user,
        username: req.user.username, // ✅ Make sure `username` is provided
        bio: bio || "",
        banner: banner || "",
        link: [],
        shop: [],
      });

      await newLink.save();
      return res.status(201).json({
        message: "Banner and Bio created successfully",
        data: newLink,
      });
    }

    // ✅ Update existing document
    existingLink.bio = bio || existingLink.bio;
    existingLink.banner = banner || existingLink.banner;
    await existingLink.save();

    res.status(200).json({
      message: "Banner and Bio updated successfully",
      data: existingLink,
    });
  } catch (error) {
    console.error("❌ Error updating banner and bio:", error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
});

// Delete Link or Shop
router.delete("/delete/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;

  try {
    const user = req.user.id;
    let existingLink = await Link.findOne({ user });

    if (!existingLink) {
      return res.status(404).json({ message: "Link details not found" });
    }

    existingLink.link = existingLink.link.filter(
      (l) => l._id.toString() !== id
    );
    existingLink.shop = existingLink.shop.filter(
      (s) => s._id.toString() !== id
    );

    await existingLink.save();
    res.status(200).json({
      message: "Link or Shop deleted successfully",
      data: existingLink,
    });
  } catch (error) {
    console.error("Error deleting link or shop:", error);
    res.status(400).json({ message: error.message || "An error occurred" });
  }
});

router.get("/linkdetails/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const links = await Link.find({ user: userId });

    if (!links || links.length === 0) {
      return res.status(404).json({ message: "Link details not found" });
    }

    res.status(200).json({ message: "Link details fetched", data: links });
  } catch (error) {
    console.error("Error fetching link details:", error);
    res.status(500).json({ message: "An error occurred" });
  }
});
module.exports = router;
