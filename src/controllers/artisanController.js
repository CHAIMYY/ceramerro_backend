const mongoose = require("mongoose");
const Product = require("../models/productModel");



exports.getProductsByArtisan = async (req, res) => {
  try {
   
    const artisanId = req.user._id; 

   
    const products = await Product.find({ userId: artisanId }).populate('category artisan');

    if (!products) {
      return res.status(404).json({ message: 'No products found for this artisan' });
    }

    return res.json(products);

  } catch (err) {
    console.error("Error fetching products: ", err);
    return res.status(500).send({ message: 'Server Error' });
  }
};
