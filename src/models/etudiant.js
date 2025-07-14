const mongoose = require("mongoose");

const etudiantSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur", required: true },
  numeroEtudiant: String,
  filiere: String,
  niveauEtude: String,
  maxEmprunts: { type: Number, default: 3 },
});

module.exports = mongoose.model("Etudiant", etudiantSchema);