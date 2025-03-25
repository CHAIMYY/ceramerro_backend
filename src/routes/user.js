const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getAllartisans,
  getArtisanById,
} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getAllartisans);
router.get("/getArtisan/:id", getArtisanById);

module.exports = router;
