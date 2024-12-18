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
-- Table structure for table `shelvingunits`
--

DROP TABLE IF EXISTS `shelvingunits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelvingunits` (
  `idshelvingunits` int NOT NULL AUTO_INCREMENT,
  `shelvename` varchar(45) DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `x` int DEFAULT NULL,
  `y` int DEFAULT NULL,
  `roomid` int DEFAULT NULL,
  `numrows` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`idshelvingunits`),
  KEY `shelvetoroom_idx` (`roomid`),
  CONSTRAINT `shelvetoroom` FOREIGN KEY (`roomid`) REFERENCES `rooms` (`idrooms`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shelvingunits`
--

LOCK TABLES `shelvingunits` WRITE;
/*!40000 ALTER TABLE `shelvingunits` DISABLE KEYS */;
INSERT INTO `shelvingunits` VALUES (1,'Shelf 0',100,201,143,0,1,3),(2,'Shelf 2',100,201,431,0,1,1),(3,'Shelf 3',100,201,569,0,1,1),(4,'Shelf 4',100,201,709,0,1,4),(5,'Shelf 1',100,201,290,0,1,1),(6,'Shelf 5',100,201,847,0,1,1),(7,'Shelf 6',100,201,980,0,1,1),(8,'Shelf 7',100,201,1114,0,1,1),(9,'Shelf 8',100,201,1118,279,1,1),(10,'Shelf 9',100,201,987,280,1,3),(11,'Shelf 10',100,201,855,281,1,2),(12,'Shelf 11',100,201,712,282,1,1),(13,'Shelf 12',100,201,572,282,1,1),(14,'Shelf 13',100,201,437,281,1,1),(15,'Shelf 14',100,201,291,281,1,1),(16,'Shelf 15',100,200,145,282,1,1),(17,'Shelf 16',201,101,144,608,1,1),(18,'Shelf 17',201,101,340,608,1,1),(19,'Shelf 18',201,101,537,608,1,1),(20,'Shelf 19',201,101,734,608,1,1),(21,'Shelf 20',201,101,933,608,1,1),(22,'Shelf 0',385,100,0,0,2,1),(23,'Shelf 4',385,100,382,252,2,1),(24,'Shelf 5',385,100,765,253,2,3),(25,'Shelf 1',385,100,380,0,2,1),(26,'Shelf 6',385,100,769,609,2,1),(27,'Shelf 2',385,100,761,0,2,1),(28,'Shelf 7',385,100,386,609,2,1),(29,'Shelf 3',385,100,0,256,2,1),(30,'Shelf 8',385,100,0,609,2,1);
/*!40000 ALTER TABLE `shelvingunits` ENABLE KEYS */;
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
