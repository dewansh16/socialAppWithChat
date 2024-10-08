const mongoose = require('mongoose');

const BuisnessProfileSchema = new mongoose.Schema({



    brandname: { type: String, required: true },
    brandlogo: { type: String },
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    profiledetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BuisnessProfileDetails',
    }

});


const HeadquatarSchema = new mongoose.Schema({



    city: { type: String, },
    state: { type: String },
    pincode: { type: String },

});

const SocialMediaSchema = new mongoose.Schema({



    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },

});

const FundRaiseSchema = new mongoose.Schema({



    amount: { type: String },
    valuation: { type: String },

});

const InvestorSchema = new mongoose.Schema({



    name: { type: String },
    emailid: { type: String },
    qualifications: { type: String },
    hobbies: { type: String },
    designation: { type: String },
    stake: { type: String },

});

const ServiceSchema = new mongoose.Schema({



    name: { type: String },
    desciption: { type: String },
    link: { type: String },
    otherinfo: { type: String },

});



const BuisnessProfileDetailsSchema = new mongoose.Schema({
    buisness_as: { type: String },
    company_type: { type: String },
    locations: [{ type: String }],
    headquarter: { type: HeadquatarSchema },
    year_established: { type: String },
    websitelink: { type: String },
    socialmedia: { type: SocialMediaSchema },
    usp: { type: String },
    bmodel: { type: String },
    bsize: { type: String },
    coi: { type: String },
    gstin: { type: String },
    pan: { type: String },
    bdomain: { type: String },
    motive: { type: String },
    taudience: { type: String },
    competitors: { type: String },
    r_n_d: { type: String },
    awards: { type: String },
    recognition: { type: String },
    collabration: { type: String },
    print_media: { type: String },
    online: { type: String },
    revenue: { type: String },
    growth: { type: String },
    fundraised: { type: FundRaiseSchema },
    marketshare: { type: String },
    investors: { type: InvestorSchema },
    services: { type: ServiceSchema },
});




module.exports.BuisnessProfile = mongoose.model("BuisnessProfile", BuisnessProfileSchema);
module.exports.BuisnessProfileDetails = mongoose.model("BuisnessProfileDetails", BuisnessProfileDetailsSchema);