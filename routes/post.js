var express = require("express");
var router = express.Router();
const { createPost, getPost, getUsersPosts, deletePost } = require("../controllers/posts");
const authenticate = require("../middleware/authenticate");

router.post("/createPost", authenticate, createPost);

router.post("/deletePost/:postId", authenticate, deletePost);

router.get("/:postId", getPost);

router.post("/myPosts", authenticate, getUsersPosts);

module.exports = router;
