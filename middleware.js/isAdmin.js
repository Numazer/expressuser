const jwt = require('jsonwebtoken');  // Importer jsonwebtoken

// Middleware pour vérifier si l'utilisateur est admin
function isAdmin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.redirect('/login'); // Rediriger si pas de token
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Token invalide');
        }

        // Vérifier si l'utilisateur a un rôle admin
        if (user.role !== 'admin') {
            return res.status(403).send('Accès refusé : administrateur requis');
        }

        // Passer à la fonction suivante si l'utilisateur est admin
        req.user = user;
        next();
    });
}

module.exports = isAdmin;
