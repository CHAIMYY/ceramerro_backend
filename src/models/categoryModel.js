const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a category name'],
    unique: true,
    trim: true,
   
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
   
  },
  image: String,

  createdAt: {
    type: Date,
    default: Date.now
  }
});


CategorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/\s+/g, '-');
  next();
});

module.exports = mongoose.model('Category', CategorySchema);