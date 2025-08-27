// src/controllers/commandeController.js

// Simulation d'une base de données en mémoire
let commandes = [];
let idCounter = 1;

// 📌 Liste des statuts possibles
const STATUTS = ["en attente", "en cours", "livrée", "annulée"];

// 📌 Créer une nouvelle commande fournisseur
exports.createCommande = (req, res) => {
  const nouvelleCommande = {
    idCommandeFournisseur: "CMD-" + idCounter++, // ID lisible
    ...req.body,
    statutCommande: "en attente",
    dateCommande: new Date(),
  };
  commandes.push(nouvelleCommande);
  res
    .status(201)
    .json({ message: "Commande créée avec succès", commande: nouvelleCommande });
};

// 📄 Obtenir toutes les commandes
exports.getAllCommandes = (req, res) => {
  res.json(commandes);
};

// 🔍 Obtenir une commande par ID
exports.getCommandeById = (req, res) => {
  const commande = commandes.find(
    (cmd) => cmd.idCommandeFournisseur == req.params.id
  );
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }
  res.json(commande);
};

// ✏️ Mettre à jour une commande (général : fournisseur, date, etc.)
exports.updateCommande = (req, res) => {
  const commande = commandes.find(
    (cmd) => cmd.idCommandeFournisseur == req.params.id
  );
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }
  Object.assign(commande, req.body);
  res.json({ message: "Commande mise à jour", commande });
};

// 🔄 Mettre à jour uniquement le statut d'une commande
exports.updateStatut = (req, res) => {
  const commande = commandes.find(
    (cmd) => cmd.idCommandeFournisseur == req.params.id
  );
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  const { statutCommande } = req.body;
  if (!STATUTS.includes(statutCommande)) {
    return res
      .status(400)
      .json({ message: "Statut invalide. Statuts possibles: " + STATUTS.join(", ") });
  }

  commande.statutCommande = statutCommande;
  if (statutCommande === "livrée") {
    commande.dateLivraisonEffective = new Date();
  }

  res.json({ message: "Statut mis à jour avec succès", commande });
};

// 🚚 Confirmer la livraison d'une commande
exports.confirmerLivraison = (req, res) => {
  const commande = commandes.find(
    (cmd) => cmd.idCommandeFournisseur == req.params.id
  );
  if (!commande) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }

  commande.statutCommande = "livrée";
  commande.dateLivraisonEffective = new Date();
  res.json({ message: "Livraison confirmée", commande });
};

// ❌ Supprimer une commande
exports.deleteCommande = (req, res) => {
  const index = commandes.findIndex(
    (cmd) => cmd.idCommandeFournisseur == req.params.id
  );
  if (index === -1) {
    return res.status(404).json({ message: "Commande non trouvée" });
  }
  commandes.splice(index, 1);
  res.json({ message: "Commande supprimée avec succès" });
};
