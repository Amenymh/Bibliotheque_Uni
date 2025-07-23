const express = require('express');
const router = express.Router();
const { getUsers, createUser } = require('../controllers/userController');
const { auth, authorize } = require('../middlewares/authMiddleware');
// 📥 Obtenir la liste des utilisateurs (admin uniquement)
router.get('/', auth, authorize('admin'), getUsers);

// ➕ Créer un utilisateur (admin uniquement)
router.post('/', auth, authorize('admin'), createUser);

module.exports = router;
