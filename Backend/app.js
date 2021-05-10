const express = require("express");
const mongoose = require("mongoose");
const app = express();
const user = require("./src/routes/User");
const motorcyclist = require("./src/routes/Motorcyclists");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const path = require("path");

require("dotenv/config");

const JWT_SECRET = process.env.JWTSecret;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

app.use(
  expressJWT({ secret: JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: ["/user/create", "/user/login"],
  })
);
app.use(express.json());
app.use("/user", user);
app.use("/motorcyclist", motorcyclist);

if (process.env.NODE_ENV === "production") {
  // Serve a static folder
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
