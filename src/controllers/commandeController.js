// src/controllers/commandeController.js

// Exemple de données fictives pour simuler une base de données
let commandes = [];
let idCounter = 1;

// 📌 Créer une nouvelle commande fournisseur
exports.createCommande = (req, res) => {
  const nouvelleCommande = {
    idCommandeFournisseur: idCounter++,
    ...req.body,
    statutCommande: 'en attente',
    dateCommande: new Date(),
  };
  commandes.push(nouvelleCommande);
  res.status(201).json({ message: 'Commande créée avec succès', commande: nouvelleCommande });
};

// 📄 Obtenir toutes les commandes
exports.getAllCommandes = (req, res) => {
  res.json(commandes);
};

// 🔍 Obtenir une commande par ID
exports.getCommandeById = (req, res) => {
  const commande = commandes.find(cmd => cmd.idCommandeFournisseur == req.params.id);
  if (!commande) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  res.json(commande);
};

// ✏️ Mettre à jour une commande (par ex. modifier la date ou le fournisseur)
exports.updateCommande = (req, res) => {
  const commande = commandes.find(cmd => cmd.idCommandeFournisseur == req.params.id);
  if (!commande) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  Object.assign(commande, req.body);
  res.json({ message: 'Commande mise à jour', commande });
};

// 🚚 Confirmer la livraison d'une commande
exports.confirmerLivraison = (req, res) => {
  const commande = commandes.find(cmd => cmd.idCommandeFournisseur == req.params.id);
  if (!commande) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  commande.statutCommande = 'livrée';
  commande.dateLivraisonEffective = new Date();
  res.json({ message: 'Livraison confirmée', commande });
};

// ❌ Supprimer une commande
exports.deleteCommande = (req, res) => {
  const index = commandes.findIndex(cmd => cmd.idCommandeFournisseur == req.params.id);
  if (index === -1) {
    return res.status(404).json({ message: 'Commande non trouvée' });
  }
  commandes.splice(index, 1);
  res.json({ message: 'Commande supprimée avec succès' });
};
