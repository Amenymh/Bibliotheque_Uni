const express = require('express');
const router = express.Router();
const ligneCommandeController = require('../controllers/ligneCommandeController');
const { auth, authorize } = require('../middlewares/authMiddleware');
// ➕ Créer une ligne de commande fournisseur
router.post('/', auth, authorize(['admin', 'gestionnaire']), ligneCommandeController.createLigneCommandeFournisseur);

// 📥 Obtenir toutes les lignes de commande
router.get('/', auth, ligneCommandeController.getAllLigneCommandeFournisseurs);

// 🔍 Obtenir une ligne de commande par ID
router.get('/:id', auth, ligneCommandeController.getLigneCommandeFournisseurById);

// 🔄 Mettre à jour une ligne de commande
router.put('/:id', auth, authorize(['admin', 'gestionnaire']), ligneCommandeController.updateLigneCommandeFournisseur);

// ❌ Supprimer une ligne de commande
router.delete('/:id', auth, authorize('admin'), ligneCommandeController.deleteLigneCommandeFournisseur);

module.exports = router;
