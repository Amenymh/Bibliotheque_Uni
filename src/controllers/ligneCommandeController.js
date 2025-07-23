const LigneCommandeFournisseur = require('../models/ligneCommandeFournisseur');

exports.createLigneCommandeFournisseur = async (req, res) => {
  try {
    const item = await LigneCommandeFournisseur.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllLigneCommandeFournisseurs = async (req, res) => {
  try {
    const items = await LigneCommandeFournisseur.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLigneCommandeFournisseurById = async (req, res) => {
  try {
    const item = await LigneCommandeFournisseur.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "LigneCommandeFournisseur non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLigneCommandeFournisseur = async (req, res) => {
  try {
    const item = await LigneCommandeFournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "LigneCommandeFournisseur non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLigneCommandeFournisseur = async (req, res) => {
  try {
    const item = await LigneCommandeFournisseur.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "LigneCommandeFournisseur non trouvé" });
    res.json({ message: "LigneCommandeFournisseur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
