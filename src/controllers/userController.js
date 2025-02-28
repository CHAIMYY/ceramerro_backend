const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

exports.register = async function (req, res) {
    try {
      const newUser = new User(req.body);
      newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
       //10 Salt Rounds
    //   Salt is a random string added to the password before hashing.
      const user = await newUser.save();
      user.hash_password = undefined;
      return res.json(user);
    
    } catch (err) {
      console.log('Registration Error: ', err);
      return res.status(400).send({ message: err.message });
    }
}

exports.login = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
    }

  
    const token = jwt.sign(
      { email: user.email, nom: user.nom, prenom: user.prenom, _id: user._id },
      process.env.JWT_SECRET || "RESTFULAPIs"
    );

    return res.json({ token });

  } catch (err) {
    return res.status(500).send({ message: 'Error in authentication' });
  }
};



exports.getAllartisans= async (req, res) => {
    try {
        const artisanList = await User.find({ role: 'artisan' });
      res.json(artisanList);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching artisans list', error: err });
    }
  };
