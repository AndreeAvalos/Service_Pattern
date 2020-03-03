'use strict';
const express = require('express');
const app = express();
const PORT = 8080;
const HOST = '0.0.0.0';

var body_parser = require('body-parser').json();

const mysql = require('mysql');
// connection configurations
const mc = mysql.createConnection({
    host: '35.188.13.111',
    user: 'root',
    password: 'root',
    database: 'DB_PazHUB'
});
mc.connect();

app.get('/', (req,res)=>{
    res.send("HellowWorld");
})

app.post('/login',body_parser, function(req,response){
    var email = req.body.email;
    var password = req.body.password;

    if (email && password) {
    var query = 'select * from Usuarios where correo_electronico = ? and contrasena = ?';
    mc.query(query,[email,password], function (error, results, fields) {
        if (results.length > 0) {
            response.send("Bienvenido "+email)
        } else {
            response.send('Credenciales incorrectas');
        }			
        response.end();
    });
    } else {
        response.send('ingresar Email y Password');
        response.end();
    }     
});
app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
