// src/server.js
require('dotenv').config(); // ← Doit être la toute première ligne
console.log('📦 MONGO_URI:', process.env.MONGO_URI);

const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB(); // Connexion à MongoDB

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);
});