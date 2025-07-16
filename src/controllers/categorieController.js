const Categorie = require('../models/categorie');

exports.createCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.create(req.body);
    res.status(201).json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategorieById = async (req, res) => {
  try {
    const categorie = await Categorie.findById(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json(categorie);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategorie = async (req, res) => {
  try {
    const categorie = await Categorie.findByIdAndDelete(req.params.id);
    if (!categorie) return res.status(404).json({ message: "Catégorie non trouvée" });
    res.json({ message: "Catégorie supprimée" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
