const Pret = require('../models/pret');
const Reservation = require('../models/reservation');

exports.createPret = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    console.log('Authenticated user:', req.user);
    
    const { livreId } = req.body;
    // Check if the book is already borrowed by anyone (global availability)
    const activePret = await Pret.findOne({
      livreId,
      dateRetour: { $exists: false },
    });
    if (activePret) {
      return res.status(400).json({ message: "Livre non disponible, déjà emprunté." });
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
    // Check if the user has an active loan for this book
    const existingPret = await Pret.findOne({
      livreId,
      userId: req.user._id,
      dateRetour: { $exists: false },
    });
    if (existingPret) {
      return res.status(400).json({ message: "Vous avez déjà emprunté ce livre." });
    }
    
    const item = await Pret.create({ ...req.body, userId: req.user._id });
    res.status(201).json(item);
  } catch (err) {
    console.error('CreatePret error:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.getAllPrets = async (req, res) => {
  try {
    const items = await Pret.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyPrets = async (req, res) => {
  try {
    const items = await Pret.find({ userId: req.user._id }).populate('livre');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPretById = async (req, res) => {
  try {
    const item = await Pret.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Pret non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePret = async (req, res) => {
  try {
    const item = await Pret.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Pret non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePret = async (req, res) => {
  try {
    const item = await Pret.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Pret non trouvé" });
    res.json({ message: "Pret supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.returnPret = async (req, res) => {
  try {
    const { pretId } = req.body;
    const item = await Pret.findById(pretId);
    if (!item) return res.status(404).json({ message: "Pret non trouvé" });
    if (item.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: "Non autorisé" });
    }
    if (item.dateRetour) return res.status(400).json({ message: "Pret déjà retourné" });
    item.dateRetour = new Date();
    await item.save();
    res.json({ message: "Pret retourné avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};