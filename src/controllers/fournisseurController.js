const Fournisseur = require('../models/fournisseur.model');

exports.createFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.create(req.body);
    res.status(201).json(fournisseur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllFournisseurs = async (req, res) => {
  try {
    const fournisseurs = await Fournisseur.find();
    res.json(fournisseurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFournisseurById = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findById(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    res.json(fournisseur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    res.json(fournisseur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.findByIdAndDelete(req.params.id);
    if (!fournisseur) return res.status(404).json({ message: "Fournisseur non trouvé" });
    res.json({ message: "Fournisseur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
