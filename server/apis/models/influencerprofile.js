const mongoose = require('mongoose');

const InfluencerSchema = new mongoose.Schema({

    name: { type: String, required: true },
    companyname: { type: String, required: true },
    designation: { type: String },

    profiledetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'InfluencerDetails',
    }
});

const SocialMediaSchema = new mongoose.Schema({

    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },

});

const InfluencerDetailsSchema = new mongoose.Schema({

    companywebsite: { type: String },
    companyemail: { type: String },
    socialmedia: { type: SocialMediaSchema },
    interests: { type: String },
    dob: { type: String },
    location: { type: String },
    nationality: { type: String },
    about: { type: String, required: true },
    passionateabout: { type: String },
    educationalbackground: { type: String },
    workexperience: { type: String },
    awards: { type: String },



});



module.exports.Influencer = mongoose.model("Influencer", InfluencerSchema);
module.exports.InfluencerDetails = mongoose.model("InfluencerDetails", InfluencerDetailsSchema);