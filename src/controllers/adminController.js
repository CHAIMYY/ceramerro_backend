const mongoose = require("mongoose");
const User = require("../models/userModel");
const Product = require("../models/productModel");
const Blog = require("../models/blogModel")

exports.getStatistics = async (req, res)=> {
    try {

      const totalUsers = await User.countDocuments({ role: 'artisan' });
      const totalClients = await User.countDocuments({ role: 'client'});
      const totalProducts = await Product.countDocuments();
      const totalPosts = await Blog.countDocuments();
     
     

      res.status(200).json({
        userStatistics: {
          totalUsers,
          totalClients,
        },
        contentStatistics: {
            totalProducts,
            totalPosts
        }
      });
    } catch (error) {
      console.error('Error fetching website statistics:', error);
      res.status(500).json({ message: error.message });
    }
  };

exports.banUsers = async (res, req)=> {};

exports.featureArtisan = async (req, res)=>{};
