var express = require("express");
var router = express.Router();
const {
  createPost,
  getPost,
  getUsersPosts,
  deletePost,
  updatePost,
} = require("../controllers/posts");
const authenticate = require("../middleware/authenticate");

router.post("/createPost", authenticate, createPost);

router.post("/deletePost/:postId", authenticate, deletePost);

router.get("/:postId", getPost);

router.post("/myPosts", getUsersPosts);
router.post("/update/:postId", authenticate, updatePost);

module.exports = router;
