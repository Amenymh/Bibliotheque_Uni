require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

// Middlewares personnalisés
const authMiddleware = require('./middlewares/authMiddleware');
const roleMiddleware = require('./middlewares/roleMiddleware');
const errorHandler = require('./middlewares/errorHandler');

// Initialiser Express
const app = express();

app.use(
  cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (Uploads folder)
app.use('/uploads', express.static(path.join(__dirname, 'Uploads'))); // Changed to src/Uploads

//app.use("/uploads", express.static("uploads")); // serve images statically

// Connexion à la BDD
connectDB();

// Import des routes
const userRoutes = require('./routes/userRoutes');
const employeRoutes = require('./routes/employeRoutes');
const etudiantRoutes = require('./routes/etudiantRoutes');
const fournisseurRoutes = require('./routes/fournisseurRoutes');
const livreRoutes = require('./routes/livreRoutes');
const exemplaireRoutes = require('./routes/exemplaireRoutes');
const categorieRoutes = require('./routes/categorieRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const pretRoutes = require('./routes/pretRoutes');
const amendeRoutes = require('./routes/amendeRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const commandeFournisseurRoutes = require('./routes/commandeFournisseurRoutes');
const ligneCommandeFournisseurRoutes = require('./routes/ligneCommandeRoutes');

// Point de contrôle de l’API
app.get('/', (req, res) => {
  res.send('📚 API Bibliothèque en ligne');
});

// Routage principal
app.use('/api/users', userRoutes);
app.use('/api/employes', employeRoutes);
app.use('/api/etudiants', etudiantRoutes);
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/livres', livreRoutes);
app.use('/api/exemplaires', exemplaireRoutes);
app.use('/api/categories', categorieRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/prets', pretRoutes);
app.use('/api/amendes', amendeRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/commandesfournisseur', commandeFournisseurRoutes);
app.use('/api/lignescommandes', ligneCommandeFournisseurRoutes);

// Middleware global de gestion des erreurs
app.use(errorHandler);

// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
