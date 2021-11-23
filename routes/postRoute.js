var express = require("express");
var router = express.Router();
const {
  createPost,
  getPost,
  getUsersPosts,
  deletePost,
  updatePost,
  likePost,
  unLikePost,
} = require("../controllers/posts");
const authenticate = require("../middleware/authenticate");

router.post("/createPost", authenticate, createPost);

router.post("/deletePost/:postId", authenticate, deletePost);

router.get("/:postId", getPost);

router.post("/all", getUsersPosts);
router.post("/update/:postId", authenticate, updatePost);
router.post("/like/:postId", authenticate, likePost);
router.post("/unLike/:postId", authenticate, unLikePost);

module.exports = router;
