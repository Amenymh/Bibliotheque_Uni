const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { auth, authorize } = require('../middlewares/authMiddleware');

// ➕ Créer une notification (admin ou gestionnaire)
router.post('/', auth, authorize(['admin']), notificationController.createNotification);

// 📥 Obtenir toutes les notifications
router.get('/', auth, notificationController.getAllNotifications);

// 🔍 Obtenir une notification par ID
router.get('/:id', auth, notificationController.getNotificationById);

// 🔄 Mettre à jour une notification
router.put('/:id', auth, authorize(['admin']), notificationController.updateNotification);

// ❌ Supprimer une notification
router.delete('/:id', auth, authorize('admin'), notificationController.deleteNotification);

module.exports = router;
