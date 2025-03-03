const express = require("express");
const router = express.Router();
const { createPost } = require('../controllers/blogController');

router.post("/create", createPost); 


module.exports = router;