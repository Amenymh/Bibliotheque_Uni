// src/models/livre.js
const mongoose = require("mongoose");

const livreSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  auteur: { type: String, required: true },
  anneePublication: { type: Number, required: true },
  categorie: { type: mongoose.Schema.Types.ObjectId, ref: "Categorie" },
  imageCouverture: { type: String },
  images: [{ type: String }],
});

module.exports = mongoose.models.Livre || mongoose.model("Livre", livreSchema);