const db = require('../db/db');
const jwt = require('jsonwebtoken');
const adminView = require('../view/adminView');

// Route pour afficher la page d'administration
function showAdminPage(req, res) {
    const query = 'SELECT * FROM annonces WHERE status = "en attente"';
  
    db.all(query, (err, annonces) => {
      if (err) {
        console.error('Erreur lors de la récupération des annonces:', err.message);
        return res.status(500).send('Erreur serveur');
      }
  
      // Utilisation de adminView même s'il n'y a pas d'annonces en attente
      // Passer les annonces (même si c'est vide) à la vue
      res.send(adminView(annonces));
    });
  }

// Route pour approuver une annonce
function approveAnnonce(req, res) {
    const { adId } = req.params;  // Récupérer l'ID de l'annonce depuis les paramètres

    const query = 'UPDATE annonces SET status = "validée" WHERE id = ?';
    db.run(query, [adId], function(err) {
        if (err) {
            return res.status(500).send('Erreur lors de la validation de l\'annonce');
        }

        console.log('Annonce validée avec succès:', adId);
        res.redirect('/admin'); // Rediriger vers la page d'administration après la validation
    });
}

// Route pour refuser une annonce
function rejectAnnonce(req, res) {
    const { adId } = req.params;  // Récupérer l'ID de l'annonce depuis les paramètres

    const query = 'UPDATE annonces SET status = "refusée" WHERE id = ?';
    db.run(query, [adId], function(err) {
        if (err) {
            return res.status(500).send('Erreur lors du refus de l\'annonce');
        }

        console.log('Annonce refusée avec succès:', adId);
        res.redirect('/admin'); // Rediriger vers la page d'administration après le refus
    });
}

module.exports = { showAdminPage, approveAnnonce, rejectAnnonce };
