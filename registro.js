'use strict';
const express = require('express');
const app = express();
const PORT = 3000;
const HOST = '35.232.66.135';

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


app.post('/registro',body_parser, function(req,res){
    var user_name = req.body.user_name;
    var email = req.body.email;
    var primer_nombre = req.body.primer_nombre;
    var segundo_nombre = req.body.segundo_nombre;
    var primer_apellido = req.body.primer_apellido;
    var segundo_apellido = req.body.segundo_apellido;
    var telefono = req.body.telefono;
    var fecha_nacimiento = new Date(req.body.fecha_nacimiento);
    var pais = req.body.pais;
    var ciudad = req.body.ciudad;
    var password = req.body.password;
    var createdAt = new Date(day, month, year);
    var updatedAt = new Date(day, month, year);

    var query = 'nsert into Usuarios(User_Name,Correo_Electronico, Primer_Nombre,Segundo_Nombre, Primer_Apellido, Segundo_Apellido,' 
                +'Telefono, Fecha_Nacimiento, Pais, Ciudad, Contrasena, createdAt, updatedAt) '
                +'values('+user_name+','+ email+','+primer_nombre+','+ segundo_nombre+','+ primer_apellido+','+segundo_apellido
                +','+ telefono +','+ fecha_nacimiento+','+ pais+','+ ciudad+','+ password +','+ createdAt+','+ updatedAt +');'
    
    mc.query(query, function (err, result) {
        if (err){
            res.send("FAIL!!!!");throw err;}
        else{
            res.send("SUCCESS");}
        });
        
});


app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
