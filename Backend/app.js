const express = require("express");
const mongoose = require("mongoose");
const user = require("./src/routes/User");
const app = express();

require("dotenv/config");

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

app.use(express.json());
app.use("/user", user)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
