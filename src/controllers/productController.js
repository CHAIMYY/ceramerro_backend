const mongoose = require('mongoose');
const Product = require('../models/productModel');


exports.createProduct =async (req, res)=>{

try{
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);
}catch(err){
    return res.status(500).error({message:'failed creating a product' , error:err})
}
}






