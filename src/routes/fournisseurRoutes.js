const express = require('express');
const router = express.Router();
const fournisseurController = require('../controllers/fournisseurController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// 🔒 Routes protégées - accessibles uniquement aux employés
router.post('/', auth, authorize(['employe']), fournisseurController.createFournisseur);
router.get('/', auth, authorize(['employe']), fournisseurController.getAllFournisseurs);
router.get('/:id', auth, authorize(['employe']), fournisseurController.getFournisseurById);
router.put('/:id', auth, authorize(['employe']), fournisseurController.updateFournisseur);
router.delete('/:id', auth, authorize(['employe']), fournisseurController.deleteFournisseur);

module.exports = router;
