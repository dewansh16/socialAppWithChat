const express = require('express');
const router = express.Router();
const BuisnessController = require('../controllers/buisness_controller.js');
const { validateToken } = require("../auth/JWT.js");

// router.post('/registerBuisnessProfile', validateToken, BuisnessController.registerBuisnessProfile);
// router.post('/registerBuisnessProfilefrombackend', validateToken, BuisnessController.registerBuisnessProfilefrombackend);
// router.post('/editBuisnessProfile', validateToken, BuisnessController.editBuisnessProfile);
// router.get('/getBuisnessself', validateToken, BuisnessController.getBuisnessself);
// router.post('/getBuisnessbyId', validateToken, BuisnessController.getBuisnessbyId);
// router.post('/getBuisnessbyDisId', validateToken, BuisnessController.getBuisnessDisbyId);
// router.get('/getBuisnessProfiles', validateToken, BuisnessController.getBuisnessProfiles);

module.exports = router;
