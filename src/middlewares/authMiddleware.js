const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // format "Bearer token"

  if (!token) {
    return res.status(401).json({ message: 'Accès non autorisé. Token manquant.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // ajout des infos utilisateur à la requête
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token invalide.' });
  }
};

module.exports = authMiddleware;
