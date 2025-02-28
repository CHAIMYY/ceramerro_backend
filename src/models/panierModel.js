const mongoose = require('mongoose');

const PanierSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    articles: [{ produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }, quantite: Number }]
});

const Panier = mongoose.model('Panier' , PanierSchema);

module.exports = Panier;