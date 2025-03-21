const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { addComment, deleteComment, getcomments } = require('../controllers/commentController');

router.post('/create/:id',authenticate,  addComment);
router.delete('/delete/:id',authenticate,  deleteComment);
router.get('/comments/:id',  getcomments);


module.exports = router;