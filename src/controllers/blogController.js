const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

exports.createPost = async (req, res) => {
  try {
    console.log(req.user);
    
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }
   
    const post = new Blog({
      ...req.body,
      creator: req.user._id
    });
    
    
    const savedPost = await post.save();
    
   
    return res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating product:", err);
   
    return res
      .status(500)
      .json({ message: "Failed creating a product", error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatepost = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatepost)
      return res.status(404).json({ message: "could not find post" });
    res.json(updatepost);
  } catch (err) {
    res.status(500).json({ message: "failed updating post", error: err });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const deletepost = await Blog.findByIdAndDelete(req.params.id, req.body);
    if (!deletepost)
      return res.status(404).json({ message: "could not find post" });
    res.json({ message: "post deleted" });
  } catch (err) {
    res.status(500).json({ message: "failed deleting post", error: err });
  }
};

exports.likeBlogPost = async (req, res, next) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id);

    if (!blogPost) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    // Check if the post has already been liked by this user
    if (blogPost.likes.includes(req.user.id)) {
      // Unlike the post
      const removeIndex = blogPost.likes.indexOf(req.user.id);
      blogPost.likes.splice(removeIndex, 1);
    } else {
      // Like the post
      blogPost.likes.push(req.user.id);
    }

    await blogPost.save();

    res.status(200).json({
      success: true,
      data: blogPost
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllPosts = async (req, res)=>{};