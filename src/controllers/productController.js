const Product = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const userId = req.user._id;

    console.log("userId makaynch");
    console.log("userId create", userId);

    const product = new Product({ ...req.body, userId });

    await product.save();
    return res.status(201).json(product);
  } catch (err) {
    return (
      res
        .status(500)
        // .json({ message: "failed creating a product", error: err });
        .json({
          message: "Failed creating a product",
          error: err.message || err,
        })
    );
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product)
      return res.status(404).json({ message: "could not find the product" });
    res.json(product);
  } catch (err) {
    return res
      .status(500)
      .error({ message: "failed updating a product", error: err });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id, req.body);
    if (!product)
      return res.status(404).json({ message: "could not find the product" });
    res.status(201).json({ message: "product deleted succefully" });
  } catch (err) {
    return res
      .status(500)
      .error({ message: "failed deleting a product", error: err });
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * limit;

    const total = await Product.countDocuments();
    const products = await Product.find()
      .skip(skip)
      .limit(limit)
      .populate("userId", "name");

    res.json({
      products,
      total,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching products list", error: err });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
};
