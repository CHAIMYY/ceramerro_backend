const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    articles: [{
      product: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'Product'
     },
      quantity: Number
     }]
});

const Cart = mongoose.model('Cart' , CartSchema);

module.exports = Cart;

