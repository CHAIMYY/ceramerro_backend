const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      trim: true,
      required: [true, 'Name required'],
    },
    lastname: {
      type: String,
      trim: true,
      required: [true, 'Name required'],
    },
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
    },
    role: {
      type: String,
      enum: ['client', 'artisan', 'admin'],
      default: 'client',
    },

   
  
    specialty: {
      type: String,
      trim: true,
      default: null,
    },
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot be more than 1000 characters'],
      default: null, 
    },
    location: {
      type: String,
      default: null, 
    },
    image: {
      type: String,
      default: null, 
    },
    gallery: [
      {
        type: String,
        default: [], 
      },
    ],
    category: {
      type: String,
      enum: ['pottery', 'sculpture', 'tableware', 'other'],
      default: null, 
    },
    featured: {
      type: Boolean,
      default: false,
    },
    socialMedia: {
      instagram: {
        type: String,
        default: null, 
      },
      website: {
        type: String,
        default: null,
      },
      facebook: {
        type: String,
        default: null, 
      },
      twitter: {
        type: String,
        default: null, 
      },
    },
    process: [
      {
        title: String,
        description: String,
        default: [], 
      },
    ],
    
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, 
    },
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
