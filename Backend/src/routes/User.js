const express = require("express");
const router = express.Router();
const User = require("../models/User");

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

module.exports = router;
