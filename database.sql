CREATE SCHEMA IF NOT EXISTS `schedule` DEFAULT CHARACTER SET utf8 ;
USE `schedule` ;

CREATE TABLE IF NOT EXISTS `schedule`.`schedule` (
  `id_schedule` INT NOT NULL AUTO_INCREMENT,
  `date_time` DATETIME NOT NULL,
  `receiver` VARCHAR(100) NOT NULL,
  `message` TEXT NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  `type_message` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_schedule`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


CREATE TABLE IF NOT EXISTS `schedule`.`users` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_user`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
