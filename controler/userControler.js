const loginView = require('../view/loginView');
const db = require('../db/db');
const user = require('../modele/User');


function showLogin(req, res) {
    res.send(loginView());
}

function traitLogin(req, res) {
    const {username, password} = req.body;
}

module.exports = showLogin;