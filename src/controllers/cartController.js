const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
    try {
        const { user, produit, quantity } = req.body;
        console.log(user, produit, quantity);
        
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



