const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate } = require("../middleware/authentication");

// Apply authentication middleware to all cart routes
router.use(authenticate);

// Get user's cart
router.get("/", cartController.getCart);

// Add item to cart
router.post("/add", cartController.addToCart);

// Update item quantity
router.put("/update", cartController.updateCartItem);

// Remove item from cart
router.delete("/remove/:productId", cartController.removeFromCart);

// Clear cart
router.delete("/clear", cartController.clearCart);

module.exports = router;
