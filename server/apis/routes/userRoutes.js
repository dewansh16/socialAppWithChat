const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const UserController = require("../controllers/user_controller.js");
const User = require("../models/user.js");
const fs = require("fs");
const path = require("path");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require("node:crypto");

const storage = multer.memoryStorage();

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
//   if (!allowedTypes.includes(file.mimetype)) {
//     const error = new Error("Only JPEG, JPG, and PNG files are allowed");
//     error.code = "LIMIT_FILE_TYPES";
//     return cb(error, false);
//   }
//   cb(null, true);
// };

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const randomImageName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});

const upload = multer({ storage });

router.post(
  "/uploadPic",
  protect,
  upload.single("profilePic"),
  async (req, res) => {
    console.log("req.body = ", req.body);
    try {
      const profilePic = req.file;
      const userId = req.user?.id;

      console.log("profilePic = ", profilePic);
      if (!userId) {
        return res.status(400).json({ error: "User ID is missing" });
      }

      const user = await User.findById(userId); // use User model to find user by ID

      if (!user) {
        return res.status(400).json({ error: "User does not exist" });
      }

      if (!user.isVerified) {
        return res.status(400).json({
          error:
            "We are currently verifying your account. Please wait for a while before attempting to upload a profile picture. Thank you for your patience.",
        });
      }

      const imageName = randomImageName();

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      };

      const command = new PutObjectCommand(params);

      await s3.send(command);

      console.log("user's pic", user.pic);

      if (
        user.pic !==
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
      ) {
        const deleteParams = {
          Bucket: bucketName,
          Key: user.pic,
        };

        const deleteCommand = new DeleteObjectCommand(deleteParams);

        await s3.send(deleteCommand);
      }

      user.pic = imageName;

      const updatedUser = await user.save();

      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.post("/getProfilePic", protect, async (req, res) => {
  // console.log("req.body from getProfilePic = ", req.body);
  try {
    const userId = req.body.userId;
    const user = await User.findById(userId); // use User model to find user by ID

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
    if (!user.pic) {
      return res.status(400).json({ error: "pic not present" });
    }
    // console.log("user.pic = ", user.pic);
    const getObjectParams = {
      Bucket: bucketName,
      Key: user.pic,
    };

    const getCommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });

    return res.status(200).json({ imageUrl: url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/names/:letter", UserController.letterRecommendation);
router.post("/register", UserController.register);
router.post("/changePassword", protect, UserController.changePassword);
router.put("/update", protect, UserController.update);
router.put("/updateAchievement", protect, UserController.updateAchievements);
router.put("/addFeaturedLinks", protect, UserController.addFeaturedLinks);
router.put("/updateFeaturedLinks", protect, UserController.updateFeaturedLinks);
router.put("/fetchFeaturedLink", UserController.fetchFeaturedLink);
router.put(
  "/fetchFeaturedLinkcurrent",
  protect,
  UserController.fetchFeaturedLinkcurrent
);
router.delete(
  "/removeFeaturedLink",
  protect,
  UserController.removeFeaturedLink
);
router.delete("/removeAchievement", protect, UserController.removeAchievement);
router.post(
  "/updateFeaturedLinksManual",
  protect,
  UserController.updateFeaturedLinksManual
);
router.put(
  "/refreshAllFeaturedLinks",
  protect,
  UserController.refreshAllFeaturedLinks
);
router.post("/login", UserController.login);
router.get("/verifyEmail", UserController.verifyEmail);
router.post("/getResetPasswordLink", UserController.getResetPasswordLink);
router.post("/resetPassword/:token", UserController.resetPassword);
router.post("/createPassword/:token", UserController.createPassword);
router.post("/findUserData", UserController.findUserData);
router.get("/allUsers", protect, UserController.allUsers);
router.get("/getuser/:userid", protect, UserController.getuser);
//router.post("/writetous", UserController.writetous);
// router.get("/sendConnect/:userid", protect, UserController.sendConnect);
// router.get("/acceptRequest/:userid", protect, UserController.acceptRequest);
router.get("/friendsList/:userid", UserController.friendsList);
router.get(
  "/activeConnectionRequests/:userid",
  UserController.activeConnectionRequests
);
router.get("/news/:searchString", UserController.featuredlinks);

module.exports = router;
