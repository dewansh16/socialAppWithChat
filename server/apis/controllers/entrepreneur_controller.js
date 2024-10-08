const Joi = require("joi");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const {
  EntrepreneurProfile,
  EntrepreneurDetails,
} = require("../models/entrepreneurprofile.js");
const { Connection } = require("../models/connections.js");

exports.registerEntrepreneur = async (req, res) => {
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

  if (user.entrepreneurprofile != null)
    return res.status(400).send({
      message: "Entrepreneur profile already registered.",
    });
  const {
    name,
    companyname,
    designation,
    website,
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
    cultureidentity,
    earlylife,
    sourceofinterest,
    passionateabout,
    highestleveleducation,
    institute,
    societyorg,
    extracurricular,
    profexpossure,
    profyouwant,
    currdesignation,
    otherjobtitles,
    pastcareer,
    whychoose,
    valuablelessons,
    keysuccess,
    educationalachievement,
    professionalachievement,
    motivation,
    emotion,
    vision,
  } = req.body;

  let newEntrepreneur = new EntrepreneurProfile({
    name: name,
    companyname: companyname,
    companyemail: companyemail,
    designation: designation,
    userid: user._id,
  });

  try {
    const _entrepreneur = await newEntrepreneur.save();
    user.entrepreneurprofile = _entrepreneur._id;
    await user.save();

    newEntrepreneurDetails = new EntrepreneurDetails({
      website: website,
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
      personalques: {
        cultureidentity: cultureidentity,
        earlylife: earlylife,
        sourceofinterest: sourceofinterest,
        passionateabout: passionateabout,
      },
      educationalques: {
        highestleveleducation: highestleveleducation,
        institute: institute,
        societyorg: societyorg,
        extracurricular: extracurricular,
        profexpossure: profexpossure,
        profyouwant: profyouwant,
      },

      workque: {
        currdesignation: currdesignation,
        otherjobtitles: otherjobtitles,
        pastcareer: pastcareer,
        whychoose: whychoose,
        valuablelessons: valuablelessons,
        keysuccess: keysuccess,
      },

      awards: {
        educationalachievement: educationalachievement,
        professionalachievement: professionalachievement,
      },
      background: {
        motivation: motivation,
        emotion: emotion,
        vision: vision,
      },
    });

    const _entrepreneurDetails = await newEntrepreneurDetails.save();

    _entrepreneur.profiledetails = _entrepreneurDetails._id;
    await _entrepreneur.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Entrepreneur details saved successfully",
  });
};
exports.registerEntrepreneurfrombackend = async (req, res) => {
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

  const {
    name,
    companyname,
    designation,
    website,
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
    cultureidentity,
    earlylife,
    sourceofinterest,
    passionateabout,
    highestleveleducation,
    institute,
    societyorg,
    extracurricular,
    profexpossure,
    profyouwant,
    currdesignation,
    otherjobtitles,
    pastcareer,
    whychoose,
    valuablelessons,
    keysuccess,
    educationalachievement,
    professionalachievement,
    motivation,
    emotion,
    vision,
  } = req.body;

  let newEntrepreneur = new EntrepreneurProfile({
    name: name,
    companyname: companyname,
    companyemail: companyemail,
    designation: designation,
    userid: user._id,
  });

  try {
    const _entrepreneur = await newEntrepreneur.save();
    user.entrepreneurprofile = _entrepreneur._id;
    await user.save();

    newEntrepreneurDetails = new EntrepreneurDetails({
      website: website,
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
      personalques: {
        cultureidentity: cultureidentity,
        earlylife: earlylife,
        sourceofinterest: sourceofinterest,
        passionateabout: passionateabout,
      },
      educationalques: {
        highestleveleducation: highestleveleducation,
        institute: institute,
        societyorg: societyorg,
        extracurricular: extracurricular,
        profexpossure: profexpossure,
        profyouwant: profyouwant,
      },

      workque: {
        currdesignation: currdesignation,
        otherjobtitles: otherjobtitles,
        pastcareer: pastcareer,
        whychoose: whychoose,
        valuablelessons: valuablelessons,
        keysuccess: keysuccess,
      },

      awards: {
        educationalachievement: educationalachievement,
        professionalachievement: professionalachievement,
      },
      background: {
        motivation: motivation,
        emotion: emotion,
        vision: vision,
      },
    });

    const _entrepreneurDetails = await newEntrepreneurDetails.save();

    _entrepreneur.profiledetails = _entrepreneurDetails._id;
    await _entrepreneur.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Entrepreneur details saved successfully",
  });
};

exports.editEntrepreneur = async (req, res) => {
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

  if (user.entrepreneurprofile == null)
    return res.status(400).send({
      message: "Entrepreneur profile not registered.",
    });

  let _entrepreneur;
  let _entrepreneurDetails;
  try {
    _entrepreneur = await EntrepreneurProfile.findById(
      user.entrepreneurprofile
    );
    _entrepreneurDetails = await EntrepreneurDetails.findById(
      _entrepreneur.profiledetails
    );
  } catch (e) {
    return res.status(400).send({
      message: "Entrepreneur Profile details not found",
    });
  }

  const {
    name,
    companyname,
    designation,
    website,
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
    cultureidentity,
    earlylife,
    sourceofinterest,
    passionateabout,
    highestleveleducation,
    institute,
    societyorg,
    extracurricular,
    profexpossure,
    profyouwant,
    currdesignation,
    otherjobtitles,
    pastcareer,
    whychoose,
    valuablelessons,
    keysuccess,
    educationalachievement,
    professionalachievement,
    motivation,
    emotion,
    vision,
  } = req.body;

  // let newEntrepreneur = new EntrepreneurProfile({

  _entrepreneur.name = name;
  _entrepreneur.companyname = companyname;
  _entrepreneur.companyemail = companyemail;
  _entrepreneur.designation = designation;
  _entrepreneur.userid = user._id;

  // });

  try {
    await _entrepreneur.save();

    // newEntrepreneurDetails = new EntrepreneurDetails({
    (_entrepreneurDetails.website = website),
      (_entrepreneurDetails.socialmedia = {
        instagram: instagram,
        facebook: facebook,
        linkedin: linkedin,
        twitter: twitter,
      }),
      (_entrepreneurDetails.interests = interests),
      (_entrepreneurDetails.dob = dob),
      (_entrepreneurDetails.location = location),
      (_entrepreneurDetails.nationality = nationality),
      (_entrepreneurDetails.about = about),
      (_entrepreneurDetails.personalques = {
        cultureidentity: cultureidentity,
        earlylife: earlylife,
        sourceofinterest: sourceofinterest,
        passionateabout: passionateabout,
      }),
      (_entrepreneurDetails.educationalques = {
        highestleveleducation: highestleveleducation,
        institute: institute,
        societyorg: societyorg,
        extracurricular: extracurricular,
        profexpossure: profexpossure,
        profyouwant: profyouwant,
      }),
      (_entrepreneurDetails.workque = {
        currdesignation: currdesignation,
        otherjobtitles: otherjobtitles,
        pastcareer: pastcareer,
        whychoose: whychoose,
        valuablelessons: valuablelessons,
        keysuccess: keysuccess,
      }),
      (_entrepreneurDetails.awards = {
        educationalachievement: educationalachievement,
        professionalachievement: professionalachievement,
      }),
      (_entrepreneurDetails.background = {
        motivation: motivation,
        emotion: emotion,
        vision: vision,
      });

    // });

    await _entrepreneurDetails.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Entrepreneur details edited successfully",
  });
};

exports.getEntrepreneurself = async (req, res) => {
  let userId;
  let user;

  console.log("entered getentrepreneurself");
  try {
    userId = decodeToken(req, res);
    console.log(userId);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let entrepreneur;
  console.log(user);

  try {
    entrepreneur = await EntrepreneurProfile.find({
      _id: user.entrepreneurprofile,
    }).populate("profiledetails");
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting =entrepreneur" });
  }

  return res.status(200).send(entrepreneur);
};

exports.getEntrepreneurbyId = async (req, res) => {
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
  let entrepreneur;
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
    entrepreneur = await EntrepreneurProfile.findById(
      friend.entrepreneurprofile
    ).populate("profiledetails");
    console.log(entrepreneur);
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting entrepreneur" });
  }

  return res.status(200).send(entrepreneur);
};

exports.getEntrepreneurProfiles = async (req, res) => {
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

  let entrepreneurprofiles;

  try {
    entrepreneurprofiles = await EntrepreneurProfile.find({
      $nor: [{ _id: user.entrepreneurprofile }],
    }).populate("profiledetails");
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencers" });
  }

  return res.status(200).send(entrepreneurprofiles);
};

exports.getEntrepreneurDisbyId = async (req, res) => {
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

  console.error("entered get entrepreneur by iD");
  const { id } = req.body;

  let entrepreneur;
  let friend;
  try {
    friend = await User.findById(id);
    console.log("friend", friend);
    entrepreneur = await EntrepreneurProfile.findById(
      friend.entrepreneurprofile
    ).populate("profiledetails");
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting entrepreneur" });
  }

  return res.status(200).send(entrepreneur);
};
