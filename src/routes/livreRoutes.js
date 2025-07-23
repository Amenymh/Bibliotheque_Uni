const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// ➕ Créer un livre (admin ou gestionnaire)
router.post('/', auth, authorize(['admin', 'gestionnaire']), livreController.createLivre);

// 📥 Obtenir tous les livres (auth requis)
router.get('/', auth, livreController.getAllLivres);

// 🔍 Obtenir un livre par ID (auth requis)
router.get('/:id', auth, livreController.getLivreById);

// 🔄 Mettre à jour un livre (admin ou gestionnaire)
router.put('/:id', auth, authorize(['admin', 'gestionnaire']), livreController.updateLivre);

// ❌ Supprimer un livre (admin uniquement)
router.delete('/:id', auth, authorize('admin'), livreController.deleteLivre);

module.exports = router;
