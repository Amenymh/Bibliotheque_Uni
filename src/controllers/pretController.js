const Pret = require('../models/pret');

exports.createPret = async (req, res) => {
  try {
    const item = await Pret.create(req.body);
    res.status(201).json(item);
  } catch (err) {
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
