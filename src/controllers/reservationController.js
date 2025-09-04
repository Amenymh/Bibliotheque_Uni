const Reservation = require("../models/reservation");

exports.createReservation = async (req, res) => {
  try {
    const item = await Reservation.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
    const items = await Reservation.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReservationById = async (req, res) => {
  try {
    const item = await Reservation.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Reservation non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const item = await Reservation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Reservation non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteReservation = async (req, res) => {
  try {
    const item = await Reservation.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Reservation non trouvé" });
    res.json({ message: "Reservation supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Obtenir les réservations de l'utilisateur connecté
exports.getMyReservations = async (req, res) => {
  try {
    const userId = req.user.id; // Assumé fourni par le middleware auth
    const reservations = await Reservation.find({ userId, cancelled: false });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Annuler une réservation
exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.body; // ID de la réservation à annuler
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) return res.status(404).json({ message: "Reservation non trouvé" });
    if (reservation.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé à annuler cette réservation" });
    }
    reservation.cancelled = true; // Marquer comme annulée
    await reservation.save();
    res.json({ message: "Réservation annulée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};