const express = require('express');
const router = express.Router();
const EntrepreneurController = require('../controllers/entrepreneur_controller.js');
const { validateToken } = require("../auth/JWT.js");

// router.post('/registerEntrepreneur', validateToken, EntrepreneurController.registerEntrepreneur);
// router.post('/registerEntrepreneurfrombackend', validateToken, EntrepreneurController.registerEntrepreneurfrombackend);
// router.post('/editEntrepreneur', validateToken, EntrepreneurController.editEntrepreneur);
// router.get('/getEntrepreneurself', validateToken, EntrepreneurController.getEntrepreneurself);
// router.post('/getEntrepreneurbyId', validateToken, EntrepreneurController.getEntrepreneurbyId);
// router.post('/getEntrepreneurDisbyId', validateToken, EntrepreneurController.getEntrepreneurDisbyId);
// router.get('/getEntrepreneurProfiles', validateToken, EntrepreneurController.getEntrepreneurProfiles);

module.exports = router;