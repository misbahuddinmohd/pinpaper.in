const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const authControllers = require('../controllers/authControllers');

// define routes and their corresponding controllers
router.get('/getUser', authControllers.protect, userControllers.getUser);
router.post('/updateUser', authControllers.protect, userControllers.updateUser);
router.get('/getAddress', authControllers.protect, userControllers.getAddress);
router.post('/addAddress', authControllers.protect, userControllers.addAddress);
router.put('/updateAddress', authControllers.protect, userControllers.updateAddress);
router.delete('/deleteAddress/:addressID', authControllers.protect, userControllers.deleteAddress);

module.exports = router;