const express = require("express");
const path = require("path");

const {
  allMessages,
  sendMessage,
  deleteMessage,
  reactToMessage,
  likeMessage,
  unlikeMessage,
  reply,
  Replies,
  mentionMessage,
  starredM,
  starredAdd,
  starredRem,
  getNotifications,
  getMessagesByUserId,
  getNewNotifications,
} = require("../controllers/messageControllers");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });
const router = express.Router();

router.route("/starred").get(protect, starredM);
router.route("/starred/:messageId").get(protect, starredAdd);
router.route("/unstarred/:messageId").get(protect, starredRem);
router.route("/:chatId").get(protect, allMessages);
router.route("/").post([protect, upload.single("myFile")], sendMessage);
router.route("/:messageId").delete(protect, deleteMessage);
router.route("/:messageId/react").post(protect, reactToMessage);
router.route("/:messageId/like").post(protect, likeMessage);
router.route("/:messageId/unlike").delete(protect, unlikeMessage);
router.route("/:messageId/mention").post(protect, mentionMessage);
router
  .route("/:messageId/reply")
  .post([protect, upload.single("myFile")], reply);
router.put("/:messageId", protect, Replies);
router.get("/", protect, getNotifications);
router.get("/user/:userId", protect, getMessagesByUserId);
router.get("/notification/newNotifications", protect, getNewNotifications);

module.exports = router;
