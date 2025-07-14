const mongoose = require("mongoose");

const employeSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  matricule: String,
  departement: String,
  roleEmploye: String, // ex: Bibliothécaire, Admin système
});

module.exports = mongoose.model("Employe", employeSchema);