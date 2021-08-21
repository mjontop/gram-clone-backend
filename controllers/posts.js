const Post = require("../models/Post");

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

exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findOneAndDelete({
      postedBy: req.user.email,
      _id: req.params.postId,
    });
    if (deletedPost) {
      return res.status(200).json({
        error: false,
        message: "Post Deleted Successfully",
      });
    }
    return res.status(404).json({
      error: true,
      message: "Post Not Found",
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

exports.getUsersPosts = async (req, res) => {
  try {
    const post = await Post.find({ postedBy: req.user.email });
    return res.status(200).json({
      error: false,
      post,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: "Not Posted",
    });
  }
};
