const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel.js");
const User = require("../models/user.js");


  const likePost = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId
    try {
    let message = await Message.findById(messageId)
    if (!message) {
    return res.status(400).send({ error: "Message not found" });
    }
    message.likes.push(req.user.id);
    message = await message.save();
    res.json(message);
    // Push a notification
  const sender = await User.findById(req.user.id);
  const chat = await Chat.findById(message.chat);
  chat.notifications.push({
    message: `${sender.firstname} liked your message`,
    sender: sender._id,
    recipient: message.sender
  });
  await chat.save();
  } catch (error) {
    res.status(400).send({ error: error.message });
    }
    });
    
    const showLikes = asyncHandler(async (req, res) => {
      try {
      const message = await Message.findById(req.params.messageId)
      .populate("likes", "firstname pic email");
      res.json(message.likes);
      } catch (error) {
      res.status(400).send({ error: error.message });
      }
      });
    
  
  const replyPost = asyncHandler(async (req, res) => {
        const messageId = req.params.messageId;
        try {
        const message = await Message.findById(messageId);
        if (!message) {
        throw new Error("Message not found");
        }
        message.replies.push({
        text: req.body.text,
        sender: req.user.id,
        });
        message.save();
        //push notification to sender of original message
  const originalSender = await User.findById(message.sender);
  originalSender.notifications.push({
    message: `You have received a reply to your message: "${message.text}"`
  });
  originalSender.save();
  
  res.json({ success: true });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
    }
    });
  
    const mentioned = asyncHandler(async (req, res) => {
      try {
        // Find the message being mentioned
        const message = await Message.findById(req.params.messageId);
    
        // Extract the list of mentioned users from the message text
        const mentionedUserIds = extractMentionedUserIds(message.text);
    
        // Notify each mentioned user
        for (const userId of mentionedUserIds) {
          const user = await User.findById(userId);
          sendNotification(user, `You were mentioned in a message: "${message.text}"`);
        }
    
        res.json({ message });
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    });
    
    async function extractMentionedUserIds(messageText) {
      // Example implementation that looks for "@username" mentions in the text
      const mentionedUsernames = messageText.match(/@\w+/g) || [];
      const mentionedUserIds = [];
      for (const username of mentionedUsernames) {
      const user = await User.findOne({ username: username.slice(1) });
      if (user) {
      mentionedUserIds.push(user._id);
      }
      }
      return mentionedUserIds;
      }
    
    // Sends a notification to a user
    function sendNotification(user, notificationText) {
      // Example implementation that just logs the notification text
      console.log(`Sending notification to ${user.username}: ${notificationText}`);
    }

  const sendConnect = asyncHandler(async (req, res) => {
  const tuserid = req.params.userid;
  const currUserid = req.user._id;
  const user = await User.findById(currUserid);
  user.requests.push({ userid: tuserid, state: "1" });
  await user.save();
  const tuser = await User.findById(tuserid);
  tuser.notifications.push({ userid: currUserid });
  await tuser.save();
  res.send("request sent successfully");
});

const acceptRequest = asyncHandler(async (req, res) => {
  const tuserid = req.params.userid;
  const currUserid = req.user._id;
  const user = await User.findById(tuserid);
  for (let i = 0; i < user.requests.length; i++) {
    if (user.requests[i].userid === currUserid) {
      user.requests[i].state = "2";
    }
  }
  await user.save();

  const curruser = await User.findById(currUserid);
  for (let i = 0; i < curruser.notifications.length; i++) {
    if (curruser.notifications[i].userid === tuserid) {
      user.notifications[i].state = true;
    }
  }
  await curruser.save();
  res.send("request accepted successfully");
});

  const getNotifications = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const notifications = user.notifications;
      res.json(notifications);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  });

  module.exports = {  sendConnect, acceptRequest , likePost , replyPost , mentioned , showLikes , getNotifications };
  