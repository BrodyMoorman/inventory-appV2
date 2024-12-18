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
-- Table structure for table `bins`
--

DROP TABLE IF EXISTS `bins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bins` (
  `idbins` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shelveid` int DEFAULT NULL,
  `x` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `rownum` int DEFAULT NULL,
  `partid` int DEFAULT NULL,
  PRIMARY KEY (`idbins`),
  KEY `bintoshelve_idx` (`shelveid`),
  KEY `parttobin_idx` (`partid`),
  CONSTRAINT `bintoshelve` FOREIGN KEY (`shelveid`) REFERENCES `shelvingunits` (`idshelvingunits`),
  CONSTRAINT `parttobin` FOREIGN KEY (`partid`) REFERENCES `parts` (`idparts`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_as_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bins`
--

LOCK TABLES `bins` WRITE;
/*!40000 ALTER TABLE `bins` DISABLE KEYS */;
INSERT INTO `bins` VALUES (1,'Bin 1-1',10,0,100,1,NULL),(2,'Bin 2-1',10,0,100,2,6),(3,'Bin 1-3',10,219,100,1,NULL),(4,'Bin 2-2',10,106,100,2,NULL),(5,'Bin 2-3',10,217,100,2,100001),(6,'Bin 1-2',10,103,100,1,1),(7,'Bin 3-1',10,0,100,3,NULL),(8,'Bin 3-2',10,104,100,3,NULL),(9,'Bin 3-3',10,209,100,3,11),(10,'Bin 1-1',NULL,0,100,1,NULL),(11,'Bin 2-1',NULL,0,100,2,NULL),(12,'Bin 2-2',NULL,148,100,2,NULL),(13,'Bin 3-1',NULL,0,100,3,NULL),(14,'Bin 3-2',NULL,134,100,3,NULL),(15,'Bin 1-2',NULL,172,100,1,NULL),(16,'Bin 1-1',NULL,0,100,1,NULL),(17,'Bin 2-1',NULL,0,100,2,NULL),(18,'Bin 2-2',NULL,122,100,2,NULL),(19,'Bin 1-2',NULL,104,100,1,NULL),(20,'Bin 1-1',NULL,0,100,1,NULL),(21,'Bin 2-1',NULL,0,100,2,NULL),(22,'Bin 1-1',NULL,0,100,1,NULL),(23,'Bin 2-1',NULL,0,100,2,NULL),(24,'Bin 1-1',11,0,100,1,NULL),(25,'Bin 2-1',11,0,100,2,3),(26,'Bin 1-1',24,0,100,1,NULL),(27,'Bin 3-1',24,0,216,3,NULL),(28,'Bin 3-2',24,228,100,3,NULL),(29,'Bin 3-3',24,350,100,3,NULL),(30,'Bin 2-1',24,0,100,2,NULL);
/*!40000 ALTER TABLE `bins` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-18  9:49:47
