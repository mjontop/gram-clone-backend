var express = require("express");
var router = express.Router();
const { createPost, getPost } = require("../controllers/posts");
const authenticate = require("../middleware/authenticate");

router.post("/createPost", authenticate, createPost);

router.post("/:postId", getPost);

module.exports = router;
