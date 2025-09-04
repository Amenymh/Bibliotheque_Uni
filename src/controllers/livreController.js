const Livre = require("../models/livre");

// Create new Livre with image(s)
exports.createLivre = async (req, res) => {
  try {
    const { titre, auteur, anneePublication, categorie } = req.body;

    // Handle image uploads
    let imageCouverture = null;
    let images = [];

    if (req.files) {
      if (req.files["imageCouverture"]) {
        imageCouverture = req.files["imageCouverture"][0].filename;
      }
      if (req.files["images"]) {
        images = req.files["images"].map((file) => file.filename);
      }
    }

    const livre = new Livre({
      titre,
      auteur,
      anneePublication,
      categorie,
      imageCouverture,
      images,
    });

    await livre.save();
    res.status(201).json(livre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all livres
exports.getLivres = async (req, res) => {
  try {
    const livres = await Livre.find().populate("categorie", "nom"); 
    res.json(livres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single livre by ID
exports.getLivreById = async (req, res) => {
  try {
    const livre = await Livre.findById(req.params.id).populate("categorie");
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.json(livre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update livre
exports.updateLivre = async (req, res) => {
  try {
    const { titre, auteur, anneePublication, categorie } = req.body;

    let updateData = { titre, auteur, anneePublication, categorie };

    if (req.files) {
      if (req.files["imageCouverture"]) {
        updateData.imageCouverture = req.files["imageCouverture"][0].filename;
      }
      if (req.files["images"]) {
        updateData.images = req.files["images"].map((file) => file.filename);
      }
    }

    const livre = await Livre.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.json(livre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete livre
exports.deleteLivre = async (req, res) => {
  try {
    const livre = await Livre.findByIdAndDelete(req.params.id);
    if (!livre) return res.status(404).json({ message: "Livre not found" });
    res.json({ message: "Livre deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
