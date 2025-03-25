const User = require("../models/userModel");
const Product = require("../models/productModel");
const Blog = require("../models/blogModel");

exports.getStatistics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: "artisan" });
    const totalClients = await User.countDocuments({ role: "client" });
    const totalProducts = await Product.countDocuments();
    const totalPosts = await Blog.countDocuments();

    res.status(200).json({
      userStatistics: {
        totalUsers,
        totalClients,
      },
      contentStatistics: {
        totalProducts,
        totalPosts,
      },
    });
  } catch (error) {
    console.error("Error fetching website statistics:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const { role } = req.query;
    const query = role ? { role } : {};

    const users = await User.find(query).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.banUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isBanned: true },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error banning user:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.unbanUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(
      id,
      { isBanned: false },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error unbanning user:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.createBlogPost = async (req, res) => {
  try {
    const adminUser = await User.findOne({ role: "admin" });

    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    const newPost = new Blog({
      ...req.body,
      creator: adminUser._id,
      datePublication: new Date(),
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedPost = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Blog.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ message: error.message });
  }
};
