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


exports.updatePost = async (req, res) =>{
try{
const updatepost = await Blog.findByIdAndUpdate(req.params.id, req.body, ({new: true}));
if(!updatepost) return res.status(404).json({message: 'could not find post'})
res.json(updatepost);
}catch(err){
    res.status(500).json({message: "failed updating post", error:err});
}
}

exports.deletePost = async (req, res) =>{
    try{
    const deletepost = await Blog.findByIdAndDelete(req.params.id, req.body);
    if(!deletepost) return res.status(404).json({message: 'could not find post'})
    res.json({message:"post deleted"});
    }catch(err){
        res.status(500).json({message: "failed deleting post", error:err});
    }
    }