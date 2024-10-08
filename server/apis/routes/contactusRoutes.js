const express = require("express");
const router = express.Router();
const Contact = require('../models/contactus.js');
const sgMail = require("@sendgrid/mail");
const { createTokens } = require("../auth/JWT.js");
const { verify } = require("jsonwebtoken");
require('dotenv').config();
SENDGRID_API_KEY='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'
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


router.post('/contact', async (req, res) => {
    try {
      const { fullname, email, pnumber, role, writetous } = req.body;
  
     
      const newContact = new Contact({
        fullname,
        email,
        pnumber,
        role,
        writetous
      });
  
      
      await newContact.save();
  
      
      const msg = {
        to: 'rishu@prandit.com',
        from: process.env.EMAIL,
        subject: 'New Contact Form Submission',
        html: `
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${fullname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone Number:</strong> ${pnumber}</p>
          <p><strong>Role:</strong> ${role}</p>
          <p><strong>Message:</strong> ${writetous}</p>
        `,
      };
      await sgMail.send(msg);
  
      res.status(201).json({ message: 'Contact form data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while saving contact form data' });
    }
  });
  
  module.exports = router;
