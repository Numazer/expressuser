const express = require('express');
const app = express();
const {showLogin, showRegister, traitRegister, traitLogin} = require('./controler/userControler');
const bodyParser = require('body-parser');

// Middleware pour analyser le JSON
app.use(express.json());

// parcours le Json
app.use(bodyParser.urlencoded({extended : true}));

// écoute le port 3000 -> accueil
app.listen(3000, (res,req) => {console.log('coucou')});

// envoie l'affichage du formulaire de connexion via la méthodie GET
app.get('/login', (res, req) => {showLogin(res, req);});

// envoie l'affichage du formulaire d'enregistrement via la méthodie GET
app.get('/register', (res, req) => {showRegister(res, req);});

// envoie le traitement des données de formulaire d'enregistrement
app.post('/register', (res, req) => {traitRegister(res, req);});