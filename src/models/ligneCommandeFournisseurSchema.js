const mongoose = require("mongoose");

const ligneCommandeFournisseurSchema = new mongoose.Schema({
  commandeFournisseurId: { type: mongoose.Schema.Types.ObjectId, ref: "CommandeFournisseur" },
  livreId: { type: mongoose.Schema.Types.ObjectId, ref: "Livre" },
  quantite: Number,
  prixUnitaire: Number,
});

module.exports = mongoose.model("LigneCommandeFournisseur", ligneCommandeFournisseurSchema);