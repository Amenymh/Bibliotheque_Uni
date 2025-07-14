const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  utilisateurId: { type: mongoose.Schema.Types.ObjectId, ref: "Utilisateur" },
  exemplaireId: { type: mongoose.Schema.Types.ObjectId, ref: "Exemplaire" },
  dateReservation: { type: Date, default: Date.now },
  dateExpiration: Date,
  statutReservation: { type: String, enum: ["en attente", "confirmée", "annulée", "expirée", "complétée"], default: "en attente" },
  priorite: { type: Number, default: 1 },
});

module.exports = mongoose.model("Reservation", reservationSchema);