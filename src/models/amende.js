const mongoose = require("mongoose");

const amendeSchema = new mongoose.Schema({
  pretId: { type: mongoose.Schema.Types.ObjectId, ref: "Pret" },
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  montant: Number,
  motif: String,
  dateCreationAmende: { type: Date, default: Date.now },
  datePaiement: Date,
  statutAmende: { type: String, enum: ["impayée", "payée", "annulée"], default: "impayée" },
});

module.exports = mongoose.model("Amende", amendeSchema);