const express = require("express");
const router = express.Router();
const { register, login, getAllartisans} = require("../controllers/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/getusers", getAllartisans);




module.exports = router;