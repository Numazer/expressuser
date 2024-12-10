const express = require('express');
const app = express();
const {showLogin, showRegister, traitRegister, traitLogin} = require('./controler/userControler');
const bodyParser = require('body-parser');
const session = require('express-session');

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
