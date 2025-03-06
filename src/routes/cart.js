const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { addToCart, updateProductQuantity, removeFromCart} = require('../controllers/cartController');


router.post("/create", addToCart);
router.put("/quantity", updateProductQuantity);
router.delete("/remove", removeFromCart)



module.exports = router;