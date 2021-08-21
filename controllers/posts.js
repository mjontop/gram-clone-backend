const Post = require("../models/Post");
const { validationResult, check } = require("express-validator");

exports.createPost = async (req, res) => {
  if (!req.body.imageBase64) {
    return res.status(400).json({
      error: true,
      message: "Image Not Found",
    });
  }
  try {
    const post = new Post({
      postedBy: req.user.email,
      ...req.body,
    });

    await post.save();

    return res.status(400).json({
      error: false,
      message: "Post Saved",
      postId: post.id,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error" + ex,
    });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    return res.status(200).json({
      error: false,
      post,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: "Post Not Found",
    });
  }
};
