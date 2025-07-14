const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  message: String,
  typeNotification: String,
  dateEnvoi: { type: Date, default: Date.now },
  statutNotification: { type: String, enum: ["envoyée", "lue"], default: "envoyée" },
  lienEntite: String, // ID de prêt ou réservation, par exemple
});

module.exports = mongoose.model("Notification", notificationSchema);