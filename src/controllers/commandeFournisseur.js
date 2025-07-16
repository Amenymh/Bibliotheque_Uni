const CommandeFournisseur = require('../models/commandeFournisseur.model');

exports.createCommandeFournisseur = async (req, res) => {
  try {
    const item = await CommandeFournisseur.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCommandeFournisseurs = async (req, res) => {
  try {
    const items = await CommandeFournisseur.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCommandeFournisseurById = async (req, res) => {
  try {
    const item = await CommandeFournisseur.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "CommandeFournisseur non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCommandeFournisseur = async (req, res) => {
  try {
    const item = await CommandeFournisseur.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "CommandeFournisseur non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCommandeFournisseur = async (req, res) => {
  try {
    const item = await CommandeFournisseur.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "CommandeFournisseur non trouvé" });
    res.json({ message: "CommandeFournisseur supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
