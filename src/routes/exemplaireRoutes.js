const express = require('express');
const router = express.Router();
const exemplaireController = require('../controllers/exemplaireController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// 🔒 Routes protégées - accessibles uniquement aux employés
router.post('/', auth, authorize(['employe']), exemplaireController.createExemplaire);
router.get('/', auth, authorize(['employe']), exemplaireController.getAllExemplaires);
router.get('/:id', auth, authorize(['employe']), exemplaireController.getExemplaireById);
router.put('/:id', auth, authorize(['employe']), exemplaireController.updateExemplaire);
router.delete('/:id', auth, authorize(['employe']), exemplaireController.deleteExemplaire);

module.exports = router;
