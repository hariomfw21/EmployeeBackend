const express = require("express");
const bcrypt = require("bcrypt");
const {userModel} = require("../schema/usermodel")

const register = express.Router();

register.post("/signup", async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    let existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(201).send({ message: "User Already registered Please Login" });
    } else {
      if (password !== confirmPassword) {
        res
          .status(403)
          .send({ message: "Password and confirm password do not match" });
      } else {
        bcrypt.hash(password, 5, async function (err, hash) {
          if (!err) {
            let newUser = new userModel({
              email,
              password: hash,
              confirmPassword:hash
            });
            await newUser.save();
            res.send({ message: "User successfully registered" });
          } else {
            res.send({
              message: "Something went wrong while storing Password",
            });
          }
        });
      }
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { register };
