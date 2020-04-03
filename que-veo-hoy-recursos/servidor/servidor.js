//FALTA INSTALAR TODO LO REQUERIDO EN LA CONSOLA. EXPRESS, CORS, ETC.

//paquetes necesarios para el proyecto
const express = require('express');
// var bodyParser = require('body-parser'); Esto esta obsoleto. La funcion fue absorbida por express.
const cors = require('cors');

const app = express();

//Se referencia al controlador como indica la guia.
const controlador = require('/controladores/controlador');


app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

