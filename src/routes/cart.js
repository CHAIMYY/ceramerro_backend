const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { addToCart } = require('../controllers/cartController');


router.post("/create", addToCart)

module.exports = router;