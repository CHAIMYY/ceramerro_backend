const express = require("express");
const router = express.Router();
const { createProduct, updateProduct} = require("../controllers/productController");

router.post('/create', createProduct);
router.put('/update/:id', updateProduct);

module.exports = router;
