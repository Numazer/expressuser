const depotView = require('../view/depotView');
const profileView = require('../view/profileView');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');  // Importer jsonwebtoken
const bcrypt = require('bcrypt');
const db = require('../db/db');
const homeView = require('../view/homeView');
const favoritesView = require('../view/favoriteView');


function showProfile(req, res) {
    const token = req.cookies.token; // Récupérer le token depuis les cookies
    if (!token) {
        return res.redirect('/login'); // Rediriger vers la page de connexion si pas de token
    }

    // Vérifier et décoder le token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }

        // Récupérer les annonces de l'utilisateur à partir de la base de données
        const query = 'SELECT * FROM annonces WHERE user_id = ?';
        db.all(query, [user.id], (err, annonces) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération des annonces');
            }

            // Passer les données de l'utilisateur et des annonces à la vue
            res.send(profileView(user, annonces)); // Afficher la vue du profil avec les annonces de l'utilisateur
        });
    });
}


function showDepot(req, res) {
    res.send(depotView());
}


// Fonction pour traiter l'ajout d'une annonce
function traitDepot(req, res) {
    const { title, description, price } = req.body;
    const token = req.cookies.token; // Récupérer le token depuis les cookies

    if (!token) {
        return res.redirect('/login'); // Rediriger si pas de token
    }

    // Vérifier et décoder le token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }

        // Insérer l'annonce dans la base de données avec l'ID de l'utilisateur
        const query = 'INSERT INTO annonces (title, description, price, user_id) VALUES (?, ?, ?, ?)';
        db.run(query, [title, description, price, user.id], function(err) {
            if (err) {
                console.error('Erreur lors de l\'ajout de l\'annonce:', err.message);
                return res.status(500).send('Erreur lors de l\'ajout de l\'annonce');1
            }

            console.log('Annonce ajoutée avec succès:', this.lastID);
            res.redirect('/profile'); // Rediriger vers le profil après ajout
        });
    });
}

// Fonction pour supprimer une annonce
function supprDepot(req, res) {
    const { adId } = req.body;  // Récupérer l'ID de l'annonce à supprimer depuis le corps de la requête

    if (!adId) {
        return res.status(400).send('ID de l\'annonce manquant');  // Si l'ID est manquant, renvoyer une erreur
    }

    const token = req.cookies.token; // Récupérer le token depuis les cookies

    if (!token) {
        return res.redirect('/login'); // Rediriger si pas de token
    }

    // Vérifier et décoder le token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }

        // Vérifier si l'annonce appartient à l'utilisateur
        const query = 'SELECT * FROM annonces WHERE id = ?';
        db.get(query, [adId], (err, annonce) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération de l\'annonce');
            }

            if (!annonce) {
                return res.status(404).send('Annonce non trouvée');
            }

            // Vérifier si l'utilisateur a le droit de supprimer l'annonce
            if (annonce.user_id !== user.id) {
                return res.status(403).send('Vous ne pouvez pas supprimer cette annonce');
            }

            // Suppression de l'annonce dans la base de données
            const deleteQuery = 'DELETE FROM annonces WHERE id = ?';
            db.run(deleteQuery, [adId], function(err) {
                if (err) {
                    console.error('Erreur lors de la suppression de l\'annonce:', err.message);
                    return res.status(500).send('Erreur lors de la suppression de l\'annonce');
                }

                console.log('Annonce supprimée avec succès:', adId);
                res.redirect('/profile');  // Rediriger vers la page de profil après la suppression
            });
        });
    });
}

// Route pour afficher le formulaire de modification
function afficherModifierAnnonce(req, res) {
    const { adId } = req.params;  // Récupérer l'ID de l'annonce depuis les paramètres de l'URL

    // Récupérer les informations de l'annonce à partir de la base de données
    const query = 'SELECT * FROM annonces WHERE id = ?';
    db.get(query, [adId], (err, annonce) => {
        if (err) {
            return res.status(500).send('Erreur lors de la récupération de l\'annonce');
        }

        if (!annonce) {
            return res.status(404).send('Annonce non trouvée');
        }

        // Afficher le formulaire avec les données de l'annonce pré-remplies
        res.render('modifierAnnonce', { annonce });
    });
}

function modifierAnnonce(req, res) {
    const { adId, title, description, price } = req.body;  // Récupérer les nouvelles valeurs depuis le formulaire

    if (!adId || !title || !description || !price) {
        return res.status(400).send('Tous les champs doivent être remplis');
    }

    // Mettre à jour l'annonce dans la base de données
    const query = 'UPDATE annonces SET title = ?, description = ?, price = ? WHERE id = ?';
    db.run(query, [title, description, price, adId], function(err) {
        if (err) {
            console.error('Erreur lors de la mise à jour de l\'annonce:', err.message);
            return res.status(500).send('Erreur lors de la mise à jour de l\'annonce');
        }

        console.log('Annonce mise à jour avec succès:', adId);
        res.redirect('/profile');  // Rediriger vers la page du profil après la modification
    });
}

function showAnnonce(req, res) {
    const token = req.cookies.token;  // Récupérer le token depuis les cookies

    // Vérifier si l'utilisateur est connecté
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            // Si l'utilisateur n'est pas connecté, afficher les annonces validées seulement
            return db.all('SELECT * FROM annonces WHERE status = "validée"', (err, annonces) => {
                if (err) {
                    return res.status(500).send('Erreur lors de la récupération des annonces');
                }
                res.send(homeView(annonces, null));  // Passer `null` pour `user` si non connecté
            });
        }

        // Si l'utilisateur est connecté, afficher les annonces validées avec personnalisation
        db.all('SELECT * FROM annonces WHERE status = "validée"', (err, annonces) => {
            if (err) {
                return res.status(500).send('Erreur lors de la récupération des annonces');
            }
            res.send(homeView(annonces, user));  // Passer `user` pour personnaliser la vue
        });
    });
}

// Fonction pour ajouter une annonce aux favoris
function addFavorite(req, res) {
    const userId = req.user.id;  // ID de l'utilisateur connecté
    const annonceId = req.params.annonceId;  // ID de l'annonce à ajouter aux favoris

    const query = 'INSERT INTO favoris (user_id, annonce_id) VALUES (?, ?)';
    
    db.run(query, [userId, annonceId], function(err) {
        if (err) {
            console.error('Erreur lors de l\'ajout aux favoris:', err.message);
            return res.status(500).send('Erreur lors de l\'ajout aux favoris');
        }
        res.redirect('/home');  // Redirige vers la page d'accueil après avoir ajouté aux favoris
    });
}

// Fonction pour supprimer une annonce des favoris
function removeFavorite(req, res) {
    const userId = req.user.id;  // ID de l'utilisateur connecté
    const annonceId = req.params.annonceId;  // ID de l'annonce à supprimer des favoris

    const query = 'DELETE FROM favoris WHERE user_id = ? AND annonce_id = ?';
    
    db.run(query, [userId, annonceId], function(err) {
        if (err) {
            console.error('Erreur lors de la suppression des favoris:', err.message);
            return res.status(500).send('Erreur lors de la suppression des favoris');
        }
        res.redirect('/favorites');  // Redirige vers la page d'accueil après avoir supprimé des favoris
    });
}

// Fonction pour afficher les favoris de l'utilisateur
function showFavorites(req, res) {
    const userId = req.user.id;  // ID de l'utilisateur connecté

    const query = `
        SELECT annonces.* FROM annonces
        INNER JOIN favoris ON favoris.annonce_id = annonces.id
        WHERE favoris.user_id = ?
    `;
    
    db.all(query, [userId], (err, rows) => {
        if (err) {
            console.error('Erreur lors de l\'affichage des favoris:', err.message);
            return res.status(500).send('Erreur lors de l\'affichage des favoris');
        }
        
        res.send(favoritesView(rows));  // Envoyer une vue avec les annonces favorites
    });
}

module.exports = { showProfile, showDepot, traitDepot, supprDepot, afficherModifierAnnonce, modifierAnnonce, showAnnonce, addFavorite, removeFavorite, showFavorites}