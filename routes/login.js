const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userModel } = require("../schema/usermodel");

const login = express.Router();

login.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      let comparepassword = existingUser.password;
      bcrypt.compare(password, comparepassword, function (err, result) {
        if (result) {
          const token = jwt.sign({ id: existingUser._id }, "masai");
          res.status(201).send({ message: "User successfully Login", token });
        } else {
          res.send({ message: "Plese Check Your Credentials" });
        }
      });
    } else {
      res.send({ message: "Please Register Yourself Before Login" });
    }
  } catch (error) {
    console.log(error.message);
  }
});


module.exports = { login };
