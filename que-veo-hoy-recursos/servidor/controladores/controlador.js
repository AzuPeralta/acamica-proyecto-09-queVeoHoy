const conexion = require('../lib/conexionbd');

function traerTodasLasPeliculas(req, res){

    let anio = req.query.anio;
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let columna_orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;

    let sql = 'select * from pelicula where genero_id = ? AND anio = ? ORDER BY' + conexion.escapeId(columna_orden, tipo_orden);
    //titulo LIKE "%?%" AND columna_orden, tipo_orden   ;'
    
    conexion.query(sql, [genero, anio], function(error, resultado, fields){
        if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        let response = {
            'peliculas': resultado
        };
        res.send(JSON.stringify(response));
    });
}


function traerTodosLosGeneros (req,res) {
    let sql = 'SELECT * FROM genero';

    conexion.query(sql, function(error, resultado, fields){
        if(error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        let response = {
            'generos': resultado
        };
        res.send(JSON.stringify(response));
    });
}

module.exports = {
    traerTodasLasPeliculas : traerTodasLasPeliculas,
    traerTodosLosGeneros: traerTodosLosGeneros,
};