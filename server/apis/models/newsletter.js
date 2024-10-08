const mongoose = require('mongoose');


const NewsletterSchema = new mongoose.Schema({

    content: { type: String, required: true },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});



module.exports.Newsletter = mongoose.model("Newsletter", NewsletterSchema);