-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Sep 11, 2017 at 12:02 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `telotslibrary`
--
CREATE DATABASE IF NOT EXISTS `telotslibrary` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `telotslibrary`;

-- --------------------------------------------------------

--
-- Table structure for table `questionposing`
--

DROP TABLE IF EXISTS `questionposing`;
CREATE TABLE IF NOT EXISTS `questionposing` (
  `UID` int(11) NOT NULL AUTO_INCREMENT,
  `QUESTIONS` varchar(1000) NOT NULL,
  PRIMARY KEY (`UID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=206 ;

--
-- Dumping data for table `questionposing`
--

INSERT INTO `questionposing` (`UID`, `QUESTIONS`) VALUES
(162, 'what is your name'),
(163, 'where are u from'),
(165, 'what is your father name??'),
(166, 'where do you live by??'),
(167, 'who is your favorite actor??'),
(168, 'who is your role model??'),
(174, 'what is your mothers name??'),
(175, 'what is your Date of Birth??'),
(176, 'what is your country name??');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
