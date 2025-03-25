const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: true,
      trim: true,
    },
    contenu: {
      type: String,
      required: true,
    },
    postPicture: {
      type: String,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    datePublication: {
      type: Date,
      default: Date.now,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
