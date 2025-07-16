const Amende = require('../models/amende');

exports.createAmende = async (req, res) => {
  try {
    const item = await Amende.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAmendes = async (req, res) => {
  try {
    const items = await Amende.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAmendeById = async (req, res) => {
  try {
    const item = await Amende.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Amende non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAmende = async (req, res) => {
  try {
    const item = await Amende.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Amende non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAmende = async (req, res) => {
  try {
    const item = await Amende.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Amende non trouvé" });
    res.json({ message: "Amende supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
