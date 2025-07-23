const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Nécessaire si tu veux vérifier statut ou charger plus d'infos

// 🔐 Middleware d’authentification
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Accès non autorisé. Token manquant ou mal formé.' });
    }

    const token = authHeader.split(' ')[1];

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Tu peux soit :
    // 1. Utiliser decoded directement (comme tu le fais déjà)
    // 2. OU charger l'utilisateur depuis la base si tu veux plus de contrôle :
    const user = await User.findById(decoded.id || decoded.userId);
    if (!user || user.statut !== 'actif') {
      return res.status(403).json({ message: 'Utilisateur invalide ou inactif.' });
    }

    req.user = user; // attache l'utilisateur à la requête
    next();
  } catch (err) {
    console.error('Erreur auth middleware :', err.message);
    return res.status(403).json({ message: 'Token invalide ou expiré.' });
  }
};

// 🔐 Middleware d’autorisation selon les rôles
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentification requise.' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès refusé. Rôle insuffisant.' });
    }

    next();
  };
};

module.exports = { auth, authorize };
