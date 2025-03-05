const mongoose = require("mongoose");

const clickSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    itemId: { type: String, required: false }, // ✅ ObjectId ki jagah String allow kiya
    type: { type: String, required: true },
    application: { type: String },
    os: { type: String },
    ip: { type: String, required: true },
    count: { type: Number, default: 1 },
  },
  { timestamps: true }
);

clickSchema.index({ userId: 1, itemId: 1, ip: 1 }, { unique: true });

const Click = mongoose.model("Click", clickSchema);
module.exports = Click;
