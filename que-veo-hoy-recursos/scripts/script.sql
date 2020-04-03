CREATE DATABASE peliculas;
USE peliculas;

CREATE TABLE pelicula(
    id  INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    duracion INT(5),
    director VARCHAR(400) NOT NULL,
    anio INT,
    fecha_lanzamiento DATE,
    puntuacion INT(2),
    poster VARCHAR(300),
    trama VARCHAR(700),
    PRIMARY KEY (id));

SOURCE C:\Users\marie\Documents\ACAMICA\Proyectos\Proyectos\09 - Que Veo Hoy\que-veo-hoy-recursos\scripts\script-paso-1-peliculas.sql;

-- Se crea la base de datos, la tabla y se inserta la informacion pre-existente en script de recursos descargables.