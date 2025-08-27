const mongoose = require("mongoose");

const fournisseurSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  nomEntreprise: { type: String, required: true },
  siret: { type: String },
  adresseEntreprise: { type: String },
  contactPrincipal: { type: String },
  email: { type: String, required: true, unique: true },
  motDePasse: { type: String, required: true },
  telephone: { type: String }
});

module.exports = mongoose.model("Fournisseur",fournisseurSchema);