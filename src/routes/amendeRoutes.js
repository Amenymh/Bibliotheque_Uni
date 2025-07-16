const express = require('express');
const router = express.Router();
const amendeController = require('../controllers/amendeController');

router.post('/', amendeController.createAmende);
router.get('/', amendeController.getAllAmendes);
router.get('/:id', amendeController.getAmendeById);
router.put('/:id', amendeController.updateAmende);
router.delete('/:id', amendeController.deleteAmende);

module.exports = router;
