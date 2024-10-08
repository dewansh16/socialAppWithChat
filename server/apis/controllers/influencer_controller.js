const Joi = require("joi");
const {
  Influencer,
  InfluencerDetails,
} = require("../models/influencerprofile.js");
const { Connection } = require("../models/connections.js");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const user = require("../models/user.js");

exports.getInfluencers = async (req, res) => {
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

  let influencers;

  try {
    influencers = await Influencer.find({
      $nor: [{ _id: user.influencer }],
    }).populate("profiledetails");
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencers" });
  }

  return res.status(200).send(influencers);
};

exports.getInfluencersbyId = async (req, res) => {
  let userId;
  let user;

  function checkconnectionexist(userid, connectionlist) {
    // console.log("connection check fuction");

    let i = 0;
    for (i = 0; i < connectionlist.length; i++) {
      console.log(
        "check equality",
        i,
        userid,
        connectionlist[i],
        userid == connectionlist[i]
      );
      if (userid == connectionlist[i]) {
        return true;
      }
    }
    return false;
  }

  try {
    userId = decodeToken(req, res);
    console.log(userId);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  console.error("entered getinfluencer by iD");
  const { id } = req.body;
  let influencers;
  let friend;
  let _tempconnection;

  try {
    _tempconnection = await Connection.findById(user.connectionlist);
    console.log(_tempconnection);
  } catch (e) {
    console.error(e.message);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting connection info" });
  }

  console.log(
    "checkconnection",
    !checkconnectionexist(id, _tempconnection.connections)
  );
  if (!checkconnectionexist(id, _tempconnection.connections)) {
    return res.status(400).send({ message: "user is not a connection" });
  }

  try {
    friend = await User.findById(id);
    console.log("friend", friend);
    influencers = await Influencer.findOne(friend.influencer).populate(
      "profiledetails"
    );
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencer" });
  }

  return res.status(200).send(influencers);
};

exports.getInfluencersDisbyId = async (req, res) => {
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

  console.error("entered getinfluencer by iD");
  const { id } = req.body;

  let influencers;
  let friend;
  try {
    friend = await User.findById(id);
    console.log("friend", friend);
    influencers = await Influencer.findOne(friend.influencer).populate(
      "profiledetails"
    );
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencer" });
  }

  return res.status(200).send(influencers);
};

exports.registerInfluencer = async (req, res) => {
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

  if (user.influencer != null) {
    return res.status(400).send({
      message: "Content creator profile already registered.",
    });
  }

  console.log(req.body);
  const {
    name,
    companyname,
    designation,
    companywebsite,
    companyemail,
    instagram,
    facebook,
    linkedin,
    twitter,
    interests,
    dob,
    location,
    nationality,
    about,
    passionateabout,
    educationalbackground,
    workexperience,
    awards,
  } = req.body;

  let newInfluencer = new Influencer({
    name: name,
    companyname: companyname,
    designation: designation,
    userid: user._id,
  });

  try {
    const _influencer = await newInfluencer.save();

    user.influencer = _influencer._id;
    await user.save();

    newInfluencerDetails = new InfluencerDetails({
      companywebsite: companywebsite,
      companyemail: companyemail,
      socialmedia: {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      },
      interests: interests,
      dob: dob,
      location: location,
      nationality: nationality,
      about: about,
      passionateabout: passionateabout,
      educationalbackground: educationalbackground,
      workexperience: workexperience,
      awards: awards,
    });

    const _influencerDetails = await newInfluencerDetails.save();

    _influencer.profiledetails = _influencerDetails._id;
    await _influencer.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Influencer details saved successfully",
  });
};
exports.registerInfluencerfrombackend = async (req, res) => {
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

  console.log(req.body);
  const {
    name,
    companyname,
    designation,
    companywebsite,
    companyemail,
    instagram,
    facebook,
    linkedin,
    twitter,
    interests,
    dob,
    location,
    nationality,
    about,
    passionateabout,
    educationalbackground,
    workexperience,
    awards,
  } = req.body;

  let newInfluencer = new Influencer({
    name: name,
    companyname: companyname,
    designation: designation,
    userid: user._id,
  });

  try {
    const _influencer = await newInfluencer.save();

    newInfluencerDetails = new InfluencerDetails({
      companywebsite: companywebsite,
      companyemail: companyemail,
      socialmedia: {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      },
      interests: interests,
      dob: dob,
      location: location,
      nationality: nationality,
      about: about,
      passionateabout: passionateabout,
      educationalbackground: educationalbackground,
      workexperience: workexperience,
      awards: awards,
    });

    const _influencerDetails = await newInfluencerDetails.save();

    _influencer.profiledetails = _influencerDetails._id;
    await _influencer.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Influencer details saved successfully",
  });
};

exports.editInfluencer = async (req, res) => {
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

  if (user.influencer == null) {
    return res.status(400).send({
      message: "Content creator profile does not exist",
    });
  }

  let _influencer;
  let _influencerDetails;

  try {
    _influencer = await Influencer.findById(user.influencer);

    _influencerDetails = await InfluencerDetails.findById(
      _influencer.profiledetails
    );
  } catch (e) {
    return res.status(400).send({
      message: "Content Creator details not found",
    });
  }

  console.log(req.body);
  const {
    name,
    companyname,
    designation,
    companywebsite,
    companyemail,
    instagram,
    facebook,
    linkedin,
    twitter,
    interests,
    dob,
    location,
    nationality,
    about,
    passionateabout,
    educationalbackground,
    workexperience,
    awards,
  } = req.body;

  // let newInfluencer = new Influencer({

  _influencer.name = name;
  _influencer.companyname = companyname;
  _influencer.designation = designation;

  // });

  try {
    await _influencer.save();

    // newInfluencerDetails = new InfluencerDetails({
    (_influencerDetails.companywebsite = companywebsite),
      (_influencerDetails.companyemail = companyemail),
      (_influencerDetails.socialmedia = {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      }),
      (_influencerDetails.interests = interests),
      (_influencerDetails.dob = dob),
      (_influencerDetails.location = location),
      (_influencerDetails.nationality = nationality),
      (_influencerDetails.about = about),
      (_influencerDetails.passionateabout = passionateabout),
      (_influencerDetails.educationalbackground = educationalbackground),
      (_influencerDetails.workexperience = workexperience),
      (_influencerDetails.awards = awards),
      // });

      await _influencerDetails.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Influencer details edited successfully",
  });
};

exports.getInfluencerself = async (req, res) => {
  let userId;
  let user;
  console.log("entered getinfluencerself");
  try {
    userId = decodeToken(req, res);
    console.log(userId);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let influencers;
  console.log(user);

  try {
    influencers = await Influencer.find({ _id: user.influencer }).populate(
      "profiledetails"
    );
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencer" });
  }

  return res.status(200).send(influencers);
};
