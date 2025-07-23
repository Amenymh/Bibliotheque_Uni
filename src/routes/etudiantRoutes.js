const express = require('express');
const router = express.Router();
const etudiantController = require('../controllers/etudiantController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// 🔒 Routes protégées - accessibles uniquement aux employés
router.post('/', auth, authorize(['employe']), etudiantController.createEtudiant);
router.get('/', auth, authorize(['employe']), etudiantController.getAllEtudiants);
router.get('/:id', auth, authorize(['employe']), etudiantController.getEtudiantById);
router.put('/:id', auth, authorize(['employe']), etudiantController.updateEtudiant);
router.delete('/:id', auth, authorize(['employe']), etudiantController.deleteEtudiant);

module.exports = router;
