var mongoose = require("mongoose");

var postSchema = new mongoose.Schema(
  {
    postedBy: {
      type: String,
      trim: true,
      required: true,
    },
    captions: {
      type: String,
      trim: true,
      default: "",
    },
    imageBase64: {
      type: String,
      require: true,
    },
    likedBy: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
