const express = require('express');
const app = express();
const {showLogin, showRegister, traitRegister, traitLogin} = require('./controler/userControler');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken

// créer une session
app.use(session({
    secret: 'manuKey',  // Une clé secrète utilisée pour signer les cookies de session
    resave: false,                // Ne pas sauver la session si elle n'a pas été modifiée
    saveUninitialized: true,      // Sauvegarder une session non initialisée (si elle est vide)
    cookie: { secure: false }     // Ne nécessite pas une connexion HTTPS pour l'exemple (en production, utilisez `secure: true`)
  }));

// Middleware pour analyser le JSON
app.use(express.json());

// parcours le Json
app.use(bodyParser.urlencoded({extended : true}));

// écoute le port 3000 -> accueil
app.listen(3000, (req, res) => {console.log('coucou')});

// envoie l'affichage du formulaire de connexion via la méthodie GET
app.get('/login', (req, res) => {showLogin(req, res);});

// envoie l'affichage du formulaire d'enregistrement via la méthodie GET
app.get('/register', (req, res) => {showRegister(req, res);});

// envoie le traitement des données de formulaire d'enregistrement
app.post('/register', (req, res) => {traitRegister(req, res);});

// envoie le traitement des données de formulaire de connexion
app.post('/login', (req, res) => {traitLogin(req, res);});

// Middleware pour vérifier le JWT dans les requêtes protégées
function authenticateToken(req, res, next) {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Récupère le token de l'en-tête Authorization
  if (!token) {
      return res.status(403).send('Access denied');
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          return res.status(403).send('Invalid or expired token');
      }
      req.user = user;
      next();
  });
}

// Exemple d'une route protégée
app.get('/profile', authenticateToken, (req, res) => {
  res.send(`Hello ${req.user.username}, this is your profile!`);
});

