const express = require("express");
const Layout = require("../models/layout.model");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

router.put("/appearance", authMiddleware, async (req, res) => {
  const { layout, button, button_text, font, fontcolor, themes } = req.body;
  const userId = req.user.id;

  try {
    let appearance = await Layout.findOne({ user: userId });

    if (appearance) {
      appearance.layout = layout;
      appearance.button = button;
      appearance.button_text = button_text;
      appearance.font = font;
      appearance.fontcolor = fontcolor;
      appearance.themes = themes;
    } else {
      appearance = new Layout({
        layout,
        button,
        button_text,
        font,
        fontcolor,
        themes,
        user: userId,
      });
    }

    await appearance.save();
    res.json({ message: "Appearance settings updated", appearance });
  } catch (error) {
    console.error("Error updating appearance:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/appearance", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const appearance = await Layout.findOne({ user: userId });

    if (!appearance) {
      return res.status(404).json({ message: "Appearance settings not found" });
    }

    res.json({ appearance });
  } catch (error) {
    console.error("Error fetching appearance settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/appearance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const appearance = await Layout.findOne({ user: userId });

    if (!appearance) {
      return res.status(404).json({ message: "Appearance settings not found" });
    }

    res.json({ appearance });
  } catch (error) {
    console.error("Error fetching appearance settings:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
