const loginView = require('../view/loginView');
const db = require('../db/db');
const User = require('../modele/User');
const registerView = require('../view/registerView');
const bcrypt = require('bcrypt');


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

// fonction qui lance le traitement des données du formulaire de connexion
function traitLogin(req, res) {
    const {username, password} = req.body;
    const newUser= new User(username, password);
    const query = 'SELECT * FROM users WHERE username = ?'
    db.get(query, [newUser.username], function(err, row){
        if(err){
            console.error('echec connexion', err.message);
            res.send('error');
        }
        if(row){
            bcrypt.compare(password, row.password, (err, result) => {
                if(err){
                    console.log("mdp non correspondant");
                    res.send('echec comparaison');
                } else if(result){
                    console.log(newUser, 'Connecté');
                    res.send('bienvenue');
                }else {
                    console.log('mauvais mdp');
                    res.send('mot de passe éronné');
                }
            } );
        }
    });
}


module.exports = {showLogin, showRegister, traitRegister, traitLogin};