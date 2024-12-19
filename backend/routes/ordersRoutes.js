const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/ordersControllers');
const authControllers = require('../controllers/authControllers');

router.get('/getOrders', authControllers.protect, ordersControllers.getOrders);
router.post('/addToCart', authControllers.protect, ordersControllers.addToCart);
router.post('/submitOrder', authControllers.protect, ordersControllers.submitOrder);
router.get('/priceTest', ordersControllers.priceTest);

router.post('/dev/addDeliveryTypes', ordersControllers.addDeliveryTypes);
router.post('/dev/addOrderDeliveryDetails', ordersControllers.addOrderDeliveryDetails);

module.exports = router;