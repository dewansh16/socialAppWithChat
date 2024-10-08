const { Schema, model } = require("mongoose");
const User = require("../models/user.js");

const featuredLinkSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  link: { type: String },
  title: { type: String },
  date: { type: String },
  image: { type: String },
  description: { type: String },
});

const FeaturedLink = model("FeaturedLink", featuredLinkSchema);

module.exports = FeaturedLink;
