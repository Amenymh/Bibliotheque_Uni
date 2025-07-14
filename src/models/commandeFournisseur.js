const mongoose = require("mongoose");

const commandeFournisseurSchema = new mongoose.Schema({
  fournisseurId: { type: mongoose.Schema.Types.ObjectId, ref: "Fournisseur" },
  employeId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  dateCommande: { type: Date, default: Date.now },
  statutCommande: { type: String, enum: ["en attente", "en cours", "livrée", "annulée"], default: "en attente" },
  dateLivraisonPrevue: Date,
  dateLivraisonEffective: Date,
  montantTotal: Number,
});

module.exports = mongoose.model("CommandeFournisseur", commandeFournisseurSchema);