const express = require('express');
const router = express.Router();
const pretController = require('../controllers/pretController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// ➕ Créer un prêt (authentification requise, tous les rôles autorisés)
router.post('/', auth, pretController.createPret);

// 📥 Obtenir tous les prêts
router.get('/', auth, pretController.getAllPrets);

// 📥 Obtenir mes prêts (auth requis)
router.get('/mes-prets', auth, pretController.getMyPrets);

// 🔍 Obtenir un prêt par ID
router.get('/:id', auth, pretController.getPretById);

// 🔄 Mettre à jour un prêt
router.put('/:id', auth, authorize(['admin']), pretController.updatePret);

// ❌ Supprimer un prêt
router.delete('/:id', auth, authorize('admin'), pretController.deletePret);

// 🔙 Retourner un prêt
router.post('/retourner', auth, pretController.returnPret);

module.exports = router;
