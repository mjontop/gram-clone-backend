const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");
const { jwtPvtKey } = require("../config/configEnv");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 32,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
      trim: true,
      default: "",
    },
    username: {
      type: String,
      trim: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    imageBase64: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { username: this.username, email: this.email },
    jwtPvtKey
  );
  return token;
};

module.exports = mongoose.model("User", userSchema);
