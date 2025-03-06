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
      const { user, produit } = req.body;
      let cart = await Cart.findOne({ user: user });
      
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
      
      const produitId = produit;
      console.log("Product ID to remove:", produitId);
      
     
      const productField = cart.articles[0].product ? 'product' : '_id';
      
    
      const updatedArticles = cart.articles.filter(item => {
       
        const itemId = item[productField] ? item[productField].toString() : item[productField];
        return itemId !== produitId;
      });
      
      console.log("Updated articles:", updatedArticles);
      
      if (updatedArticles.length === cart.articles.length) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
      
      cart.articles = updatedArticles;
      await cart.save();
      
      return res.status(200).json({ message: 'Product removed successfully', cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };