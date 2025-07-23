const express = require('express');
const router = express.Router();
const categorieController = require('../controllers/categorieController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// 🔒 Routes protégées - accessibles uniquement aux employés
router.post('/', auth, authorize(['employe']), categorieController.createCategorie);
router.get('/', auth, authorize(['employe']), categorieController.getAllCategories);
router.get('/:id', auth, authorize(['employe']), categorieController.getCategorieById);
router.put('/:id', auth, authorize(['employe']), categorieController.updateCategorie);
router.delete('/:id', auth, authorize(['employe']), categorieController.deleteCategorie);

module.exports = router;
