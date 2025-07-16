const express = require('express');
const router = express.Router();
const employeController = require('../controllers/employe.controller');

router.post('/', employeController.createEmploye);
router.get('/', employeController.getAllEmployes);
router.get('/:id', employeController.getEmployeById);
router.put('/:id', employeController.updateEmploye);
router.delete('/:id', employeController.deleteEmploye);

module.exports = router;
