const express = require('express');
const router = express.Router();
const InfluencerController = require('../controllers/influencer_controller.js');
const { validateToken } = require("../auth/JWT.js");




// router.post('/registerInfluencer', validateToken, InfluencerController.registerInfluencer);
// router.post('/registerInfluencerfrombackend', validateToken, InfluencerController.registerInfluencerfrombackend);
// router.post('/editInfluencer', validateToken, InfluencerController.editInfluencer);
// router.get('/getInfluencers', validateToken, InfluencerController.getInfluencers);
// router.post('/getInfluencersbyId', validateToken, InfluencerController.getInfluencersbyId);
// router.post('/getInfluencersDisbyId', validateToken, InfluencerController.getInfluencersDisbyId);
// router.get('/getInfluencerself', validateToken, InfluencerController.getInfluencerself);

module.exports = router;