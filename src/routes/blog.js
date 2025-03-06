const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { createPost, updatePost, deletePost, addComment, deleteComment} = require('../controllers/blogController');

router.post("/create", createPost); 
router.put("/update/:id", updatePost);
router.delete("/delete/:id", deletePost);
// router.post('/comment/:id',addComment );
// router.delete('/posts/:postId/comments/:commentId', authenticateJWT, deleteComment);


module.exports = router;