const express = require("express");
const router = express.Router();
const { authenticate }  = require('../middleware/authentication');
const { getStatistics } = require('../controllers/adminController');


router.get("/stats", getStatistics)

module.exports = router;