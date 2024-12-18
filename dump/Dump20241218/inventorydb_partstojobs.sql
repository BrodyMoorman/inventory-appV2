-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: inventorydb
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `partstojobs`
--

DROP TABLE IF EXISTS `partstojobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `partstojobs` (
  `idpartstojobs` int NOT NULL AUTO_INCREMENT,
  `partid` int NOT NULL,
  `jobid` int NOT NULL,
  `numneeded` int DEFAULT NULL,
  `numused` int DEFAULT NULL,
  PRIMARY KEY (`idpartstojobs`),
  KEY `partid_idx` (`partid`),
  KEY `jobid_idx` (`jobid`),
  CONSTRAINT `jobid` FOREIGN KEY (`jobid`) REFERENCES `jobs` (`idjobs`),
  CONSTRAINT `partid` FOREIGN KEY (`partid`) REFERENCES `parts` (`idparts`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `partstojobs`
--

LOCK TABLES `partstojobs` WRITE;
/*!40000 ALTER TABLE `partstojobs` DISABLE KEYS */;
INSERT INTO `partstojobs` VALUES (7,6,4,4,4),(8,2,4,12,12),(9,1,4,19,19),(10,2,5,65,0),(11,4,5,12,0),(12,3,5,9,0),(13,6,6,4,4),(14,2,6,12,0),(15,1,6,19,0),(16,1,7,21,0),(17,2,7,12,0),(18,6,7,4,3),(19,1,8,19,0),(20,2,8,12,0),(21,6,8,4,0),(22,3,8,22,10),(23,6,9,4,1),(24,2,9,12,12),(25,1,9,19,0),(26,4,9,1,0),(27,1,10,19,0),(28,2,10,12,12),(29,6,10,4,4),(30,3,10,21,21),(31,1,11,19,3),(32,2,11,12,12),(33,6,11,4,0),(34,3,12,2,0),(35,4,12,3,0),(36,6,12,1,0);
/*!40000 ALTER TABLE `partstojobs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-18  9:49:46
