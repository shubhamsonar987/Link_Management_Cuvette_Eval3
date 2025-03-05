const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minlength: [2, "First name must be at least 2 characters long"],
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  username: {
    type: String,
    unique: true,
  },

  category: {
    type: String,
    enum: [
      "Business",
      "Creative",
      "Education",
      "Entertainment",
      "Fashion & Beauty",
      "Food & Beverage",
      "Government & Politics",
      "Health & Wellness",
      "Non-Profit",
      "Other",
      "Travel & Tourism",
    ],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
