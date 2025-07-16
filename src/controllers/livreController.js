const Livre = require('../models/livre.model');

exports.createLivre = async (req, res) => {
  try {
    const livre = await Livre.create(req.body);
    res.status(201).json(livre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLivres = async (req, res) => {
  try {
    const livres = await Livre.find();
    res.json(livres);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id);
    if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
    res.json(livre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
    res.json(livre);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).json({ message: "Livre non trouvé" });
    res.json({ message: "Livre supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
