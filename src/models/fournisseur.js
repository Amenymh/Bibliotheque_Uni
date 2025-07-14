const mongoose = require("mongoose");

const fournisseurSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  nomEntreprise: String,
  siret: String,
  adresseEntreprise: String,
  contactPrincipal: String,
});

module.exports = mongoose.model("Fournisseur", fournisseurSchema);