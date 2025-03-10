const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    stock: Number,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },

    stock: {
      type: Number,
      required: [true, 'Please add stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 0
    },
    dimensions: {
      height: Number,
      width: Number,
      depth: Number,
      unit: {
        type: String,
        enum: ['in', 'cm'],
        default: 'in'
      }
    },
    weight: {
      value: Number,
      unit: {
        type: String,
        enum: ['lb', 'kg', 'oz', 'g'],
        default: 'lb'
      }
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'outOfStock'],
      default: 'active'
    },
    featured: {
      type: Boolean,
      default: false
    },
    images: [String],
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);
  

const Product = mongoose.model('Product' , ProduitSchema);

module.exports = Product;