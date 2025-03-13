const mongoose = require("mongoose");
const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
    try {
        const { product, quantity } = req.body;

        const user = req.user._id
        
        let cart = await Cart.findOne({ user: user });
       
        console.log(product)
// console.log(cart)
        if (!cart) {
            cart = new Cart({ user: user, articles: [{ product, quantity }] });
            // console.log(cart)
            
        } else {
            const existingProduct = cart.articles.find(item => item.product === product);
            
            if (!existingProduct) {
                cart.articles.push({ product, quantity });
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
        const { product, quantity } = req.body;
      const user = req.user._id
        let cart = await Cart.findOne({ user: user }).populate('articles.product').exec();

        if (cart) {
            
            const productInCart = cart.articles.find(item => item.product === product);

            if (productInCart) {
             
                productInCart.quantity = quantity;

                if (quantity <= 0) {
                    cart.articles = cart.articles.filter(item => item.product._id.toString() !== product);
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

exports.removeFromCart = async (req, res) => {
    try {
     
        const  productId  = req.body.produit;

        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        
        const userId = req.user._id;
        
        let cart = await Cart.findOne({ user: userId });
        
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        
        if (cart.articles.length === 0) {
            return res.status(404).json({ message: 'Cart is already empty' });
        }
        
        const initialLength = cart.articles.length;
        
        cart.articles = cart.articles.filter(item => 
            item._id.toString() !== productId.toString());
        
        if (cart.articles.length === initialLength) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }
        
        await cart.save();
        
        res.status(200).json({
            message: 'Product removed from cart successfully',
            cart
        });
    } catch (error) {
        console.error('Error removing product from cart:', error);
        res.status(500).json({ message: 'Failed to remove product from cart', error: error.message });
    }
};