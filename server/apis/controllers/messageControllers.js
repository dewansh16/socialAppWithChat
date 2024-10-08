const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel.js");
const User = require("../models/user.js");
const Chat = require("../models/chatModel.js");
const mongoose = require("mongoose");
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const crypto = require("node:crypto");

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const bucketAccessKey = process.env.BUCKET_ACCESS_KEY;
const bucketSecretAccessKey = process.env.BUCKET_SECRET_ACCESS_KEY;

const randomFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const s3 = new S3Client({
  credentials: {
    accessKeyId: bucketAccessKey,
    secretAccessKey: bucketSecretAccessKey,
  },
  region: bucketRegion,
});

//@description     Get all Messages
//@route           GET /api/Message/:chatId
//@access          Protected
const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat")
      .populate("replies")
      .populate({
        path: "replies",
        populate: { path: "sender" },
      });
    console.log(messages.length);

    for (message of messages) {
      if (message.post !== null && message.post !== undefined) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: message.post,
        };

        const getCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
        message.post = url;
      }
    }

    const newMessages = JSON.parse(JSON.stringify(messages));
    for (message of newMessages) {
      if (message.sender?.pic) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: message.sender?.pic,
        };

        const getCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });

        message.sender.pic = url;
      }
    }

    // message = await message.populate("replies");
    res.json(newMessages);
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const starredM = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "starred_chat",
      populate: {
        path: "sender",
      },
    });

    const newUser = JSON.parse(JSON.stringify(user));

    for (message of newUser.starred_chat) {
      console.log("message = ", message.sender?.pic);
      if (message.sender?.pic) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: message.sender?.pic,
        };

        const getCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
        message.sender.pic = url;
      }
    }

    res.json(newUser);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const starredAdd = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }
    if (user.starred_chat.includes(messageId)) {
      return res.status(400).send({ error: "Message already in starred chat" });
    }
    user.starred_chat.push(messageId);
    await user.save();
    const updateMessage = await Message.findByIdAndUpdate(messageId, {
      isStarred: true,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const starredRem = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const messages = await User.findById(req.user.id);
    console.log(messages);
    if (messageId) {
      const index = messages.starred_chat.indexOf(messageId);
      if (index > -1) {
        // only splice array when item is found
        messages.starred_chat.splice(index, 1); // 2nd parameter means remove one item only
      }
      const updateMessage = await Message.findByIdAndUpdate(messageId, {
        isStarred: false,
      });
      messages.save();
    }
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const sendMessage = asyncHandler(async (req, res) => {
  console.log("req.body from message = ", req.body, req.file);

  const { content, chatId, toBusiness, toContentCreator, toEntre } = req.body;

  if (!chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const fileName = randomFileName();
  if (req.file) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  var newMessage = {
    sender: req.user._id,
    name: req.user.name,
    content: content,
    chat: chatId,
    post: req.file ? fileName : null,
    postName: req.file ? req.file.originalname : null,
    businessAccess: toBusiness || false,
    EntrepreneurAccess: toEntre || false,
    contentCreatorAccess: toContentCreator || false,
  };
  const sender = await User.findById(req.user._id);
  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    let chat = await Chat.findByIdAndUpdate(req.body.chatId, {
      latestMessage: message,
    });

    if (req.file) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: message.post,
      };

      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
      message.post = url;
    }

    if (chat.users.length > 1) {
      chat = await chat.populate("users");
      for (const chatuser of chat.users) {
        if (chatuser._id.toString() !== sender._id.toString()) {
          console.log(
            sender._id.toString(),
            "userId ",
            chatuser._id.toString()
          );
          const notification = {
            sender: req.user._id,
            name: req.user.name,
            message: `${req.user.name} sent a message`,
            type: "message",
            state: false,
            chatId: chatId,
            messageId: message._id,
            pic: sender.pic,
            seen: false,
          };
          chatuser.notifications.unshift(notification);
          await chatuser.save();
        }
      }
    }

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const reply = asyncHandler(async (req, res) => {
  console.log("req.body from message = ", req.body, req.file);
  const messageId = req.params.messageId;

  const { content, chatId, toBusiness, toContentCreator, toEntre } = req.body;

  if (!chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }

  const fileName = randomFileName();
  if (req.file) {
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);

    await s3.send(command);
  }

  const newMessage = {
    sender: req.user._id,
    name: req.user.name,
    content: req.body.content,
    chat: chatId,
    post: req.file ? fileName : null,
    postName: req.file ? req.file.originalname : null,
    replies: messageId,
    businessAccess: toBusiness | false,
    EntrepreneurAccess: toEntre | false,
    contentCreatorAccess: toContentCreator | false,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await message.populate("chat");
    message = await message.populate("replies");
    message = await User.populate(message, {
      path: "replies.sender",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    if (req.file) {
      const getObjectParams = {
        Bucket: bucketName,
        Key: message.post,
      };

      const getCommand = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
      message.post = url;
    }

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const deleteMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;

  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(400).send({ error: "Message not found" });
    }

    if (message.sender.toString() !== req.user._id.toString()) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    await message.remove();
    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const likeMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(400).send({ error: "Message not found" });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);

    if (!message.likes) {
      message.likes = [userId];
      await sendLikeNotification(userId, messageId);
    } else if (!message.likes.includes(userId)) {
      message.likes.push(userId);
      await sendLikeNotification(userId, messageId);
    } else {
      return res
        .status(400)
        .send({ error: "You have already liked this message" });
    }

    const messageSenderId = message.sender;
    const messageSender = await User.findById(messageSenderId);
    if (messageSenderId !== userId) {
      const notification = {
        sender: user._id,
        name: user.name,
        message: `${user.name} liked your message`,
        type: "like",
        state: false,
        messageId: messageId,
        pic: user.pic,
        seen: false,
      };
      messageSender.notifications.unshift(notification);
      await messageSender.save();
    }

    await message.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const sendLikeNotification = async (userId, messageId) => {
  try {
    console.log("sendLikeNotification called");
    const sender = await User.findById(userId);
    const message = await Message.findById(messageId);
    const chat = await Chat.findById(message.chat);
    console.log(messageId);
    chat.notifications.push({
      message: `${sender.name} liked your message`,
      sender: sender._id,
      recipient: message.sender,
      seen: false,
      messageId: messageId,
    });
    await chat.save();
    console.log("Chat saved with notification");
    console.log(chat.notifications);
  } catch (error) {
    console.error(`Error sending like notification: ${error.message}`);
  }
};

const unlikeMessage = asyncHandler(async (req, res) => {
  console.log("sendLikeNotification called");
  const messageId = req.params.messageId;
  try {
    let message = await Message.findById(messageId);
    if (!message) {
      return res.status(400).send({ error: "Message not found" });
    }
    const userId = req.user.id;
    if (!message.likes || !message.likes.includes(userId)) {
      return res.status(400).send({ error: "User has not liked this message" });
    }
    message.likes = message.likes.filter(
      (id) => id.toString() !== userId.toString()
    );
    await message.save();
    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const reactToMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;
  try {
    const message = await Message.findById(messageId);
    if (!message) {
      return res.status(400).send({ error: "Message not found" });
    }
    const senderId = req.user.id;
    const reaction = req.body.reaction;

    // Check if user has already reacted to this message
    if (message.reactions && message.reactions.length > 0) {
      const existingReactionIndex = message.reactions.findIndex(
        (r) => r.sender.toString() === senderId
      );
      if (existingReactionIndex > -1) {
        message.reactions.splice(existingReactionIndex, 1);
      }
    }

    message.reactions.push({
      reaction,
      sender: senderId,
    });
    await message.save();

    await sendReactionNotification(senderId, message, messageId);

    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const sendReactionNotification = async (senderId, message) => {
  try {
    const sender = await User.findById(senderId);
    const chat = await Chat.findById(message.chat);
    chat.notifications.push({
      message: `${sender.name} reacted to your message: "${message.text}"`,
      sender: sender._id,
      recipient: message.sender,
      seen: false,
      messageId: messageId,
      chatId: chatId,
    });
    await chat.save();
  } catch (error) {
    console.error(`Error sending reaction notification: ${error.message}`);
  }
};

const Replies = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const chats = await Chat.find({ users: userId }).populate({
    path: "latestMessage",
    populate: {
      path: "replies.sender",
      model: "User",
    },
  });

  const unreadChats = [];

  for (const chat of chats) {
    if (
      chat.latestMessage &&
      chat.latestMessage.sender.toString() !== userId.toString()
    ) {
      const latestMessage = chat.latestMessage;
      const unreadReplies = latestMessage.replies.filter(
        (reply) =>
          reply.sender.toString() !== userId.toString() &&
          !reply.readBy.includes(userId)
      );

      if (unreadReplies.length > 0) {
        unreadChats.push({
          chatId: chat._id,
          chatName: chat.chatName,
          unreadReplies,
        });
      }
    }
  }

  res.json(unreadChats);
});

const mentionMessage = asyncHandler(async (req, res) => {
  const messageId = req.params.messageId;
  const mentionedUserId = req.body.mentionedUserId;
  try {
    let message = await Message.findById(messageId).populate("sender");
    if (!message) {
      return res.status(400).send({ error: "Message not found" });
    }
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!message.mentions) {
      message.mentions = [{ user: mentionedUserId, mentionedBy: userId }];
    } else {
      const mentionExists = message.mentions.some(
        (mention) => mention.user.toString() === mentionedUserId
      );
      if (!mentionExists) {
        message.mentions.push({ user: mentionedUserId, mentionedBy: userId });
      }
    }
    await message.save();

    // Send notification to mentioned user
    const mentionedUser = await User.findById(mentionedUserId);
    if (!mentionedUser) {
      return res.status(400).send({ error: "Mentioned user not found" });
    }
    const newNotification = {
      sender: user._id,
      name: user.name,
      message: `${user.name} mentioned you in chat`,
      type: "mention",
      state: false,
      pic: user.pic,
      seen: false,
      messageId: messageId,
    };
    console.log(notification.name, "notinoti");
    mentionedUser.notifications.unshift(notification);
    await mentionedUser.save();
    // await sendMentionNotification(mentionedUser, message);

    res.json({ success: true });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

function sendMentionNotification(user, notificationText) {
  console.log(`Sending notification to ${user.name}: ${notificationText}`);
}

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate({
      path: "notifications",
      populate: { path: "sender", select: "name" },
    });

    const notifications = user.notifications.map((notification) => {
      const {
        _id,
        message,
        sender,
        type,
        state,
        pic,
        seen,
        chatId,
        messageId,
      } = notification;
      const populatedSender = sender && sender.name;

      return {
        _id,
        message,
        sender: populatedSender,
        type,
        state,
        pic,
        seen,
        chatId: chatId && chatId.toString(),
        messageId: messageId && messageId.toString(),
      };
    });

    res.json(notifications);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

const getMessagesByUserId = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  try {
    Chat.find({ users: { $elemMatch: { $eq: userId } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

let lastFetchedNotificationId = null;

const getNewNotifications = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const notifications = user.notifications;
    const newNotifications = notifications.filter((notif) => !notif.read);

    newNotifications.sort((a, b) => b.date - a.date);

    const lastRefreshedNotification =
      newNotifications.length > 0 ? newNotifications[0] : null;

    if (lastRefreshedNotification) {
      if (lastRefreshedNotification.pic) {
        const getObjectParams = {
          Bucket: bucketName,
          Key: lastRefreshedNotification.pic,
        };

        const getCommand = new GetObjectCommand(getObjectParams);
        const url = await getSignedUrl(s3, getCommand, { expiresIn: 3600 });
        lastRefreshedNotification.pic = url;
      }
      const chatId = lastRefreshedNotification.chatId;

      if (!chatId) {
        console.error("Missing chatId");
      } else {
        try {
          const chatObjectId = mongoose.Types.ObjectId(chatId);
          lastRefreshedNotification.chat = chatObjectId;
        } catch (error) {
          console.error(`Invalid chatId: ${chatId}`);
        }
      }
    }

    if (
      lastRefreshedNotification &&
      lastFetchedNotificationId === lastRefreshedNotification._id.toString()
    ) {
      res.json(null);
    } else {
      lastFetchedNotificationId = lastRefreshedNotification
        ? lastRefreshedNotification._id.toString()
        : null;
      res.json(lastRefreshedNotification);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = {
  allMessages,
  sendMessage,
  sendReactionNotification,
  reactToMessage,
  likeMessage,
  sendLikeNotification,
  starredM,
  starredAdd,
  starredRem,
  Replies,
  mentionMessage,
  getNotifications,
  sendMentionNotification,
  reply,
  unlikeMessage,
  deleteMessage,
  getMessagesByUserId,
  getNewNotifications,
};
