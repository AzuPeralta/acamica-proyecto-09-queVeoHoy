//FALTA INSTALAR TODO LO REQUERIDO EN LA CONSOLA. EXPRESS, CORS, ETC.

//paquetes necesarios para el proyecto
const express = require('express');
//Se instala corriendo en la consola "npm install express --save"

// var bodyParser = require('body-parser'); Esto esta obsoleto. La funcion fue absorbida por express.

const cors = require('cors');
//Se instala corriendo en la consola "npm install cors --save"

const app = express();

//Se referencia al controlador como indica la guia.
const controlador = require('./controladores/controlador');


app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get('/peliculas?', controlador.traerTodasLasPeliculas);

app.get('/generos', controlador.traerTodosLosGeneros);

app.get('/peliculas/:id', controlador.infoPeli);
//para obtener la informacion de la pelicula, al conocer el id de la peli, se manda via path_params

app.get('/peliculas/recomendacion?', controlador.recomendarPeli);
//para obtener parametros de busqueda se utiliza query_params


//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = '8080';

app.listen(puerto, function () {
  console.log( `Escuchando en el puerto ${puerto}`);
});