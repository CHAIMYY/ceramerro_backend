const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler');


// exports.createOrder = async (req, res, next) => {
//   try {
   
//     if (!req.user) {
//       return next(new ErrorHandler('User not authenticated', 401));
//     }

//     const {
//       shippingAddress,
//       paymentMethod,
//       taxRate = 0.05, 
//       shippingRate = 10 
//     } = req.body;

//     // Get the user's cart
//     const cart = await Cart.findOne({ user: req.user._id }).populate({
//       path: 'articles.product',
//       model: 'Product'
//     });

//     if (!cart || cart.articles.length === 0) {
//       return next(new ErrorHandler('No items in cart', 400));
//     }

//     // Transform cart items to order items
//     const orderItems = cart.articles.map(item => {
//       return {
//         product: item.product._id,
//         quantity: item.quantity,
//         price: item.product.price
//       };
//     });

//     // Calculate prices
//     const subtotal = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
//     const tax = subtotal * taxRate;
//     const shipping = shippingRate;
//     const total = subtotal + tax + shipping;

//     // Create the order
//     const order = new Order({
//       user: req.user._id,
//       items: orderItems,
//       shippingAddress,
//       paymentMethod,
//       subtotal,
//       tax,
//       shipping,
//       total,
//       status: 'pending'
//     });

//     // Save the order
//     const savedOrder = await order.save();

//     // Clear the cart after creating order
//     cart.articles = [];
//     await cart.save();

//     res.status(201).json({
//       success: true,
//       order: savedOrder
//     });
//   } catch (error) {
//     console.error('Error creating order:', error);
//     next(new ErrorHandler(error.message, 500));
//   }
// };


exports.createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id; 
    const cart = await Cart.findOne({ user: userId }).populate('articles.product');
    
    if (!cart || cart.articles.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let ordersByArtisan = {};
    let invalidProducts = [];

    for (let item of cart.articles) {
      const product = item.product;
      
      // Skip items with missing product information
      if (!product) {
        invalidProducts.push(item);
        continue;
      }

      // Skip products with missing artisan ID
      if (!product.userId) {
        invalidProducts.push({
          productId: product._id,
          name: product.name || 'Unknown',
          reason: 'Missing artisan information'
        });
        continue;
      }

      const artisanId = product.userId.toString();
      
      if (!ordersByArtisan[artisanId]) {
        ordersByArtisan[artisanId] = {
          user: userId,
          items: [],
          address: req.body.address || '',  // Provide default in case it's missing
          paymentMethod: req.body.paymentMethod || 'credit_card',  // Default value
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          status: 'pending'
        };
      }

      const orderItem = {
        product: product._id,
        quantity: item.quantity,
        price: product.price || 0,  // Default to 0 if price is missing
        artisan: artisanId
      };

      ordersByArtisan[artisanId].items.push(orderItem);
      ordersByArtisan[artisanId].subtotal += item.quantity * (product.price || 0);
    }

    // Check if we have any valid orders to process
    if (Object.keys(ordersByArtisan).length === 0) {
      return res.status(400).json({ 
        error: 'No valid products found in cart',
        invalidProducts: invalidProducts
      });
    }

    let savedOrders = [];

    for (let artisanId in ordersByArtisan) {
      let order = ordersByArtisan[artisanId];
      order.tax = order.subtotal * 0.1; // Example: 10% tax
      order.shipping = 5; // Fixed shipping fee
      order.total = order.subtotal + order.tax + order.shipping;

      const newOrder = new Order(order);
      savedOrders.push(await newOrder.save());
    }

    // Clear the cart after placing order
    await Cart.findOneAndUpdate({ user: userId }, { articles: [] });

    // Return information about any products that were skipped
    const response = { success: true, orders: savedOrders };
    if (invalidProducts.length > 0) {
      response.warnings = {
        message: 'Some products could not be included in the order',
        invalidProducts: invalidProducts
      };
    }

    res.status(201).json(response);

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};
