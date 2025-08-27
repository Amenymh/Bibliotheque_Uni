const Reservation = require('../models/reservation');
const Pret = require('../models/pret');

exports.createReservation = async (req, res) => {
  try {
    const { livreId } = req.body;
    // Check if the book is available (has no active loan)
    const activePret = await Pret.findOne({
      livreId,
      dateRetour: { $exists: false },
    });
    if (!activePret) {
      return res.status(400).json({ message: "Livre est disponible, empruntez-le au lieu de réserver." });
    }
    // Check if the user has an active loan for this book
    const existingPret = await Pret.findOne({
      livreId,
      userId: req.user._id,
      dateRetour: { $exists: false },
    });
    if (existingPret) {
      return res.status(400).json({ message: "Vous avez déjà emprunté ce livre." });
    }
    // Check if the user has an active reservation for this book
    const existingReservation = await Reservation.findOne({
      livreId,
      userId: req.user._id,
      cancelled: { $ne: true },
    });
    if (existingReservation) {
      return res.status(400).json({ message: "Vous avez déjà une réservation active pour ce livre." });
    }
    
    const item = await Reservation.create({ ...req.body, userId: req.user._id });
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

exports.getMyReservations = async (req, res) => {
  try {
    const items = await Reservation.find({ userId: req.user._id, cancelled: { $ne: true } }).populate('livre');
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

exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.body;
    const item = await Reservation.findById(reservationId);
    if (!item) return res.status(404).json({ message: "Reservation non trouvé" });
    if (item.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Non autorisé" });
    }
    if (item.cancelled) return res.status(400).json({ message: "Réservation déjà annulée" });
    item.cancelled = true;
    await item.save();
    res.json({ message: "Réservation annulée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};