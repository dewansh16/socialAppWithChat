const mongoose = require('mongoose');

const EntrepreneurProfileSchema = new mongoose.Schema({

    name: { type: String, required: true },
    companyname: { type: String, required: true },
    companyemail: { type: String, required: true },
    designation: { type: String, required: true },
    profiledetails: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EntrepreneurDetails',
    }

});

const PersonalQueSchema = new mongoose.Schema({



    cultureidentity: { type: String, },
    earlylife: { type: String },
    sourceofinterest: { type: String },
    passionateabout: { type: String },

});

const EducationalQueSchema = new mongoose.Schema({

    highestleveleducation: { type: String, },
    institute: { type: String },
    societyorg: { type: String },
    extracurricular: { type: String },
    profexpossure: { type: String },
    profyouwant: { type: String },

});

const WorkQueSchema = new mongoose.Schema({

    currdesignation: { type: String, },
    otherjobtitles: { type: String },
    pastcareer: { type: String },
    whychoose: { type: String },
    valuablelessons: { type: String },
    keysuccess: { type: String },



});


const SocialMediaSchema = new mongoose.Schema({

    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    twitter: { type: String },

});


const AwardSchema = new mongoose.Schema({

    educationalachievement: { type: String, },
    professionalachievement: { type: String },
    others: { type: String }

});

const BackgroundSchema = new mongoose.Schema({

    motivation: { type: String, },
    emotion: { type: String },
    vision: { type: String },

});


const EntrepreneurDetailsSchema = new mongoose.Schema({

    website: { type: String },
    email: { type: String },
    socialmedia: { type: SocialMediaSchema },
    interests: { type: String },
    dob: { type: String },
    location: { type: String },
    nationality: { type: String },
    about: { type: String },
    personalques: { type: PersonalQueSchema },
    educationalques: { type: EducationalQueSchema },
    workque: { type: WorkQueSchema },
    awards: { type: AwardSchema },
    background: { type: BackgroundSchema }
});



module.exports.EntrepreneurProfile = mongoose.model("EntrepreneurProfile", EntrepreneurProfileSchema);
module.exports.EntrepreneurDetails = mongoose.model("EntrepreneurDetails", EntrepreneurDetailsSchema);