const mongoose = require('mongoose');

const ProduitSchema = new mongoose.Schema({
    nom: String,
    description: String,
    prix: Number,
    stock: Number,
    categorie: String,
    images: [String]
});

const Product = mongoose.model('Product' , ProduitSchema);

module.exports = Product;