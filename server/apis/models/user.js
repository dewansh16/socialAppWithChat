const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  createemail_verificationTokens,
  passwordResetToken,
} = require("../auth/JWT.js");
const { Influencer } = require("../models/influencerprofile.js");
const { EntrepreneurProfile } = require("../models/entrepreneurprofile.js");
const { BuisnessProfile } = require("../models/entrepreneurprofile.js");
const { FeaturedLink } = require("../models/featuredLink.js");
const { Event } = require("../models/Events.js");
const { Contactus } = require("../models/contactus.js");
const { Chat } = require("../models/chatModel.js");
const { Message } = require("../models/messageModel.js");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    // email: { type: String },
    name: { type: String, required: true },
    createdPassword: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    password: { type: String },
    role: {
      type: String,
      enum: ["Content Creator", "Entrepreneur", "Business"],
    },
    about: { type: String, default: "" },
    education: { type: String, default: "" },
    location: { type: String, default: "" },
    website_link: { type: String, default: "" },
    instagram: { type: String, default: "" },
    twitter: { type: String, default: "" },
    youtube: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    others: { type: String, default: "" },
    gstin: { type: String, default: "" },
    pan: { type: String, default: "" },
    bdomain: {
      type: [String],
      default: [],
    },
    businessname: { type: String, default: "" },
    foundername: { type: [String], default: [] },
    btype: { type: String, default: "" },

    createdDate: { type: Date, default: Date.now },
    influencer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Influencer",
    },
    entrepreneurprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "EntrepreneurProfile",
    },
    businessprofile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessProfile",
    },
    connectionlist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Connections",
    },
    experience: [
      {
        comName: { type: String },
        start: {
          month: String,
          year: Number,
        },
        end: {
          month: String,
          year: Number,
        },
        isWorking: { type: Boolean },
      },
    ],
    social_media: {
      instagram: { default: "", type: String },
      twitter: { default: "", type: String },
      youtube: { default: "", type: String },
      linkedin: { default: "", type: String },
      facebook: { default: "", type: String },
    },

    featured_link: [
      {
        link: { type: String },
        title: { type: String },
        date: { type: String },
        image: { type: String },
        description: { type: String },
      },
    ],
    featuredlink: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FeaturedLink",
    },
    interestedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],

    achivement: [
      {
        link: { type: String },
        title: { type: String },
        date: { type: String },
        image: { type: String },
      },
    ],

    requests: [
      {
        userid: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        state: { type: String, default: "0" },
      },
    ],

    notifications: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        message: { type: String },
        state: { type: Boolean, default: false },
        type: {
          type: String,
          enum: ["connection", "like", "message", "mention"],
        },
        name: { type: String },
        pic: { type: String },
        seen: { type: Boolean, default: false },
        chatId: { type: String, default: "" },
        messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
      },
    ],

    interactions: [[]],

    pic: {
      type: String,
      required: false,
      default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    starred_chat: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  let user = this;
  if (this.isModified("password") || this.isNew) {
    bcrypt
      .hash(user.password, 10)
      .then((hash) => {
        user.password = hash;
        return next();
      })
      .catch((error) => {
        return next(error);
      });
  } else {
    return next();
  }
});

UserSchema.methods.generateemailVerificationToken = function () {
  return createemail_verificationTokens(this);
};

UserSchema.methods.generatePasswordResetToken = function () {
  return passwordResetToken(this);
};

UserSchema.methods.generateOtp = function () {
  for (let i = 0; i < 6; i++) {
    this.Otp = Math.floor(Math.random() * 10000);
  }
  this.OtpExpires = Date.now() + 3600000; //expires in an hour
  return this.Otp;
};

module.exports = mongoose.model("User", UserSchema);
