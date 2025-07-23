const Utilisateur = require('../models/User'); // S'assurer que le chemin est correct

// Obtenir tous les utilisateurs
const getUsers = async (req, res) => {
  try {
    const users = await Utilisateur.find();
    res.json(users);
  } catch (error) {
    console.error("Erreur getUsers :", error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { nom, prenom, email, motDePasse, role } = req.body;

  // Validation minimale
  if (!email || !motDePasse || !role) {
    return res.status(400).json({ message: "Champs obligatoires manquants : email, motDePasse, role" });
  }

  try {
    // Vérifier si l'email existe déjà
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà" });
    }

    const user = new Utilisateur({
      nom,
      prenom,
      email,
      motDePasse,
      role,
    });

    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

module.exports = {
  getUsers,
  createUser
};
