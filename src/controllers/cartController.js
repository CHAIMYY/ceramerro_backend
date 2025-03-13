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
       
        
        const user = req.user._id;
     
        let cart = await Cart.findOne({ user: user });

        if (!cart) {
            console.log("No cart found, creating a new one");
            cart = new Cart({ 
                user: user,
                articles: []
            });
        }
        
        const productIndex = cart.articles.findIndex(item => 
            item.product && item.product.toString() === product
        );
        
        if (productIndex === -1) {
        
            if (quantity > 0) {
                console.log("Adding new product to cart");
                cart.articles.push({ product, quantity });
            } else {
                return res.status(400).json({ message: 'Cannot add product with zero or negative quantity' });
            }
        } else {
            
            if (quantity > 0) {
                console.log("Updating product quantity");
                cart.articles[productIndex].quantity = quantity;
            } else {
              
                console.log("Removing product from cart");
                cart.articles = cart.articles.filter(item => 
                    item.product.toString() !== product
                );
            }
        }

   
        await cart.save();
        
        // await cart.populate('articles.product');
        
        return res.status(200).json(cart);
        
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ error: error.message });
    }
};
exports.removeFromCart = async (req, res) => {
    try {
        const productId = req.body.product;

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
            item.product.toString() !== productId.toString());
        
        console.log("Cart articles after filter:", JSON.stringify(cart.articles, null, 2));
        
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