const express = require("express");
const router = express.Router();
const { createPost, updatePost } = require('../controllers/blogController');

router.post("/create", createPost); 
router.put("/update/:id", updatePost);


module.exports = router;