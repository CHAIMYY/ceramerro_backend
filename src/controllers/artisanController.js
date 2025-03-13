const mongoose = require("mongoose");
const Product = require("../models/productModel");
const User = require('../models/userModel'); 
const Blog = require('../models/blogModel'); 
const Order = require('../models/orderModel');

exports.getProductsByArtisan = async (req, res) => {
    try {
        
      if (!req.user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
     
      const artisanId = req.user._id || req.user.id;
      
   
      const products = await Product.find({ userId: artisanId });
      
      res.status(200).json({
        success: true,
        count: products.length,
        products
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };


exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    const updatedFields = {
      firstname: req.body.firstname || user.firstname,
      lastname: req.body.lastname || user.lastname,
      email: req.body.email || user.email,
      bio: req.body.bio || user.bio,
      location: req.body.location || user.location,
      specialty: req.body.specialty || user.specialty,
      category: req.body.category || user.category,
      socialMedia: {
        instagram: req.body.socialMedia?.instagram || user.socialMedia.instagram,
        website: req.body.socialMedia?.website || user.socialMedia.website,
        facebook: req.body.socialMedia?.facebook || user.socialMedia.facebook,
        twitter: req.body.socialMedia?.twitter || user.socialMedia.twitter,
      },
      image: req.body.image || user.image,
      gallery: req.body.gallery || user.gallery,
    };


    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
    });

    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getSellerStatistics = async (req, res) => {
    try {
        const userId = req.user.id; 

      const artisan = await User.findById(userId);
      if (!artisan || artisan.role !== 'artisan') {
        return res.status(404).json({ message: 'Artisan not found or invalid role' });
      }
  
      const totalArtisanProducts = await Product.countDocuments({ userId: artisan._id });
      const totalArtisanPosts = await Blog.countDocuments({ creator: artisan._id });
  
      res.status(200).json({
        sellerStatistics: {
          totalProducts: totalArtisanProducts,
          totalPosts: totalArtisanPosts
        }
      });
    } catch (error) {
      console.error('Error fetching seller statistics:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.getArtisanOrders = async (req, res) => {
    
    
    try {
      const artisanId = req.user._id; 
  console.log('hiiiiii');
      const orders = await Order.find({ 'items.artisan': artisanId })
        .populate('user', 'name email')
        .populate('items.product', 'name price');
  
      res.status(200).json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  


exports.getArtisanPosts= async (req, res)=>{};