const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employeController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// 🔒 Toutes les opérations sont protégées et réservées aux utilisateurs avec le rôle 'employe'
router.post('/', auth, authorize(['employe']), employeController.createEmploye);
router.get('/', auth, authorize(['employe']), employeController.getAllEmployes);
router.get('/:id', auth, authorize(['employe']), employeController.getEmployeById);
router.put('/:id', auth, authorize(['employe']), employeController.updateEmploye);
router.delete('/:id', auth, authorize(['employe']), employeController.deleteEmploye);

module.exports = router;
