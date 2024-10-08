const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  sendConnect,
  acceptRequest,
  likePost,
  replyPost,
  mentioned,
  showLikes,
  getNotifications,
} = require("../controllers/notification_controller");

router.post("/connect/:userid", protect, sendConnect);
router.post("/accept/:userid", protect, acceptRequest);
router.post("/like/:messageId", protect, likePost);
router.post("/reply/:messageId", protect, replyPost);
router.post("/mentioned/:messageId", protect, mentioned);
router.get("/likes/:messageId", protect, showLikes);
router.get("/notifications", protect, getNotifications);

module.exports = router;
