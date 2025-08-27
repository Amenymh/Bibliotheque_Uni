const express = require('express');
const router = express.Router();
const commandeController = require('../controllers/commandeController');

// CRUD commandes
router.post('/', commandeController.createCommande);
router.get('/', commandeController.getAllCommandes);
router.get('/:id', commandeController.getCommandeById);
router.put('/:id', commandeController.updateCommande);
router.delete('/:id', commandeController.deleteCommande);

// Suivi & livraison
router.patch('/:id/statut', commandeController.updateStatut);        // changer le statut (ex: en attente → en cours)
router.patch('/:id/livraison', commandeController.confirmerLivraison); // confirmer la livraison

module.exports = router;
