const Fournisseur = require('../models/fournisseur');
const bcrypt = require('bcryptjs'); // Ajoute cette ligne ici

// ...le
// Création par un employé (protégée)
exports.createFournisseur = async (req, res) => {
  try {
    const fournisseur = await Fournisseur.create(req.body);
    res.status(201).json(fournisseur);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Inscription publique d'un fournisseur
exports.registerFournisseur = async (req, res) => {
  try {
    const existing = await Fournisseur.findOne({ email: req.body.email });
    if (existing) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }
    // Hash du mot de passe
    if (!req.body.motDePasse) {
      return res.status(400).json({ message: "Le mot de passe est requis" });
    }
    req.body.motDePasse = await bcrypt.hash(req.body.motDePasse, 10);

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
