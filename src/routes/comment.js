const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { addComment, deleteComment } = require('../controllers/commentController');

router.post('/create/:id',  addComment);
router.delete('/delete/:id',  deleteComment);


module.exports = router;