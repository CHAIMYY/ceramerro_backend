const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [500, 'Excerpt cannot be more than 500 characters']
  },
  content: [
    {
      type: {
        type: String,
        enum: ['paragraph', 'heading', 'image', 'list'],
        required: true
      },
      text: String,
      url: String,
      caption: String,
      items: [String]
    }
  ],
  image: {
    type: String,
    required: [true, 'Please add a featured image']
  },
  category: {
    type: String,
    enum: ['techniques', 'inspiration', 'interviews', 'care', 'history'],
    required: [true, 'Please specify a category']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  readTime: {
    type: String,
    required: [true, 'Please add estimated read time']
  },
  featured: {
    type: Boolean,
    default: false
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  relatedPosts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BlogPost'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});


BlogPostSchema.pre('save', function(next) {
  this.slug = this.title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
  
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);