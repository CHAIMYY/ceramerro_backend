const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost} = require('../controllers/blogController');

router.post("/create", createPost); 
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);



module.exports = router;