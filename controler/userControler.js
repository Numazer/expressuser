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
                const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' }); // Le token expire dans 1 heure
                res.json({ token });  // Envoi du token au client
            } else {
                res.status(400).send('Invalid password');
            }
        });
    });
}


module.exports = {showLogin, showRegister, traitRegister, traitLogin};