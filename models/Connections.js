var mongoose = require("mongoose");

var connectionSchema = new mongoose.Schema(
  {
    followee: {
      type: String,
      trim: true,
      required: true,
    },
    follower: {
      type: String,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Connection", connectionSchema);
