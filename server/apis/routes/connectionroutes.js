const express = require("express");
const router = express.Router();
const ConnectionController = require("../controllers/connection_controller.js");
const { validateToken } = require("../auth/JWT.js");
const { protect } = require("../middleware/authMiddleware");

router.post("/addConnection", protect, ConnectionController.addConnection);

router.post("/removeFriend", protect, ConnectionController.removeFriend);

router.post(
  "/sendConnectionRequest",
  validateToken,
  ConnectionController.sendConnectionRequest
);
router.post(
  "/unsendActiveConnectionRequest",
  validateToken,
  ConnectionController.unsendActiveConnectionRequest
);
router.post(
  "/acceptConnectionRequest",
  validateToken,
  ConnectionController.acceptConnectionRequest
);
router.post("/x", validateToken, ConnectionController.rejectConnectionRequest);
//Reject connection request from others profiles
router.post(
  "/RejectConnectionRequest",
  ConnectionController.RejectConnectionRequest
);
router.post(
  "/checkConnectionStatus",
  validateToken,
  ConnectionController.checkConnectionStatus
);
router.get(
  "/connectionrequests",
  ConnectionController.listactiveConnectionRequest
);
//list of active connection requests from other profiles
router.get(
  "/listActiveConnectionRequestsFromOthers",
  ConnectionController.listActiveConnectionRequestsFromOthers
);
//list of active connection requests sent by current users
router.get(
  "/listActiveConnectionRequests",
  ConnectionController.listActiveConnectionRequests
);
router.get(
  "/getConnectionlistbyId/:userId/connections",
  protect,
  ConnectionController.getConnectionlistbyId
);
router.get(
  "/connection/notifications",
  protect,
  ConnectionController.getUserNotifications
);
router.get(
  "/connection/newnotifications",
  protect,
  ConnectionController.getnewUserNotifications
);
router.post(
  "/connection/markNotificationsAsSeen",
  protect,
  ConnectionController.markNotificationsAsSeen
);

module.exports = router;
