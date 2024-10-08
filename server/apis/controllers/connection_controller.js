const Joi = require("joi");
const User = require("../models/user.js");
const { UserSchema } = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const { ConnectionRequest, Connection } = require("../models/connections.js");
const { Influencer } = require("../models/influencerprofile.js");
const { EntrepreneurProfile } = require("../models/entrepreneurprofile.js");
const { BuisnessProfile } = require("../models/entrepreneurprofile.js");
const asyncHandler = require("express-async-handler");

//
exports.getConnectionlistbyId = async (req, res) => {
  // Get user ID from request params or headers
  const userId = req.params.userId || req.headers.userId;
  if (!userId) {
    return res.status(400).send({ message: "User ID not provided" });
  }

  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
  } catch (e) {
    console.error("hey", e.message);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting user" });
  }

  let connection;
  try {
    connection = await Connection.findOne({ user: userId });
    // console.log("connections", connection);
    if (!connection) {
      return res.status(400).send({ message: "No connections found here" });
    }
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting connections" });
  }

  const limit = parseInt(req.query.limit) || 10; // Default to 10 connections per page
  const page = parseInt(req.query.page) || 1; // Default to first page

  let userlistbp = [];
  let userlistcc = [];
  let userlistep = [];

  try {
    const ccIds = connection.connections.filter(
      (id) =>
        !userlistcc.includes(id) &&
        !userlistep.includes(id) &&
        !userlistbp.includes(id) &&
        user._id.toString() !== id.toString()
    );
    userlistcc = await User.find({
      _id: { $in: ccIds },
      role: "Content Creator",
    })
      .populate("influencer")
      .skip((page - 1) * limit)
      .limit(limit);
    const epIds = connection.connections.filter(
      (id) =>
        !userlistcc.includes(id) &&
        !userlistep.includes(id) &&
        !userlistbp.includes(id) &&
        user._id.toString() !== id.toString()
    );
    userlistep = await User.find({ _id: { $in: epIds }, role: "Entrepreneur" })
      .populate("entrepreneurprofile")
      .skip((page - 1) * limit)
      .limit(limit);
    const bpIds = connection.connections.filter(
      (id) =>
        !userlistcc.includes(id) &&
        !userlistep.includes(id) &&
        !userlistbp.includes(id) &&
        user._id.toString() !== id.toString()
    );
    userlistbp = await User.find({ _id: { $in: bpIds }, role: "Business" })
      .populate("businessprofile")
      .skip((page - 1) * limit)
      .limit(limit);
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting connections" });
  }

  const response = {
    contentcreator: userlistcc,
    business: userlistbp,
    entrepreneur: userlistep,
    page: page,
    limit: limit,
    total: connection.connections.length,
  };

  return res.status(200).send(response);
};

exports.sendConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  const { id } = req.body;

  let friend;

  try {
    friend = await User.findById(id);
    console.log("friend", friend);
  } catch (e) {
    return res.status(500).send({
      message: "Friend not found",
    });
  }

  let connectionRequestExists;

  try {
    // check if the connection request already exists in either direction
    connectionRequestExists = await ConnectionRequest.findOne({
      $or: [
        { sender: friend._id, receiver: user._id },
        { sender: user._id, receiver: friend._id },
      ],
    });
    if (connectionRequestExists) {
      return res.status(400).send({
        message: "Connection request already exists",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Connection request failed",
    });
  }

  let newConnectionRequest = new ConnectionRequest({
    sender: user._id,
    receiver: friend._id,
    isactive: true,
  });

  try {
    const _request = await newConnectionRequest.save();

    // add notification to receiver's account
    const notification = {
      sender: user._id,
      name: user.name,
      message: `${user.name} sent you a connection request`,
      type: "connection",
      state: false,
      seen: false,
      pic: user.pic,
    };
    friend.notifications.unshift(notification);
    await friend.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Connection request sent successfully",
  });
};

exports.acceptConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  const { friendid } = req.body;

  let friend;

  try {
    friend = await User.findById(friendid);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let connectionrequest;

  try {
    connectionrequest = await ConnectionRequest.find({
      sender: friendid,
      receiver: userId,
    });

    if (connectionrequest.length != 0) {
      connectionrequest[0].isactive = false;
      await connectionrequest[0].save();
    }
  } catch (e) {
    return res.status(500).send({
      message: "Connection request failed",
    });
  }

  function checkConnectionExist(userid, connectionlist) {
    return connectionlist.includes(userid);
  }

  if (user.connectionlist != null) {
    try {
      const tempConnection = await Connection.findById(user.connectionlist);

      if (checkConnectionExist(friendid, tempConnection.connections)) {
        return res.status(500).send({
          message: "Already a connection",
        });
      } else {
        tempConnection.connections.push(friendid);
        await tempConnection.save();
      }
    } catch (e) {
      return res.status(500).send({
        message: "Error adding connection",
      });
    }
  } else {
    try {
      const connectionList = [];
      connectionList.push(friendid);
      const newConnections = new Connection({
        connections: connectionList,
        user: user._id,
      });

      const connections = await newConnections.save();
      // console.log("connections", connections);
      user.connectionlist = connections._id;
      await user.save();
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  if (friend.connectionlist != null) {
    try {
      const tempConnectionFriend = await Connection.findById(
        friend.connectionlist
      );

      if (checkConnectionExist(userId, tempConnectionFriend.connections)) {
        return res.status(500).send({
          message: "Already a connection",
        });
      } else {
        tempConnectionFriend.connections.push(userId);
        await tempConnectionFriend.save();
      }
    } catch (e) {
      return res.status(500).send({
        message: "Error adding connection",
      });
    }
  } else {
    try {
      const connectionListFriend = [];
      connectionListFriend.push(userId);
      const newFriendConnections = new Connection({
        connections: connectionListFriend,
        user: friend._id,
      });

      const connectionsFriend = await newFriendConnections.save();

      friend.connectionlist = connectionsFriend._id;
      await friend.save();
    } catch (e) {
      return res.status(500).send(e);
    }
  }

  return res.status(200).json({
    message: "Connection saved successfully",
  });
};

exports.rejectConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  const { connectionid } = req.body;

  try {
    const connectionRequest = await ConnectionRequest.findById(connectionid);
    if (!connectionRequest) {
      return res.status(404).send({
        message: "Connection request not found",
      });
    }

    connectionRequest.isactive = false;
    await connectionRequest.save();

    // remove the notification from sender's account
    const notification = {
      sender: user._id,
      name: user.name,
      message: `${user.name} rejected your connection request`,
      type: "connection",
      state: false,
    };
    const sender = await User.findById(connectionRequest.sender);
    sender.notifications = sender.notifications.filter(
      (n) => n._id.toString() !== notification._id.toString()
    );
    await sender.save();

    return res.status(200).json({
      message: "Connection rejected successfully",
    });
  } catch (e) {
    return res.status(500).send({
      message: "Connection rejection failed",
    });
  }
};

exports.listactiveConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    console.log(userId);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let connectionrequests = [];

  try {
    connectionrequests = await ConnectionRequest.find({
      receiver: userId,
      is_active: true,
    }).populate("sender");
    // console.log("connectionrequests", connectionrequests);
  } catch (e) {
    return res.status(500).send({
      message: "Connection Request list failed",
    });
  }

  return res.status(200).send({
    connectionrequests,
  });
};

exports.checkConnectionStatus = async (req, res) => {
  let userId;
  let user;
  let friend;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({ message: "User not found" });
  }

  const { friendid } = req.body;

  // console.log(friendid);
  try {
    friend = await User.findById(friendid);
  } catch (e) {
    return res.status(400).send({ message: "Friend not found" });
  }

  // console.log("freind.. ", friend, "user..", user);

  let connectionstatus = false;
  let requestsent = false;
  let requestsentactive = false;
  let requestreceive = false;
  let requestreceiveactive = false;

  function checkConnectionExist(userid, connectionlist) {
    for (let i = 0; i < connectionlist.length; i++) {
      if (String(userid) === String(connectionlist[i])) {
        return true;
      }
    }
    return false;
  }

  // console.log("user.connectionlist... ", user.connectionlist);

  if (user.connectionlist !== null) {
    try {
      const tempConnection = await Connection.findById(user.connectionlist);
      // console.log("tempConnection ...", tempConnection);
      if (
        tempConnection &&
        checkConnectionExist(friendid, tempConnection.connections)
      ) {
        connectionstatus = true;
      } else {
        connectionstatus = false;
      }
    } catch (e) {
      return res.status(500).send({ message: "Error checking connection" });
    }
  } else {
    connectionstatus = false;
  }

  try {
    const connectionRequestSent = await ConnectionRequest.find({
      sender: userId,
      receiver: friendid,
    });
    // console.log("sender...", userId, " receiver....", friendid);
    // console.log("connectionRequestSend...", connectionRequestSent);
    if (connectionRequestSent.length !== 0) {
      requestsent = true;
      requestsentactive = connectionRequestSent[0].isactive;
    }
  } catch (e) {
    return res.status(500).send({ message: "Connection Request failed" });
  }

  try {
    const connectionRequestReceived = await ConnectionRequest.find({
      sender: friendid,
      receiver: userId,
    });
    if (connectionRequestReceived.length !== 0) {
      requestreceive = true;
      requestreceiveactive = connectionRequestReceived[0].isactive;
    }
  } catch (e) {
    return res
      .status(500)
      .send({ message: "Connection Request failed while friendid" });
  }

  return res.status(200).json({
    connectionstatus,
    requestsent,
    requestsentactive,
    requestreceive,
    requestreceiveactive,
  });
};

exports.addConnection = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendid } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const friend = await User.findById(friendid);
    if (!friend) {
      return res.status(400).send({
        message: "Friend not found",
      });
    }

    // Update user's connection list
    let connection = await Connection.findById(user.connectionlist);
    if (!connection) {
      connection = new Connection({
        connections: [friendid],
        user: user._id,
      });
      await connection.save();
      user.connectionlist = connection._id;
    } else {
      connection.connections.push(friendid);
      await connection.save();
    }

    // Update friend's connection list
    let friendConnection = await Connection.findById(friend.connectionlist);
    if (!friendConnection) {
      friendConnection = new Connection({
        connections: [userId],
        user: friendid,
      });
      await friendConnection.save();
      friend.connectionlist = friendConnection._id;
    } else {
      friendConnection.connections.push(userId);
      await friendConnection.save();
    }

    // Update connection request status
    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { sender: userId, reciever: friendid },
        { sender: friendid, reciever: userId },
      ],
    });
    if (connectionRequests.length > 0) {
      connectionRequests.forEach(async (request) => {
        request.isactive = false;
        await request.save();
      });
    }
    for (let i = 0; i < user.notifications.length; i++) {
      if (String(user.notifications[i].sender) === String(friend._id)) {
        user.notifications[i].state = true;
        user.notifications[i].seen = false;
      }
      console.log(user.notifications[i]);
    }
    await user.save();
    // Send notification to friend
    const notification = {
      type: "connection",
      sender: userId,
      message: `${user.name} has added you as a connection.`,
      name: user.name,
      state: false,
      seen: false, 
    };

    friend.notifications.push(notification);
    await friend.save();

    return res.status(200).send({
      message: "Connection added",
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

exports.removeFriend = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId } = req.body;

    console.log("check", userId, friendId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(400).send({
        message: "Friend not found",
      });
    }

    // Remove friend from user's connection list
    const userConnection = await Connection.findById(user.connectionlist);
    if (!userConnection) {
      return res.status(400).send({
        message: "User connection list not found",
      });
    }

    const friendIndex = userConnection.connections.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).send({
        message: "Friend not found in user's connection list",
      });
    }

    userConnection.connections.splice(friendIndex, 1);
    await userConnection.save();

    // Remove user from friend's connection list
    const friendConnection = await Connection.findById(friend.connectionlist);
    if (!friendConnection) {
      return res.status(400).send({
        message: "Friend connection list not found",
      });
    }

    const userIndex = friendConnection.connections.indexOf(userId);
    if (userIndex === -1) {
      return res.status(400).send({
        message: "User not found in friend's connection list",
      });
    }

    friendConnection.connections.splice(userIndex, 1);
    await friendConnection.save();

    return res.status(200).send({
      message: "Friend removed from connection list",
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

exports.removeFriend = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { friendId } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const friend = await User.findById(friendId);
    if (!friend) {
      return res.status(400).send({
        message: "Friend not found",
      });
    }

    // Remove friend from user's connection list
    const userConnection = await Connection.findById(user.connectionlist);
    if (!userConnection) {
      return res.status(400).send({
        message: "User connection list not found",
      });
    }

    const friendIndex = userConnection.connections.indexOf(friendId);
    if (friendIndex === -1) {
      return res.status(400).send({
        message: "Friend not found in user's connection list",
      });
    }

    userConnection.connections.splice(friendIndex, 1);
    await userConnection.save();

    // Remove user from friend's connection list
    const friendConnection = await Connection.findById(friend.connectionlist);
    if (!friendConnection) {
      return res.status(400).send({
        message: "Friend connection list not found",
      });
    }

    const userIndex = friendConnection.connections.indexOf(userId);
    if (userIndex === -1) {
      return res.status(400).send({
        message: "User not found in friend's connection list",
      });
    }

    friendConnection.connections.splice(userIndex, 1);
    await friendConnection.save();

    return res.status(200).send({
      message: "Friend removed from connection list",
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

exports.unsendActiveConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  const { id } = req.body;

  let connectionRequest;

  try {
    // find the connection request by ID
    connectionRequest = await ConnectionRequest.findById(id);
    if (!connectionRequest) {
      return res.status(400).send({
        message: "Connection request not found",
      });
    }

    // check if the connection request is active
    if (!connectionRequest.isactive) {
      return res.status(400).send({
        message: "Connection request is not active",
      });
    }

    // check if the connection request was sent by the current user
    if (connectionRequest.sender.toString() !== userId) {
      return res.status(400).send({
        message: "You are not authorized to unsend this connection request",
      });
    }

    // delete the connection request if it's not accepted
    if (!connectionRequest.is_accepted) {
      await connectionRequest.delete();
      // Update requestsentactive to false
      user.requestsentactive = false;
      await user.save();

      return res.status(200).json({
        message: "Connection request unsent successfully",
      });
    } else {
      return res.status(400).send({
        message: "Connection request already accepted by receiver",
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Failed to unsend connection request",
    });
  }
};

exports.listActiveConnectionRequests = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let connectionRequests;

  try {
    // find all active connection requests where the sender is the current user
    connectionRequests = await ConnectionRequest.find({
      sender: user._id,
      is_active: true,
      is_accepted: false,
    }).populate("receiver", "name email");
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Failed to list connection requests",
    });
  }

  return res.status(200).json(connectionRequests);
};

exports.listActiveConnectionRequestsFromOthers = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let connectionRequests;

  try {
    // find all active connection requests where the sender is not the current user
    connectionRequests = await ConnectionRequest.find({
      sender: { $ne: user._id },
      isactive: true,
      is_accepted: false,
    }).populate("sender", "name email");
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Failed to list connection requests",
    });
  }

  return res.status(200).json(connectionRequests);
};

exports.RejectConnectionRequest = async (req, res) => {
  let userId;
  let user;

  try {
    userId = decodeToken(req, res);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  const { id } = req.body;

  let connectionRequest;

  try {
    connectionRequest = await ConnectionRequest.findById(id);
    if (!connectionRequest) {
      return res.status(400).send({
        message: "Connection request not found",
      });
    }

    if (!connectionRequest.isactive) {
      return res.status(400).send({
        message: "Connection request is not active",
      });
    }

    if (connectionRequest.sender.toString() === userId) {
      return res.status(400).send({
        message: "You cannot reject your own connection request",
      });
    }

    // reject the connection request
    connectionRequest.is_accepted = false;
    connectionRequest.isactive = false;
    await connectionRequest.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send({
      message: "Failed to reject connection request",
    });
  }

  return res.status(200).json({
    message: "Connection request rejected successfully",
  });
};

exports.getUserNotifications = asyncHandler(async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    if (!userId) {
      return res.status(400).send({
        message: "User ID not found in request",
      });
    }

    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: { path: "sender", select: "name" },
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const notifications = user.notifications.map((notification) => ({
      ...notification.toObject(),
      
    }));

    return res.status(200).send({ notifications });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

exports.markNotificationsAsSeen = asyncHandler(async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    if (!userId) {
      return res.status(400).send({
        message: "User ID not found in request",
      });
    }

    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: { path: "sender", select: "name" },
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    user.notifications.forEach((notification) => {
      notification.seen = true;
    });

    await user.save();

    const notifications = user.notifications.map((notification) => ({
      ...notification.toObject(),
      seen: true,
    }));

    return res.status(200).send({ notifications });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});



let lastFetchedNotificationId = null;

exports.getnewUserNotifications = asyncHandler(async (req, res) => {
  try {
    const userId = req.user && req.user._id;
    if (!userId) {
      return res.status(400).send({
        message: "User ID not found in request",
      });
    }

    const user = await User.findById(userId).populate({
      path: "notifications",
      populate: { path: "sender", select: "name" },
    });

    if (!user) {
      return res.status(400).send({
        message: "User not found",
      });
    }

    const notifications = user.notifications;

    const lastNotification = notifications.length > 0 ? notifications[notifications.length - 1] : null;

    if (lastNotification && lastFetchedNotificationId === lastNotification._id.toString()) {
      res.json(null); 
    } else {
      lastFetchedNotificationId = lastNotification ? lastNotification._id.toString() : null;
      res.status(200).send({ notifications: lastNotification ? [lastNotification] : [] });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
