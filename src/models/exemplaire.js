const mongoose = require("mongoose");

const exemplaireSchema = new mongoose.Schema({
  livreId: { type: mongoose.Schema.Types.ObjectId, ref: "Livre", required: true },
  codeBarre: { type: String, unique: true },
  statutExemplaire: { type: String, enum: ["disponible", "emprunté", "réservé", "perdu", "en réparation"], default: "disponible" },
  localisation: String,
  dateAcquisition: Date,
  etat: { type: String, enum: ["neuf", "bon", "usagé", "endommagé"], default: "bon" },
});

module.exports = mongoose.model("Exemplaire", exemplaireSchema);