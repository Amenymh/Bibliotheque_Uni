const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { auth, authorize } = require("../middlewares/authMiddleware");

// ➕ Créer une réservation (auth requis)
router.post("/", auth, reservationController.createReservation);

// 📥 Obtenir toutes les réservations (admin ou gestionnaire)
router.get("/", auth, authorize(["admin"]), reservationController.getAllReservations);

// 📥 Obtenir mes réservations (auth requis)
router.get("/mes-reservations", auth, reservationController.getMyReservations);

// 🔍 Obtenir une réservation par ID (auth requis)
router.get("/:id", auth, reservationController.getReservationById);

// 🔄 Mettre à jour une réservation
router.put("/:id", auth, authorize(["admin"]), reservationController.updateReservation);

// ❌ Supprimer une réservation
router.delete("/:id", auth, authorize(["admin"]), reservationController.deleteReservation);

// ❌ Annuler une réservation (auth requis)
router.post("/annuler", auth, reservationController.cancelReservation);

module.exports = router;