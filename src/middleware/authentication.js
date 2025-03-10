const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");



exports.authenticate = async (req, res, next) => {
 
  
  const authHeaders = req.headers["authorization"];
  if (!authHeaders) {
    return next(new ErrorHandler("You Must Log In", 401));
  } 
  try {
    const token = authHeaders.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
   
    req.user = await User.findById(decoded._id); 
    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }
    next();
  } catch (err) {
    next(new ErrorHandler("Token Has Been Changed", 401));
  }
};


const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.sendStatus(403);
    }
    next();
  };