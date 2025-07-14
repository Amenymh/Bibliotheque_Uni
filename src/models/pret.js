const mongoose = require("mongoose");

const pretSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  exemplaireId: { type: mongoose.Schema.Types.ObjectId, ref: "Exemplaire" },
  employeId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  dateEmprunt: { type: Date, default: Date.now },
  dateRetourPrevue: Date,
  dateRetourEffective: Date,
  statutPret: { type: String, enum: ["en cours", "retourné", "en retard", "perdu"], default: "en cours" },
});

module.exports = mongoose.model("Pret", pretSchema);