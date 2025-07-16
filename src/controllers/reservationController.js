const Reservation = require('../models/reservation');

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
