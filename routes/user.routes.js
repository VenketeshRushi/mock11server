const express = require("express");
const bcrypt = require("bcryptjs");
const { signup, login, refresh } = require("../controllers/user.controller");
const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const app = express.Router();

app.post("/signup", async (req, res) => {
  let { email, password } = req.body;

  try {
    console.log(email, password);

    bcrypt.hash(password, 4, async (err, hash) => {
      let data = await signup({ email, password: hash });

      if (data.status == "Failed") {
        return res.status(500).json(data);
      }

      return res.status(201).send(data);
    });
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({ message: error.message, status: "Failed" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    console.log(user);

    if (!user) {
      return res
        .status(500)
        .send({ status: "Failed", message: "Invalid Credentials" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        console.log("hello");
        const token = jwt.sign({ user }, "1234", { expiresIn: "1 hr" });
        const refreshtoken = jwt.sign({ user }, "refresh1234", {
          expiresIn: "7 days",
        });
        return res.status(201).send({
          status: "Success",
          jwttoken: token,
          userid: user._id,
          refreshtoken: refreshtoken,
          message: "Login Successful",
        });
      }
      return res
        .status(500)
        .send({ status: "Failed", message: "Invalid Credentials" });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/logout", (req, res) => {
  return res.send({ message: "Logout successfuly" });
});


module.exports = app;
