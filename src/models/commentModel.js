const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },
  },
  { timestamps: true } 
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
