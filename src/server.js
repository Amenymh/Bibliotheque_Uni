require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');

// Initialiser Express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à la BDD
connectDB();

// Routes
const utilisateurRoutes = require('./routes/userRoutes');
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
const ligneCommandeFournisseurRoutes = require('./routes/ligneCommandeFournisseurRoutes'); // corrigé

// Point de contrôle de l’API
app.get('/', (req, res) => {
  res.send('📚 API Bibliothèque en ligne');
});

// Routage
app.use('/api/utilisateurs', utilisateurRoutes);
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
app.use('/api/commandes-fournisseur', commandeFournisseurRoutes);
app.use('/api/lignes-commandes', ligneCommandeFournisseurRoutes);

// Middleware d’erreur (facultatif mais recommandé)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erreur serveur' });
});

// Démarrage serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});
