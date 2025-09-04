const express = require("express");
const router = express.Router();
const livreController = require("../controllers/livreController");
const upload = require("../middlewares/upload");

// Upload fields: one cover + multiple images
const uploadFields = upload.fields([
  { name: "imageCouverture", maxCount: 1 },
  { name: "images", maxCount: 5 },
]);

// Routes
router.post("/", uploadFields, livreController.createLivre);
router.get("/", livreController.getLivres);
router.get("/:id", livreController.getLivreById);
router.put("/:id", uploadFields, livreController.updateLivre);
router.delete("/:id", livreController.deleteLivre);

module.exports = router;
