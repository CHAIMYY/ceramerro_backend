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

exports.updateProduct =async (req, res)=>{
 try{
   const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
   if(!product) return res.status(404).json({message:'could not find the product'});
    res.json(product);
}catch(err){
        return res.status(500).error({message:'failed updating a product' , error:err})
}
}

exports.deleteProduct =async (req, res)=>{
    try{
      const product = await Product.findByIdAndDelete(req.params.id, req.body);
      if(!product) return res.status(404).json({message:'could not find the product'});
       res.status(201).json({message: 'product deleted succefully'});
   }catch(err){
           return res.status(500).error({message:'failed deleting a product' , error:err})
   }
   }








