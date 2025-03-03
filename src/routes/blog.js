const express = require("express");
const router = express.Router();
const { createPost, updatePost, deletePost, addComment} = require('../controllers/blogController');

router.post("/create", createPost); 
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
router.post('/comment/:id',addComment )


module.exports = router;