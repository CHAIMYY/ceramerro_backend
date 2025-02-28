const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    utilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
    dateCommande: Date,
    statut: String,
    articlesCommandes: [{ produit: { type: mongoose.Schema.Types.ObjectId, ref: 'Produit' }, quantite: Number }],
    paiement: { type: mongoose.Schema.Types.ObjectId, ref: 'Paiement' }
});

const Commande = mongoose.model('Commande' , CommandeSchema);

module.exports = Commande;