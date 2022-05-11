const mongoose = require("mongoose");

const GolferSchema = new mongoose.Schema({
  golfer_name: {
    type: String,
    required: true,
  },
  golfer_hdc: {
    type: Number,
    required: true,
  },
  golfer_team: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("golfers", GolferSchema);
