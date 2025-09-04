const express = require("express");
const router = express.Router();
const pretController = require("../controllers/pretController");
const { auth, authorize } = require("../middlewares/authMiddleware");

// ➕ Créer un prêt (admin ou gestionnaire)
router.post("/", auth, authorize(["admin"]), pretController.createPret);

// 📥 Obtenir tous les prêts
router.get("/", auth, pretController.getAllPrets);

// 🔍 Obtenir un prêt par ID
router.get("/:id", auth, pretController.getPretById);

// 🔄 Mettre à jour un prêt
router.put("/:id", auth, authorize(["admin"]), pretController.updatePret);

// ❌ Supprimer un prêt
router.delete("/:id", auth, authorize("admin"), pretController.deletePret);

// 📥 Obtenir les prêts de l'utilisateur connecté
router.get("/mes-prets", auth, pretController.getMyPrets);

// 🔄 Retourner un prêt
router.post("/retourner", auth, pretController.returnPret);

// ➕ Emprunter un livre (étudiant) - Ajout basé sur votre besoin
router.post("/emprunter", auth, pretController.borrowBook);

module.exports = router;
