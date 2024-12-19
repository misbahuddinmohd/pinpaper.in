const express = require('express');
const router = express.Router();
const cartControllers = require('../controllers/cartControllers');
const authControllers = require('../controllers/authControllers');

// define routes and their corresponding controllers
router.post('/addToCart', authControllers.protect, cartControllers.addToCart);
router.get('/getCartItems', authControllers.protect, cartControllers.getCartItems);
router.put('/updateCartItem', authControllers.protect, cartControllers.updateCartItem);
router.delete('/deleteCartItem',  authControllers.protect, cartControllers.deleteCartItem);

module.exports = router;