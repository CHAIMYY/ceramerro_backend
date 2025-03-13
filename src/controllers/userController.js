const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");


exports.register = async function (req, res) {
  try {
    const { role } = req.body;
    let newUser;

    if (role === 'client') {
      
      newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'client', 
      });
    } else if (role === 'artisan') {
     
      newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        role: 'artisan', 
        name: req.body.name,
        specialty: req.body.specialty,
        bio: req.body.bio,
        location: req.body.location,
        image: req.body.image,
        gallery: req.body.gallery,
        category: req.body.category,
        featured: req.body.featured,
        socialMedia: req.body.socialMedia,
        process: req.body.process,
      });
    } else {
      return res.status(400).send({ message: 'Invalid role type' });
    }

    newUser.hash_password = bcrypt.hashSync(req.body.password, 10); 

    const user = await newUser.save();

    user.hash_password = undefined;

    return res.json(user);

  } catch (err) {
    console.log("Registration Error: ", err);
    return res.status(400).send({ message: err.message });
  }
};

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.comparePassword(req.body.password)) {
      return res
        .status(401)
        .json({ message: "Authentication failed. Invalid user or password." });
    }

const payload = {

  email: user.email, lastname: user.lastname, firstname: user.firstname, _id: user._id 
}
// console.log(payload);

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET || "RESTFULAPIs"
    );

    return res.json({ token });
  } catch (err) {
    return res.status(500).send({ message: "Error in authentication" });
  }
};

exports.getAllartisans = async (req, res) => {
  try {
    const artisanList = await User.find({ role: "artisan" });
    res.json(artisanList);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching artisans list", error: err });
  }
};

exports.getUserById = async (req, res)=>{};


exports.getAllUsers = async (req, res)=>{};