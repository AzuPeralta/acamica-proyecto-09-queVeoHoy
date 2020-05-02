--Se crea la tabla ACTOR

CREATE TABLE `peliculas`.`actor` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(70) NOT NULL,
  PRIMARY KEY (`id`));


-- Se crea la tabla de referencias actor_pelicula con las foreign keys
CREATE TABLE `peliculas`.`actor_pelicula` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `actor_id` INT NOT NULL,
  `pelicula_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `actor_id_idx` (`actor_id` ASC) VISIBLE,
  INDEX `pelicula_id_idx` (`pelicula_id` ASC) VISIBLE,
  CONSTRAINT `actor_id`
    FOREIGN KEY (`actor_id`)
    REFERENCES `peliculas`.`actor` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `pelicula_id`
    FOREIGN KEY (`pelicula_id`)
    REFERENCES `peliculas`.`pelicula` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
