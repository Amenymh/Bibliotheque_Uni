const mongoose = require("mongoose");

const utilisateurSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  email: { type: String, unique: true },
  motDePasse: String,
  dateInscription: { type: Date, default: Date.now },
  statut: { type: String, enum: ["actif", "inactif", "suspendu"], default: "actif" },
  role: { type: String, enum: ["etudiant", "employe", "fournisseur"], required: true },
});

module.exports = mongoose.model("Utilisateur", utilisateurSchema);
