const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/User");

require("dotenv/config");

const JWT_SECRET = process.env.JWTSecret;

// Create user
router.post("/create", (req, res) => {
  const newUser = new User({
    userName: req.body.userName,
    password: req.body.password,
  });

  newUser
    .save()
    .then((data) => console.log(data))
    .catch((err) => {
      console.log("err", err);
    });
  console.log(req.body);
  res.send("List of services");
});

router.get("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      userName: req.body.userName,
      password: req.body.password,
    });
    if (user) {
      const payload = user.toJSON();
      console.log(user);
      const token = jwt.sign(payload, JWT_SECRET);
      res.status(200).json({ token: token });
      console.log(token);
    } else {
      res.status(400).json({ message: "User doesn't exists" });
    }
  } catch (error) {
    console.log("error", error);
  }
});

module.exports = router;
