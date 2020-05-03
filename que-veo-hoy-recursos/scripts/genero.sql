CREATE TABLE `peliculas`.`genero` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nombre_genero` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

ALTER TABLE `peliculas`.`genero` 
ADD CONSTRAINT `genero_id`
  FOREIGN KEY (`id`)
  REFERENCES `peliculas`.`pelicula` (`genero_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

