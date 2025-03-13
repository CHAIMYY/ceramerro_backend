const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { createPost, updatePost, deletePost, getAllPosts, deleteComment} = require('../controllers/blogController');

router.post("/create",authenticate, createPost); 
router.put("/update/:id", authenticate, updatePost);
router.delete("/delete/:id", authenticate, deletePost);
router.get("/posts", getAllPosts);
// router.post('/comment/:id',addComment );
// router.delete('/posts/:postId/comments/:commentId', authenticateJWT, deleteComment);


module.exports = router;