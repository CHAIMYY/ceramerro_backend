const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

exports.createPost = async (req, res) => {
  try {
    const post = new Blog(req.body);
    await post.save();
    return res.json(post);
  } catch (err) {
    res.status(500).json({ message: "failed creating post", error: err });
  }
};
