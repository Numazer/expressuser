const loginView = require('../view/loginView');
const db = require('../db/db');
const User = require('../modele/User');
const registerView = require('../view/registerView');

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
    const {username, password} = req.body;
    const newUser = new User(username, password);
    const query = 'INSERT INTO users (username, password) VALUES (?,?)';
    db.run(query, [newUser.username, newUser.password], function(err){
        if(err){
            console.error('echec enregistrement', err.message);
            res.send('error');
        } else {
            console.log('user success', newUser);
            res.send('register success');
        }
    });
}

// fonction qui lance le traitement des données du formulaire de connexion
function traitLogin(req, res) {
    const {username, password} = req.body;
    const newUser= new User(username, password);
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?'
    db.all(query, [username, password], function(err){
        if(err){
            console.error('echec connexion', err.message);
            res.send('error');
        } else {
            console.log('user success', newUser);
            res.send('connexion success');
        }
    });
}


module.exports = {showLogin, showRegister, traitRegister, traitLogin};