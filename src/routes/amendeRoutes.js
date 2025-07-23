// src/routes/amendeRoutes.js
const express = require('express');
const router = express.Router();
const amendeController = require('../controllers/amendeController');
const { auth, authorize } = require('../middlewares/authMiddleware');


// 🔐 Routes sécurisées
router.post('/', auth, authorize(['admin', 'gestionnaire']), amendeController.createAmende);
router.get('/', auth, authorize(['admin', 'gestionnaire']), amendeController.getAllAmendes);
router.get('/:id', auth, authorize(['admin', 'gestionnaire']), amendeController.getAmendeById);
router.put('/:id', auth, authorize(['admin']), amendeController.updateAmende);
router.delete('/:id', auth, authorize(['admin']), amendeController.deleteAmende);

module.exports = router;
