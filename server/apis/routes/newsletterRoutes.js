const express = require('express');
const router = express.Router();
const NewsletterController = require('../controllers/newsletter_controller.js');
const { validateToken } = require("../auth/JWT.js");
// router.post('/addNewsletter', validateToken, NewsletterController.addNewsletter);
// router.get('/getNewsletter', validateToken, NewsletterController.getNewsletter);
// router.post('/getNewsletterbyId', validateToken, NewsletterController.getNewsletterbyId);
// router.post('/getNewsletterbyObjId', validateToken, NewsletterController.getNewsletterbyObjId);

module.exports = router;