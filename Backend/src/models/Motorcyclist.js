const mongoose = require("mongoose");

const motorcyclist = mongoose.Schema({
  taken: Boolean,
  takenBy: String,
});

module.exports = mongoose.model("Motorcyclist", motorcyclist);
