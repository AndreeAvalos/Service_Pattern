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
    var createdAt = new Date();
    var updatedAt = new Date();

    var query = 'insert into Usuarios(User_Name,Correo_Electronico, Primer_Nombre,Segundo_Nombre, Primer_Apellido, Segundo_Apellido,' 
                +'Telefono, Fecha_Nacimiento, Pais, Ciudad, Contrasena, createdAt, updatedAt) '
                +'values("'+user_name+'","'+ email+'","'+primer_nombre+'","'+ segundo_nombre+'","'+ primer_apellido+'","'+segundo_apellido
                +'",'+ telefono +',"'+ fecha_nacimiento.format("%Y/%m/%d", true)+'","'+ pais+'","'+ ciudad+'","'+ password +'","'+ createdAt.format ("%Y/%m/%d", true)+'","'+ updatedAt.format ("%Y/%m/%d", true) +'");'
    
    mc.query(query, function (err, result) {
        if (err){
            res.send("FAIL!!!");throw err;}
        else{
            res.send("SUCCESS");}
        });        
});

Date.prototype.format = function(fstr, utc) {
    var that = this;
    utc = utc ? 'getUTC' : 'get';
    return fstr.replace (/%[YmdHMS]/g, function (m) {
      switch (m) {
      case '%Y': return that[utc + 'FullYear'] ();
      case '%m': m = 1 + that[utc + 'Month'] (); break;
      case '%d': m = that[utc + 'Date'] (); break;
      case '%H': m = that[utc + 'Hours'] (); break;
      case '%M': m = that[utc + 'Minutes'] (); break;
      case '%S': m = that[utc + 'Seconds'] (); break;
      default: return m.slice (1); 
      }    
      return ('0' + m).slice (-2);
    });
  };

app.listen(PORT,HOST);
console.log(`Running on http://${HOST}:${PORT}`);
