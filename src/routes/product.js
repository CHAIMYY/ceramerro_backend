const express = require("express");
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
} = require("../controllers/productController");
const { authenticate } = require("../middleware/authentication");

router.post("/create", authenticate, createProduct);
router.put("/update/:id", authenticate, updateProduct);
router.delete("/delete/:id", authenticate, deleteProduct);
router.get("/products", getAllProduct);
router.get("/product/:id", getProductById);

module.exports = router;
