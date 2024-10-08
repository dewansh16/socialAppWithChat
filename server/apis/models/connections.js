const { boolean } = require("joi");
const mongoose = require("mongoose");
const { UserSchema } = require("../models/user.js");

const NotificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  senderName: {
    type: String,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
  },
  type: {
    type: String,
  },
  state: {
    type: Boolean,
  },
  seen: {
    type: Boolean,
    default: false,
  },
  chatId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chat",
  },
  messageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  },

});



const ConnectionsSchema = new mongoose.Schema({
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const ConnectionRequestSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isactive: {
    type: Boolean,
  },
});

module.exports.Notification = mongoose.model(
  "Notification",
  NotificationSchema
);
module.exports.Connection = mongoose.model("Connection", ConnectionsSchema);
module.exports.ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  ConnectionRequestSchema
);
