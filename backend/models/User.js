const jwt = require("jsonwebtoken");
var mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
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
    },
    encry_password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ id: this._id, email: this.email }, "MyJWTPVTKey");
  return token;
};

module.exports = mongoose.model("User", userSchema);
