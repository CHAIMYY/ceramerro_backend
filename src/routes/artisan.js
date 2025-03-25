const express = require("express");
const router = express.Router();
const {
  updateProfile,
  getProductsByArtisan,
  getSellerStatistics,
  getArtisanOrders,
  getArtisanProfile,
} = require("../controllers/artisanController");
const { authenticate } = require("../middleware/authentication");

router.put("/updateProfile", authenticate, updateProfile);
router.get("/profile", authenticate, getArtisanProfile);
router.get("/products", authenticate, getProductsByArtisan);
router.get("/stats", authenticate, getSellerStatistics);
router.get("/orders", authenticate, getArtisanOrders);

module.exports = router;
