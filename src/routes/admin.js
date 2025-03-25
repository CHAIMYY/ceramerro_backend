const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/stats", adminController.getStatistics);

// Products
router.get("/products", adminController.getAllProducts);
router.put("/products/:id", adminController.updateProduct);
router.delete("/products/:id", adminController.deleteProduct);

// Users
router.get("/users", adminController.getUsers);
router.put("/users/:id/ban", adminController.banUser);
router.put("/users/:id/unban", adminController.unbanUser);

router.get("/blog", adminController.getAllBlogPosts);
router.post("/blog", adminController.createBlogPost);
router.put("/blog/:id", adminController.updateBlogPost);
router.delete("/blog/:id", adminController.deleteBlogPost);

module.exports = router;
