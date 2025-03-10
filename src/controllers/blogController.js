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


// exports.deleteComment = async (req, res) => {
//   try {
//     const { postId, commentId } = req.params;
//     const userId = req.user.id;
//     // req.userData.userId
//     const post = await Blog.findById(postId);

//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const comment = post.comments.id(commentId);

//     if (!comment) {
//       return res.status(404).json({ message: "Comment not found" });
//     }

//     if (comment.postedBy.toString() !== userId) {
//       return res
//         .status(403)
//         .json({
//           message: "Unauthorized: You can only delete your own comments",
//         });
//     }

//     post.comments.pull(commentId);

//     await post.save();

//     res.json({ message: "Comment deleted successfully", postId, commentId });
//   } catch (err) {
//     console.error("Error deleting comment:", err);
//     res.status(500).json({ message: "Failed to delete comment" });
//   }
// };


  
 
// exports.deleteComment = async (req, res) => {

//     try {
//       const { postId, commentId } = req.params;
//       console.log(postId, commentId);
//       const userId = req.user._id; 
//       console.log('okkkkkkkkk', userId);
      
    
//       const post = await Blog.findById(postId);
      
//       if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//       }
      
//       const comment = post.comments.id(commentId);
      
//       if (!comment) {
//         return res.status(404).json({ message: "Comment not found" });
//       }
      
//       if (comment.postedBy.toString() !== userId.toString()) {
//         return res.status(403).json({ message: "Unauthorized: You can only delete your own comments" });
//       }
      
//       post.comments.pull(commentId);
      
//       await post.save();
      
//       res.json({ message: "Comment deleted successfully" });
      
//     } catch (err) {
//       console.error("Error deleting comment:", err);
//       res.status(500).json({ message: "Failed to delete comment" });
//     }
//   };


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