const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { addToCart, updateProductQuantity, removeFromCart} = require('../controllers/cartController');


router.post("/add", authenticate, addToCart);
router.put("/quantity", authenticate, updateProductQuantity);
router.delete("/remove", authenticate, removeFromCart)



module.exports = router;