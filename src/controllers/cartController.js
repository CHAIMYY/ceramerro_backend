const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
    try {
        const { user, produit, quantity } = req.body;
        
        
        let cart = await Cart.findOne({ user: user });

        if (!cart) {
            cart = new Cart({ user: user, articles: [{ produit, quantity }] });
        } else {
            const existingProduct = cart.articles.find(item => item.product === produit);
            
            if (!existingProduct) {
                cart.articles.push({ produit, quantity });
            }
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProductQuantity = async (req, res) => {
    try {
        const { user, product, quantity } = req.body;
      
        let cart = await Cart.findOne({ user: user }).populate('articles.product').exec();

        if (cart) {
            
            const productInCart = cart.articles.find(item => item.product === product);
            
            if (productInCart) {
             
                productInCart.quantity = quantity;

                if (quantity <= 0) {
                    cart.articles = cart.articles.filter(item => article.product._id.toString() !== product);
                }

                await cart.save();

                return res.status(200).json(cart);  
            } else {
                return res.status(404).json({ message: 'Product not found in cart' });
            }
        } else {
            return res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
