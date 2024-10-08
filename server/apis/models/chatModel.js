const mongoose = require("mongoose");

const replySchema = mongoose.Schema(
  {
    text: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const notificationSchema = mongoose.Schema(
  {
    message: { type: String },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    mentionedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seen: { type: Boolean, default: false },
    chatId: { type: String, default: "" },
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    replies: [replySchema],
    notifications: [notificationSchema],
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatModel);

module.exports = Chat;
