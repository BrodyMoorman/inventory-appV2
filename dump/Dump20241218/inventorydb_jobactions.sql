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
-- Table structure for table `jobactions`
--

DROP TABLE IF EXISTS `jobactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobactions` (
  `idjobactions` int NOT NULL AUTO_INCREMENT,
  `jobid` int NOT NULL,
  `actorid` int NOT NULL,
  `actiontype` varchar(45) DEFAULT NULL,
  `jobactionscol` varchar(64) DEFAULT NULL,
  `newstatus` varchar(45) DEFAULT NULL,
  `partid` int DEFAULT NULL,
  `numcharged` int DEFAULT NULL,
  `actiontime` datetime DEFAULT CURRENT_TIMESTAMP,
  `oldstatus` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idjobactions`),
  KEY `userref_idx` (`actorid`),
  KEY `partref_idx` (`partid`),
  KEY `jobref_idx` (`jobid`),
  CONSTRAINT `jobref` FOREIGN KEY (`jobid`) REFERENCES `jobs` (`idjobs`),
  CONSTRAINT `partref` FOREIGN KEY (`partid`) REFERENCES `parts` (`idparts`),
  CONSTRAINT `userref` FOREIGN KEY (`actorid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobactions`
--

LOCK TABLES `jobactions` WRITE;
/*!40000 ALTER TABLE `jobactions` DISABLE KEYS */;
INSERT INTO `jobactions` VALUES (1,6,3,'part charge',NULL,NULL,6,2,'2024-01-17 14:37:51',NULL),(3,6,3,'status change',NULL,'in progress',NULL,NULL,'2024-01-17 17:42:12','completed'),(4,6,3,'part charge',NULL,NULL,6,2,'2024-01-17 19:22:09',NULL),(5,6,3,'status change',NULL,'completed',NULL,NULL,'2024-01-17 19:23:26','in progress'),(6,9,3,'part charge',NULL,NULL,6,1,'2024-01-24 22:03:20',NULL),(7,9,3,'status change',NULL,'completed',NULL,NULL,'2024-02-02 17:01:18','in progress'),(8,5,3,'status change',NULL,'completed',NULL,NULL,'2024-02-02 17:21:20','in progress'),(9,7,3,'part charge',NULL,NULL,6,3,'2024-02-02 18:07:36',NULL),(10,8,3,'part charge',NULL,NULL,3,10,'2024-02-02 18:35:09',NULL),(11,10,3,'part charge',NULL,NULL,3,4,'2024-02-05 16:12:52',NULL),(12,10,3,'part charge',NULL,NULL,3,17,'2024-02-05 16:13:00',NULL),(13,4,3,'part charge',NULL,NULL,2,12,'2024-02-09 16:43:58',NULL),(14,4,3,'part charge',NULL,NULL,1,19,'2024-02-09 16:44:05',NULL),(15,4,3,'part charge',NULL,NULL,6,4,'2024-02-09 16:44:08',NULL),(16,4,3,'status change',NULL,'completed',NULL,NULL,'2024-02-09 16:44:16','canceled'),(17,9,3,'part charge',NULL,NULL,2,12,'2024-02-29 13:47:54',NULL),(18,10,3,'part charge',NULL,NULL,6,4,'2024-03-04 21:26:58',NULL),(19,11,3,'part charge',NULL,NULL,1,3,'2024-03-06 14:46:53',NULL),(20,10,3,'part charge',NULL,NULL,2,12,'2024-03-26 14:24:08',NULL),(21,11,3,'part charge',NULL,NULL,2,12,'2024-08-27 19:53:51',NULL);
/*!40000 ALTER TABLE `jobactions` ENABLE KEYS */;
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
