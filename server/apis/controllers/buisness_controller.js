const Joi = require("joi");
const {
  BuisnessProfile,
  BuisnessProfileDetails,
} = require("../models/buisnessprofile.js");
const User = require("../models/user.js");
const { decodeToken } = require("../auth/JWT.js");
const { Connection } = require("../models/connections.js");

exports.editBuisnessProfile = async (req, res) => {
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

  let _buisness;
  let _buisnessDetails;
  try {
    _buisness = await BuisnessProfile.findById(user._buisnessprofile);
    _buisnessDetails = await BuisnessDetails.findById(_buisness.profiledetails);
  } catch (e) {
    return res.status(400).send({
      message: "Buisness Profile details not found",
    });
  }

  const {
    brandname,
    buisness_as,
    company_type,
    locations,
    hcity,
    hstate,
    hpincode,
    year_established,
    websitelink,
    smfacebook,
    sminstagram,
    smlinkedin,
    smtwitter,
    usp,
    bmodel,
    bsize,
    coi,
    gstin,
    pan,
    bdomain,
    motive,
    taudience,
    competitors,
    r_n_d,
    awards,
    recognition,
    collabration,
    print_media,
    online,
    revenue,
    growth,
    nooffundraised,
    valuation,
    marketshare,
    invname,
    invemail,
    invqual,
    invhobbies,
    invdesignation,
    invstake,
    sname,
    sdesc,
    slink,
    sspecs,
  } = req.body;

  // let newBuisness = new BuisnessProfile({

  _buisness.brandname = brandname;

  // });

  try {
    await _buisness.save();

    // newBuisnessDetails = new BuisnessProfileDetails({
    (_buisnessDetails.buisness_as = buisness_as),
      (_buisnessDetails.company_type = company_type),
      (_buisnessDetails.locations = locations),
      (_buisnessDetails.headquarter = {
        city: hcity,
        pincode: hpincode,
        state: hstate,
      }),
      (_buisnessDetails.websitelink = websitelink),
      (_buisnessDetails.socialmedia = {
        facebook: smfacebook,
        twitter: smtwitter,
        instagram: sminstagram,
        linkedin: smlinkedin,
      }),
      (_buisnessDetails.usp = usp),
      (_buisnessDetails.bmodel = bmodel),
      (_buisnessDetails.coi = coi),
      (_buisnessDetails.gstin = gstin),
      (_buisnessDetails.pan = pan),
      (_buisnessDetails.bdomain = bdomain),
      (_buisnessDetails.motive = motive),
      (_buisnessDetails.taudience = taudience),
      (_buisnessDetails.competitors = competitors),
      (_buisnessDetails.r_n_d = r_n_d),
      (_buisnessDetails.awards = awards),
      (_buisnessDetails.recognition = recognition),
      (_buisnessDetails.collabration = collabration),
      (_buisnessDetails.print_media = print_media),
      (_buisnessDetails.online = online),
      (_buisnessDetails.revenue = revenue),
      (_buisness.growth = growth),
      (_buisnessDetails.fundraised = {
        amount: nooffundraised,
        valuation: valuation,
      }),
      (_buisnessDetails.marketshare = marketshare),
      (_buisnessDetails.investors = {
        name: invname,
        emailid: invemail,
        qualifications: invqual,
        hobbies: invhobbies,
        designation: invdesignation,
        stake: invstake,
      }),
      (_buisnessDetails.services = {
        name: sname,
        desciption: sdesc,
        link: slink,
        otherinfo: sspecs,
      }),
      // });

      await _buisnessDetails.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Buisness Profile details edited successfully",
  });
};

exports.registerBuisnessProfile = async (req, res) => {
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
    brandname,
    buisness_as,
    company_type,
    locations,
    hcity,
    hstate,
    hpincode,
    year_established,
    websitelink,
    smfacebook,
    sminstagram,
    smlinkedin,
    smtwitter,
    usp,
    bmodel,
    bsize,
    coi,
    gstin,
    pan,
    bdomain,
    motive,
    taudience,
    competitors,
    r_n_d,
    awards,
    recognition,
    collabration,
    print_media,
    online,
    revenue,
    growth,
    nooffundraised,
    valuation,
    marketshare,
    invname,
    invemail,
    invqual,
    invhobbies,
    invdesignation,
    invstake,
    sname,
    sdesc,
    slink,
    sspecs,
  } = req.body;

  let newBuisness = new BuisnessProfile({
    brandname: brandname,
    userid: user._id,
  });

  try {
    const _buisness = await newBuisness.save();
    user.buisnessprofile = _buisness._id;
    await user.save();

    newBuisnessDetails = new BuisnessProfileDetails({
      buisness_as: buisness_as,
      company_type: company_type,
      locations: locations,
      headquarter: { city: hcity, pincode: hpincode, state: hstate },
      websitelink: websitelink,
      socialmedia: {
        facebook: smfacebook,
        twitter: smtwitter,
        instagram: sminstagram,
        linkedin: smlinkedin,
      },
      usp: usp,
      bmodel: bmodel,
      coi: coi,
      gstin: gstin,
      pan: pan,
      bdomain: bdomain,
      motive: motive,
      taudience: taudience,
      competitors: competitors,
      r_n_d: r_n_d,
      awards: awards,
      recognition: recognition,
      collabration: collabration,
      print_media: print_media,
      online: online,
      revenue: revenue,
      growth: growth,
      fundraised: { amount: nooffundraised, valuation: valuation },
      marketshare: marketshare,
      investors: {
        name: invname,
        emailid: invemail,
        qualifications: invqual,
        hobbies: invhobbies,
        designation: invdesignation,
        stake: invstake,
      },
      services: {
        name: sname,
        desciption: sdesc,
        link: slink,
        otherinfo: sspecs,
      },
    });

    const _buisnessDetails = await newBuisnessDetails.save();

    _buisness.profiledetails = _buisnessDetails._id;
    await _buisness.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Buisness Profile details saved successfully",
  });
};

exports.registerBuisnessProfilefrombackend = async (req, res) => {
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
    brandname,
    buisness_as,
    company_type,
    locations,
    hcity,
    hstate,
    hpincode,
    year_established,
    websitelink,
    smfacebook,
    sminstagram,
    smlinkedin,
    smtwitter,
    usp,
    bmodel,
    bsize,
    coi,
    gstin,
    pan,
    bdomain,
    motive,
    taudience,
    competitors,
    r_n_d,
    awards,
    recognition,
    collabration,
    print_media,
    online,
    revenue,
    growth,
    nooffundraised,
    valuation,
    marketshare,
    invname,
    invemail,
    invqual,
    invhobbies,
    invdesignation,
    invstake,
    sname,
    sdesc,
    slink,
    sspecs,
  } = req.body;

  if (user.buisnessprofile != null)
    return res.status(400).send({
      message: "Buisness profile already registered.",
    });

  let newBuisness = new BuisnessProfile({
    brandname: brandname,
    userid: user._id,
  });

  try {
    const _buisness = await newBuisness.save();

    newBuisnessDetails = new BuisnessProfileDetails({
      buisness_as: buisness_as,
      company_type: company_type,
      locations: locations,
      headquarter: { city: hcity, pincode: hpincode, state: hstate },
      websitelink: websitelink,
      socialmedia: {
        facebook: smfacebook,
        twitter: smtwitter,
        instagram: sminstagram,
        linkedin: smlinkedin,
      },
      usp: usp,
      bmodel: bmodel,
      coi: coi,
      gstin: gstin,
      pan: pan,
      bdomain: bdomain,
      motive: motive,
      taudience: taudience,
      competitors: competitors,
      r_n_d: r_n_d,
      awards: awards,
      recognition: recognition,
      collabration: collabration,
      print_media: print_media,
      online: online,
      revenue: revenue,
      growth: growth,
      fundraised: { amount: nooffundraised, valuation: valuation },
      marketshare: marketshare,
      investors: {
        name: invname,
        emailid: invemail,
        qualifications: invqual,
        hobbies: invhobbies,
        designation: invdesignation,
        stake: invstake,
      },
      services: {
        name: sname,
        desciption: sdesc,
        link: slink,
        otherinfo: sspecs,
      },
    });

    const _buisnessDetails = await newBuisnessDetails.save();

    _buisness.profiledetails = _buisnessDetails._id;
    await _buisness.save();
  } catch (e) {
    console.log(e.message);
    return res.status(500).send(e);
  }

  return res.status(200).json({
    message: "Buisness Profile details saved successfully",
  });
};

exports.getBuisnessself = async (req, res) => {
  let userId;
  let user;
  console.log("entered getbuisnessself");
  try {
    userId = decodeToken(req, res);
    console.log(userId);
    user = await User.findById(userId);
  } catch (e) {
    return res.status(500).send({
      message: "User not found",
    });
  }

  let buisness;
  console.log(user);

  try {
    buisness = await BuisnessProfile.find({
      _id: user.buisnessprofile,
    }).populate("profiledetails");
    console.log(buisness);
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting buisness profile" });
  }

  return res.status(200).send(buisness);
};

exports.getBuisnessbyId = async (req, res) => {
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

  console.error("entered getbuisness by iD");
  const { id } = req.body;
  let buisness;
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
    buisness = await BuisnessProfile.findOne(friend.buisnessprofile).populate(
      "profiledetails"
    );
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting buisness" });
  }

  return res.status(200).send(buisness);
};

exports.getBuisnessProfiles = async (req, res) => {
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

  let buisnessprofiles;

  try {
    buisnessprofiles = await BuisnessProfile.find({
      $nor: [{ _id: user.buisnessprofile }],
    }).populate("profiledetails");
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting influencers" });
  }

  return res.status(200).send(buisnessprofiles);
};

exports.getBuisnessDisbyId = async (req, res) => {
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
  let buisness;
  let friend;

  try {
    friend = await User.findById(id);
    console.log("friend", friend);
    buisness = await BuisnessProfile.findById(friend.buisnessprofile).populate(
      "profiledetails"
    );
  } catch (e) {
    console.error(e.body);
    return res
      .status(500)
      .send({ message: "Something went wrong while getting buisness" });
  }

  return res.status(200).send(buisness);
};
