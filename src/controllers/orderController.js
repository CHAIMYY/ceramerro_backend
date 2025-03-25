const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

exports.createOrderFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "articles.product",
    );

    if (!cart || cart.articles.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    let ordersByArtisan = {};
    let invalidProducts = [];

    for (let item of cart.articles) {
      const product = item.product;

      if (!product) {
        invalidProducts.push(item);
        continue;
      }

      if (!product.userId) {
        invalidProducts.push({
          productId: product._id,
          name: product.name || "Unknown",
          reason: "Missing artisan information",
        });
        continue;
      }

      const artisanId = product.userId.toString();

      if (!ordersByArtisan[artisanId]) {
        ordersByArtisan[artisanId] = {
          user: userId,
          items: [],
          address: req.body.address || "",
          paymentMethod: req.body.paymentMethod || "credit_card",
          subtotal: 0,
          tax: 0,
          shipping: 0,
          total: 0,
          status: "pending",
        };
      }

      const orderItem = {
        product: product._id,
        quantity: item.quantity,
        price: product.price || 0,
        artisan: artisanId,
      };

      ordersByArtisan[artisanId].items.push(orderItem);
      ordersByArtisan[artisanId].subtotal +=
        item.quantity * (product.price || 0);
    }

    if (Object.keys(ordersByArtisan).length === 0) {
      return res.status(400).json({
        error: "No valid products found in cart",
        invalidProducts: invalidProducts,
      });
    }

    let savedOrders = [];

    for (let artisanId in ordersByArtisan) {
      let order = ordersByArtisan[artisanId];
      order.tax = order.subtotal * 0.1;
      order.shipping = 5;
      order.total = order.subtotal + order.tax + order.shipping;

      const newOrder = new Order(order);
      savedOrders.push(await newOrder.save());
    }

    await Cart.findOneAndUpdate({ user: userId }, { articles: [] });

    const response = { success: true, orders: savedOrders };
    if (invalidProducts.length > 0) {
      response.warnings = {
        message: "Some products could not be included in the order",
        invalidProducts: invalidProducts,
      };
    }

    res.status(201).json(response);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "items.product",
        select: "nom prix images",
      })
      .populate({
        path: "items.artisan",
        select: "firstname lastname",
      });

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;

    const order = await Order.findById(orderId)
      .populate({
        path: "items.product",
        select: "nom prix images description",
      })
      .populate({
        path: "items.artisan",
        select: "firstname lastname email",
      })
      .populate({
        path: "user",
        select: "firstname lastname email",
      });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      order.user._id.toString() !== userId.toString() &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this order" });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (status === "cancelled" && order.status !== "cancelled") {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: item.quantity },
        });
      }
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: error.message });
  }
};
