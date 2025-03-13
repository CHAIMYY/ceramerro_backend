const express = require("express");
const router = express.Router();
const { authenticate, isAdmin }  = require('../middleware/authentication');
const { getStatistics } = require('../controllers/adminController');


router.get("/stats", authenticate, isAdmin, getStatistics)

module.exports = router;