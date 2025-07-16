const Exemplaire = require('../models/exemplaire');

exports.createExemplaire = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.create(req.body);
    res.status(201).json(exemplaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExemplaires = async (req, res) => {
  try {
    const exemplaires = await Exemplaire.find();
    res.json(exemplaires);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExemplaireById = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.findById(req.params.id);
    if (!exemplaire) return res.status(404).json({ message: "Exemplaire non trouvé" });
    res.json(exemplaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExemplaire = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!exemplaire) return res.status(404).json({ message: "Exemplaire non trouvé" });
    res.json(exemplaire);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExemplaire = async (req, res) => {
  try {
    const exemplaire = await Exemplaire.findByIdAndDelete(req.params.id);
    if (!exemplaire) return res.status(404).json({ message: "Exemplaire non trouvé" });
    res.json({ message: "Exemplaire supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
