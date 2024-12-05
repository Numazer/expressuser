const express = require('express');
const app = express();
const showLogin = require('./controler/userControler')

app.listen(3000, (res,req) => {console.log('coucou')});

app.get('/login', (res, req) => {showLogin(res, req)});