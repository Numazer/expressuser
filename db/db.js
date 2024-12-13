const sqlite3 = require('sqlite3').verbose();

// création de la base de données si elle n'existe pas
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('error bdd : ', err.message);
    } else {
        // Création de la table `users` si elle n'existe pas déjà
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'utilisateur'
        )`);

        // Création de la table `annonces` si elle n'existe pas déjà
        db.run(`CREATE TABLE IF NOT EXISTS annonces (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            price INTEGER NOT NULL,
            user_id INTEGER,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )`);

    }
});



console.log('connected');

module.exports = db;