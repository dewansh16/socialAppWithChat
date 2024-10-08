const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    pnumber: { type: String, required: true },
    role: { type: String },
    writetous: { type: String, required: true },
});

const Contact = model('Contact', contactSchema);

module.exports = Contact;
