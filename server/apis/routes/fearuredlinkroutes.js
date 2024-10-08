const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const FeaturedLinkController = require("../controllers/featured_link_controller.js");
const FeaturedLink = require("../models/featuredLink.js");
const fs = require("fs");
const path = require("path");

router.get(
  "/:userId/getFeaturedLinksByUserId",
  FeaturedLinkController.getFeaturedLinksByUserId
);
router.get(
  "/:id/getFeaturedLinksByFeatureLinkId",
  FeaturedLinkController.getFeaturedLinksByFeatureLinkId
);
router.get(
  "/getAllFeaturedLinks",
  protect,
  FeaturedLinkController.getAllFeaturedLinks
);
router.put(
  "/addFeaturedLinks",
  protect,
  FeaturedLinkController.addFeaturedLinks
);
router.put(
  "/updateFeaturedLinks",
  protect,
  FeaturedLinkController.updateFeaturedLinks
);
router.put("/fetchFeaturedLink", FeaturedLinkController.fetchFeaturedLink);
router.delete(
  "/removeFeaturedLink",
  protect,
  FeaturedLinkController.removeFeaturedLink
);
router.post(
  "/addFeaturedLinksManual",
  protect,
  FeaturedLinkController.addFeaturedLinksManual
);
router.put(
  "/fetchFeaturedLinkcurrent",
  protect,
  FeaturedLinkController.fetchFeaturedLinkcurrent
);
router.put(
  "/refreshAllFeaturedLinks",
  protect,
  FeaturedLinkController.refreshAllFeaturedLinks
);
router.get("/filterbyDate", protect, FeaturedLinkController.filterbyDate);

module.exports = router;
