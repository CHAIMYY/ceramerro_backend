const mongoose = require("mongoose");
const Comment = require("../models/commentModel");
const Blog = require("../models/blogModel");

exports.addComment = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Could not find the post" });
    }

    const { text, postedBy} = req.body; 


    // console.log("===>"+postedBy);

    const postId = req.params.id;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    if (!postedBy) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newComment = new Comment({
      text,
      postedBy,
      postId,
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error adding comment:", err);
    res.status(500).json({ message: "Failed to add comment" });
  }
};



exports.deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("idddddd",id);
    
    const userId = req.body;
    // console.log("useeeeeeer",userId.Id);
    

    const comment = await Comment.findById(id);
    // console.log("commmeeentarioooos",comment.postedBy.toString());
    

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
  
    if (comment.postedBy.toString() !== userId.Id) {
      return res.status(403).json({ message: "You are not authorized to delete this comment" });
    }

    await Comment.findByIdAndDelete(id);

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Failed to delete comment" });
  }
};
