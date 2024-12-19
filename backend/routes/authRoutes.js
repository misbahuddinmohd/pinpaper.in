const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/authControllers');

// define routes and their corresponding controllers
router.post('/sendOTP', authControllers.sendOTP);
router.post('/verifyOTP', authControllers.verifyOTP);
router.post('/submitDetails', authControllers.submitDetails);
router.get('/verifyJWT', authControllers.verifyJWT);
router.get('/logout', authControllers.logout);

module.exports = router;