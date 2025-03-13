const express = require("express");
const router = express.Router();
const { createOrderFromCart } = require('../controllers/orderController');
const { authenticate }  = require('../middleware/authentication');

router.post("/placeOrder",authenticate, createOrderFromCart  );



module.exports = router;