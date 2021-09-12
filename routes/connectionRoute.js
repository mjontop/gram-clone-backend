var express = require("express");
var router = express.Router();
const {
  toggleFollowers,
  getAllFollowers,
  getAllFollowees,
  getAllConnectionsCount,
} = require("../controllers/connection");
const authenticate = require("../middleware/authenticate");

router.post("/getAllFollowers", getAllFollowers);

router.post("/getAllFollowees", getAllFollowees);

router.post("/toggleFollow", authenticate, toggleFollowers);
router.post("/getAllConnectionsCount", getAllConnectionsCount);

module.exports = router;
