const mongoose = require("mongoose");

const AnalyticsSchema = new mongoose.Schema({
  userIp: {
    type: String,
    required: true,
  },
  userCookie: {
    type: String,
  },
  deviceType: {
    type: String,
    enum: ["Mobile", "Desktop", "Tablet"],
    required: true,
  },
  location: {
    country: { type: String },
    city: { type: String },
  },
  referrer: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ShopSchema = new mongoose.Schema({
  shopname: { type: String, required: true },
  shopurl: { type: String, required: true },
  application: {
    type: String,
    required: true,
  },
  analytics: [AnalyticsSchema],
});

const LinkSchema = new mongoose.Schema({
  username: { type: String, required: true },
  bio: { type: String },

  link: [
    {
      linktitle: { type: String, required: true },
      linkurl: { type: String, required: true },
      application: {
        type: String,
        required: true,
      },
      analytics: [AnalyticsSchema],
    },
  ],

  shop: [ShopSchema],

  banner: { type: String },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Link = mongoose.model("Link", LinkSchema);
module.exports = Link;
