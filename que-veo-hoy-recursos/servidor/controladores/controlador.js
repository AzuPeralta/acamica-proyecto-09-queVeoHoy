const conexion = require('../lib/conexionbd');

function traerTodasLasPeliculas(req, res){
    let sql = 'SELECT * FROM pelicula'
    conexion.query(sql, function(error, resultado, fields){
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
    let sql = 'SELECT * FROM genero'
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