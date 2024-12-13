const jwt = require('jsonwebtoken');  // Importer jsonwebtoken

// Middleware pour vérifier le JWT dans les cookies
function authenticateToken(req, res, next) {
    const token = req.cookies.token;  // Récupère le token depuis le cookie
  
    if (!token) {
      return res.status(403).send('Access denied');
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send('Invalid or expired token');
      }
      req.user = user;  // Attacher les informations de l'utilisateur à la requête
      next();
    });
  }

  function isAdmin(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).send('Accès refusé');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).send('Accès refusé');
        }

        if (user.role !== 'admin') {
            return res.status(403).send('Accès uniquement pour les administrateurs');
        }

        req.user = user; // On ajoute l'utilisateur au `request` pour les prochaines étapes
        next();
    });
}
  
  module.exports = authenticateToken, isAdmin;
  