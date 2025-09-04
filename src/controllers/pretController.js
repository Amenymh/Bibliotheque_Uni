const Livre = require("../models/livre"); // Importe le modèle Livre
const Pret = require("../models/pret");   // Importe le modèle Pret

// Créer un prêt (admin)
exports.createPret = async (req, res) => {
  try {
    const { livreId, userId } = req.body; // Admin specifies userId
    const livre = await Livre.findById(livreId);
    if (!livre || !livre.disponible) {
      return res.status(400).json({ message: "Livre non disponible" });
    }
    const pret = new Pret({ userId, livreId, dateEmprunt: new Date() });
    await pret.save();
    livre.disponible = false;
    await livre.save();
    res.status(201).json({ message: "Prêt créé avec succès", pret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Emprunter un livre (étudiant)
exports.borrowBook = async (req, res) => {
  try {
    const { livreId } = req.body;
    const userId = req.user.id; // From auth middleware

    // Verify book exists and is available
    const livre = await Livre.findById(livreId);
    if (!livre || !livre.disponible) {
      return res.status(400).json({ message: "Livre non disponible" });
    }

    // Check if user already borrowed the book
    const existingLoan = await Pret.findOne({ userId, livreId, dateRetour: null });
    if (existingLoan) {
      return res.status(400).json({ message: "Livre déjà emprunté par cet utilisateur" });
    }

    // Create loan
    const pret = new Pret({ userId, livreId, dateEmprunt: new Date() });
    await pret.save();

    // Update book availability
    livre.disponible = false;
    await livre.save();

    res.status(201).json({ message: "Livre emprunté avec succès", pret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Obtenir tous les prêts
exports.getAllPrets = async (req, res) => {
  try {
    const prets = await Pret.find();
    res.json(prets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir un prêt par ID
exports.getPretById = async (req, res) => {
  try {
    const pret = await Pret.findById(req.params.id);
    if (!pret) return res.status(404).json({ message: "Prêt non trouvé" });
    res.json(pret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mettre à jour un prêt
exports.updatePret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pret) return res.status(404).json({ message: "Prêt non trouvé" });
    res.json(pret);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Supprimer un prêt
exports.deletePret = async (req, res) => {
  try {
    const pret = await Pret.findByIdAndDelete(req.params.id);
    if (!pret) return res.status(404).json({ message: "Prêt non trouvé" });
    res.json({ message: "Prêt supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtenir les prêts de l'utilisateur connecté
exports.getMyPrets = async (req, res) => {
  try {
    const userId = req.user.id; // From auth middleware
    const prets = await Pret.find({ userId, dateRetour: null }); // Prêts en cours
    res.json(prets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Retourner un prêt
exports.returnPret = async (req, res) => {
  try {
    const { pretId } = req.body;
    const pret = await Pret.findById(pretId);
    if (!pret) return res.status(404).json({ message: "Prêt non trouvé" });
    if (pret.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Non autorisé à retourner ce prêt" });
    }
    pret.dateRetour = new Date();
    await pret.save();
    const livre = await Livre.findById(pret.livreId);
    if (livre) {
      livre.disponible = true;
      await livre.save();
    }
    res.json({ message: "Prêt retourné avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};