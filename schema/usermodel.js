const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    email: String,
    password: String,
    confirmPassword: String,
  },
  {
    versionKey: false,
  }
);

const userModel = mongoose.model("User", userschema);

module.exports = {
  userModel,
};
