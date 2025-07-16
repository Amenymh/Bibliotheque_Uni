const Employe = require('../models/employe');

exports.createEmploye = async (req, res) => {
  try {
    const employe = await Employe.create(req.body);
    res.status(201).json(employe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllEmployes = async (req, res) => {
  try {
    const employes = await Employe.find();
    res.json(employes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEmployeById = async (req, res) => {
  try {
    const employe = await Employe.findById(req.params.id);
    if (!employe) return res.status(404).json({ message: "Employé non trouvé" });
    res.json(employe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmploye = async (req, res) => {
  try {
    const employe = await Employe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employe) return res.status(404).json({ message: "Employé non trouvé" });
    res.json(employe);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEmploye = async (req, res) => {
  try {
    const employe = await Employe.findByIdAndDelete(req.params.id);
    if (!employe) return res.status(404).json({ message: "Employé non trouvé" });
    res.json({ message: "Employé supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
