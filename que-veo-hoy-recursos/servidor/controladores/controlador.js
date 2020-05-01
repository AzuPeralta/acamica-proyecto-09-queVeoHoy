const conexion = require('../lib/conexionbd');

function traerTodasLasPeliculas(req, res){

    let anio = req.query.anio;
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let columna_orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let pagina = req.query.pagina;
    let cantidad = req.query.cantidad;
    let offset = pagina * cantidad

    if (anio){
        let sql = 'select * from pelicula where anio = ? ORDER BY ?? LIMIT ? offset ?'

        conexion.query(sql, [anio, columna_orden, tipo_orden, cantidad, offset], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
           // let conteo = resultado.length
           let conteo = resultado.length
           console.log(conteo)

            let response = {
                'peliculas': resultado,
                'total': conteo,
            };
            res.send(JSON.stringify(response));
    });}

    else if (titulo){
        let sql = 'select * from pelicula where titulo REGEXP ? ORDER BY ??'

        conexion.query(sql, [titulo, columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
    });}

    else if (genero){
        let sql = 'select * from pelicula where genero_id = ? ORDER BY ??'

        conexion.query(sql, [genero, columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
    });}

    else if (anio && genero){
        let sql = 'select * from pelicula where genero_id = ? AND anio = ? ORDER BY ??'

        conexion.query(sql, [genero, anio, columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
        });}

    else if (titulo && genero){
        let sql = 'select * from pelicula where titulo REGEXP ? AND anio = ? ORDER BY ??'

        conexion.query(sql, [titulo, anio, columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
        });}

    else if (titulo && anio){
        let sql = 'select * from pelicula where titulo REGEXP ? AND genero_id = ? ORDER BY ??'

        conexion.query(sql, [titulo, genero, columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
    });}
     else {
        let sql = 'select * from pelicula ORDER BY ??'

         conexion.query(sql, [columna_orden, tipo_orden], function(error, resultado, fields){
            if(error){
                console.log("Hubo un error en la consulta", error.message);
                return res.status(404).send("Hubo un error en la consulta");
            }
            let response = {
                'peliculas': resultado
            };
            res.send(JSON.stringify(response));
    });}

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