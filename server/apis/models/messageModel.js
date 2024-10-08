const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    name: { type: String },
    content: { type: String },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    businessAccess: { type: Boolean, default: false },
    EntrepreneurAccess: { type: Boolean, default: false },
    contentCreatorAccess: { type: Boolean, default: false },
    post: {
      type: String,
    },
    postName: {
      type: String,
    },
    isLiked: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    text: { type: String },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        emoji: { type: String },
      },
    ],
    replies: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
    created_at: { type: Date, default: Date.now },
    seen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
