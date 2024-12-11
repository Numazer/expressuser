const loginView = require('../view/loginView');
const db = require('../db/db');
const User = require('../modele/User');
const registerView = require('../view/registerView');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken
const profileView = require('../view/profileView');
const cookieParser = require('cookie-parser');


// fonction qui affiche le formulaire d'inscription
function showRegister(req, res){
    res.send(registerView());
}

// fonction qui affiche le formulaire de connexion
function showLogin(req, res) {
    res.send(loginView());
}

// fonction qui lance le traitement des données du formulaire d'enregistrement
function traitRegister(req, res) {
    const saltRounds = 10;
    const {username, password} = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
        const newUser = new User(username, hashedPassword);
        const query = 'INSERT INTO users (username, password) VALUES (?,?)';
        db.run(query, [newUser.username, newUser.password], 
            function(err){
            if(err){
                console.error('echec enregistrement', err.message);
                res.send('error');
            } else {
                console.log('user success', newUser);
                res.send('register success');
            }
    })
    });
}

// Fonction qui traite la connexion
function traitLogin(req, res) {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
  
    db.get(query, [username], (err, row) => {
      if (err) {
        console.error('Error during login:', err.message);
        return res.status(500).send('Error occurred during login');
      }
  
      if (!row) {
        return res.status(404).send('User not found');
      }
  
      // Comparer le mot de passe avec bcrypt
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          return res.status(400).send('Invalid password');
        }
  
        if (result) {
          // Si la connexion est réussie, générez un JWT
          const user = { username: row.username, id: row.id };
          const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
  
          // Envoyer le token dans un cookie avec une expiration de 1h
          res.cookie('token', token, {
            httpOnly: true, // Empêche l'accès au cookie via JavaScript côté client (sécurise contre XSS)
            secure: process.env.NODE_ENV === 'production', // True si en HTTPS (en production)
            maxAge: 3600000 // Expire après 1 heure (en millisecondes)
          });

          res.cookie('username', username, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 // Expire après 1 heure
          });
          
          res.cookie('password', password, { 
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production', 
            maxAge: 3600000 // Expire après 1 heure
          });

          return res.redirect('/profile'); // Redirige l'utilisateur vers le profil après connexion
        } else {
          res.status(400).send('Invalid password');
        }
      });
    });
  }
  
  function showProfile(req, res) {
    // Assurez-vous que l'utilisateur est authentifié
    if (!req.user) {
        return res.status(401).send('User not authenticated');
    }

    const userId = req.user.id;  // L'ID de l'utilisateur provient du token

    // Requête pour récupérer les informations de l'utilisateur depuis la base de données
    const query = 'SELECT * FROM users WHERE id = ?';
    db.get(query, [userId], (err, row) => {
        if (err) {
            console.error('Error fetching user data:', err.message);
            return res.status(500).send('Error occurred while fetching user data');
        }

        if (!row) {
            return res.status(404).send('User not found');
        }

        // Passe les données de l'utilisateur à la vue
        res.send(profileView(row));  // Passe l'objet `row` (l'utilisateur récupéré) à la fonction profileView
    });
}

module.exports = {showLogin, showRegister, traitRegister, traitLogin, showProfile};