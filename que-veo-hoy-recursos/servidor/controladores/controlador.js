const conexion = require('../lib/conexionbd');

function traerTodasLasPeliculas(req, res){
    let anio = req.query.anio;
    let titulo = req.query.titulo;
    let genero = req.query.genero;
    let columna_orden = req.query.columna_orden;
    let tipo_orden = req.query.tipo_orden;
    let cantidad = 20;
    let pagina = req.query.pagina;
    let limit = (pagina - 1) * cantidad;
    let filtros = [];
    let parcialQuery = `select * from pelicula`;

    if (genero || titulo || anio) parcialQuery += ` where `;

    if (genero) {
        parcialQuery += `genero_id = ${genero} `;
    }

    if (titulo) {
        if(genero) parcialQuery += `and `;
        parcialQuery += `titulo like "%${titulo}%" `;
    }

    if (anio) {
        if(titulo || genero) parcialQuery += `and `;
        parcialQuery += `anio = ${anio} `;
    }

    parcialQuery += ` order by ${columna_orden} ${tipo_orden}`;

    let paginacion = parcialQuery + ` limit ${limit}, ${cantidad}`;

    conexion.query(paginacion,
        function(error, resultado, fields){

            if(error){
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
            }
            conexion.query(parcialQuery, filtros,
                function(err, resp, f){
                    if(err){
                        console.log("Hubo un error en la consulta", error.message);
                        return res.status(404).send("Hubo un error en la consulta");
                        }
                    let conteo = resp.length;

                    let response = {
                        'peliculas': resultado,
                        'total': conteo,
                        };
                        res.send(JSON.stringify(response));
                })
        }
    );
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

function infoPeli(req, res){
    let id = req.params.id;
    let sql = `select * from pelicula join genero on pelicula.genero_id = genero.id join actor_pelicula on actor_pelicula.pelicula_id = pelicula.id join actor on actor.id = actor_pelicula.actor_id where pelicula.id = ${id}`

    conexion.query(sql, function(error, resultado, fields){
        if(error) {
            console.log("Hubo un error en la consulta", error.message);
            return res.status(404).send("Hubo un error en la consulta");
        }
        let resultadoGenero = resultado[0].nombre_genero;

        let response = {
            'pelicula': resultado[0],
            'actores': resultado,
            'genero': resultadoGenero
        };
        res.send(JSON.stringify(response));
    });
};

function recomendarPeli(req, res){
    //Informacion obtenida por query.
    let genero = req.query.genero;
    let anio_inicio = req.query.anio_inicio;
    let anio_fin = req.query.anio_fin;
    let puntuacion = req.query.puntuacion;


    let filtrosRecomendacion = [];
    let queryParcial = 'select * from genero join pelicula on genero_id = genero.id'

    if (genero || anio_inicio || anio_fin || puntuacion) queryParcial += ' where ';

    if (genero) {
        queryParcial += 'genero.nombre_genero = ? ';
        filtrosRecomendacion.push(genero);
    }

    if (anio_inicio) {
        if(genero) queryParcial += 'and ';
        queryParcial += 'pelicula.anio >= ? ';
        filtrosRecomendacion.push(anio_inicio);
    }

    if (anio_fin) {
        if(genero || anio_inicio) queryParcial += 'and ';
        queryParcial += 'pelicula.anio <= ? ';
        filtrosRecomendacion.push(anio_fin);
    }

    if (puntuacion) {
        if(genero || anio_inicio || anio_fin) queryParcial += 'and ';
        queryParcial += 'pelicula.puntuacion > ?';
        filtrosRecomendacion.push(puntuacion);
    }

    conexion.query(queryParcial, filtrosRecomendacion, function(error, resultado, fields){
       if(error){
           console.log("Hubo un error en la consulta", error.message);
           return res.status(404).send("Hubo un error en la consulta");
       }
       let response = {
           'peliculas': resultado,
       };
       res.send(JSON.stringify(response));
});}

module.exports = {
    traerTodasLasPeliculas : traerTodasLasPeliculas,
    traerTodosLosGeneros: traerTodosLosGeneros,
    infoPeli: infoPeli,
    recomendarPeli: recomendarPeli,
};