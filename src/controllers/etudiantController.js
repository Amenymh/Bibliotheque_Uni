const Etudiant = require('../models/etudiant');

exports.createEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.create(req.body);
    res.status(201).json(etudiant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEtudiants = async (req, res) => {
  try {
    const etudiants = await Etudiant.find();
    res.json(etudiants);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEtudiantById = async (req, res) => {
  try {
    const etudiant = await Etudiant.findById(req.params.id);
    if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });
    res.json(etudiant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEtudiant = async (req, res) => {
  try {
    const etudiant = await Etudiant.findByIdAndDelete(req.params.id);
    if (!etudiant) return res.status(404).json({ message: "Étudiant non trouvé" });
    res.json({ message: "Étudiant supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
