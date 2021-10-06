var express = require("express");
var router = express.Router();
const {
  toggleFollowers,
  getAllFollowers,
  getAllFollowees,
  getAllConnectionsCount,
  getFollowingStatus,
} = require("../controllers/connection");
const authenticate = require("../middleware/authenticate");

router.post("/getAllFollowers", getAllFollowers);

router.post("/getAllFollowees", getAllFollowees);

router.post("/toggleFollow", authenticate, toggleFollowers);
router.post("/getAllConnectionsCount", getAllConnectionsCount);
router.post("/getFollowingStatus", authenticate, getFollowingStatus);

module.exports = router;
