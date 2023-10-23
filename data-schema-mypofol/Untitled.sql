-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema webdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema webdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `webdb` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin ;
USE `webdb` ;

-- -----------------------------------------------------
-- Table `dept`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `dept` ;

CREATE TABLE IF NOT EXISTS `dept` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emp`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emp` ;

CREATE TABLE IF NOT EXISTS `emp` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `dept_no` INT NULL,
  PRIMARY KEY (`no`),
  CONSTRAINT `fk_emp_dept`
    FOREIGN KEY (`dept_no`)
    REFERENCES `dept` (`no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author` ;

CREATE TABLE IF NOT EXISTS `author` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `book` ;

CREATE TABLE IF NOT EXISTS `book` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `rent` ENUM('Y', 'N') NOT NULL DEFAULT 'N',
  `author_no` INT NOT NULL,
  PRIMARY KEY (`no`),
  CONSTRAINT `fk_book_author1`
    FOREIGN KEY (`author_no`)
    REFERENCES `author` (`no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `emaillist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `emaillist` ;

CREATE TABLE IF NOT EXISTS `emaillist` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `gender` ENUM('female', 'male') NOT NULL,
  `join_date` DATE NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `guestbook`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `guestbook` ;

CREATE TABLE IF NOT EXISTS `guestbook` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(64) NOT NULL,
  `message` TEXT NOT NULL,
  `reg_date` DATETIME NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `board`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `board` ;

CREATE TABLE IF NOT EXISTS `board` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(200) NOT NULL,
  `contents` TEXT NOT NULL,
  `hit` INT NOT NULL,
  `reg_date` DATETIME NOT NULL,
  `g_no` INT NOT NULL,
  `o_no` INT NOT NULL,
  `depth` INT NOT NULL,
  `user_no` INT NOT NULL,
  PRIMARY KEY (`no`),
  CONSTRAINT `fk_board_user1`
    FOREIGN KEY (`user_no`)
    REFERENCES `user` (`no`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `site`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `site` ;

CREATE TABLE IF NOT EXISTS `site` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `welcome` VARCHAR(200) NOT NULL,
  `profile` VARCHAR(200) NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `gallery`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gallery` ;

CREATE TABLE IF NOT EXISTS `webdb`.`gallery` (
  `no` INT NOT NULL AUTO_INCREMENT,
  `comments` VARCHAR(200) NOT NULL,
  `url` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`no`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;