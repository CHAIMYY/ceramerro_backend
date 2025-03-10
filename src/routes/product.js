const express = require("express");
const router = express.Router();
const { createProduct, updateProduct, deleteProduct} = require("../controllers/productController");

router.post('/create', createProduct);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;
