const express = require('express');
const router = express.Router();
const livreController = require('../controllers/livreController');
const { auth, authorize } = require('../middlewares/authMiddleware');
const upload = require("../middlewares/upload"); // ✅ ton code


// ➕ Créer un livre (admin )
router.post('/',upload.single("image"), auth, authorize(['employe','admin' ]), livreController.createLivre);

// 📥 Obtenir tous les livres (auth requis)
router.get('/', auth, livreController.getAllLivres);

// 🔍 Obtenir un livre par ID (auth requis)
router.get('/:id', auth, livreController.getLivreById);

// 🔄 Mettre à jour un livre (admin ou gestionnaire)
router.put('/:id', auth, authorize(['employe','admin']), livreController.updateLivre);

// ❌ Supprimer un livre (admin uniquement)
router.delete('/:id', auth, authorize('employe','admin'), livreController.deleteLivre);

module.exports = router;
