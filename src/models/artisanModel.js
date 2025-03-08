const mongoose = require('mongoose');

const ArtisanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  specialty: {
    type: String,
    required: [true, 'Please add a specialty'],
    trim: true
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio'],
    maxlength: [1000, 'Bio cannot be more than 1000 characters']
  },
  location: {
    type: String,
    required: [true, 'Please add a location']
  },
  image: {
    type: String,
    required: [true, 'Please add an image']
  },
  gallery: [String],
  category: {
    type: String,
    enum: ['pottery', 'sculpture', 'tableware', 'other'],
    required: [true, 'Please specify a category']
  },
  featured: {
    type: Boolean,
    default: false
  },
  socialMedia: {
    instagram: String,
    website: String,
    facebook: String,
    twitter: String
  },
  process: [
    {
      title: String,
      description: String
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artisan', ArtisanSchema);