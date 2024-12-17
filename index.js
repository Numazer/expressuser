require('dotenv').config();
const express = require('express');
const app = express();
const {showLogin, showRegister, traitRegister, traitLogin} = require('./controler/userControler');
const {showProfile, showDepot, traitDepot, supprDepot, afficherModifierAnnonce, modifierAnnonce, showAnnonce} = require('./controler/appControler');
const homeView = require('./view/homeView');
const bodyParser = require('body-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken
const authenticateToken = require('./middleware.js/middleWare');
const cookieParser = require('cookie-parser');
const isAdmin = require('./middleware.js/middleWare');


app.use(express.static('public'));

// créer une session
app.use(session({
    secret: process.env.JWT_SECRET,  // Une clé secrète utilisée pour signer les cookies de session
    resave: false,                // Ne pas sauver la session si elle n'a pas été modifiée
    saveUninitialized: true,      // Sauvegarder une session non initialisée (si elle est vide)
    cookie: { secure: false }     // Ne nécessite pas une connexion HTTPS pour l'exemple (en production, utilisez `secure: true`)
  }));

// Middleware pour analyser le JSON
app.use(express.json());

// parcours le Json
app.use(bodyParser.urlencoded({extended : true}));

app.use(cookieParser());

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
 
// Exemple d'une route protégée
app.get('/profile', authenticateToken, (req, res) => {showProfile(req, res);});

app.get('/logout', (req, res) => {
  // Supprimer le cookie contenant le token JWT
  res.clearCookie('token');
  res.redirect('/login');
});

app.get('/depot', (req, res) => {
  showDepot(req, res);
});

app.post('/depot', (req, res) => {traitDepot(req, res);});

app.post('/supprDepot', supprDepot);


app.get('/modifierAnnonce/:adId', afficherModifierAnnonce);


app.post('/modifierAnnonce', modifierAnnonce);

app.get('/admin', isAdmin, (req, res) => {
  res.send('Page d\'administration');
});

app.get('/home', (req, res) => {
  showAnnonce(req, res);
});

// app.get('/', (req, res) => {
//   res.redirect('/home');
// });