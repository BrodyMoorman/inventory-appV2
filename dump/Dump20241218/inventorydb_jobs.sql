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
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `idjobs` int NOT NULL AUTO_INCREMENT,
  `jobname` varchar(45) NOT NULL,
  `jobdesc` varchar(256) DEFAULT NULL,
  `creationdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `expecteddate` varchar(64) DEFAULT NULL,
  `completeddate` date DEFAULT NULL,
  `jobstatus` varchar(45) DEFAULT NULL,
  `jobcreator` int NOT NULL,
  `assemblyinstance` int DEFAULT NULL,
  PRIMARY KEY (`idjobs`),
  KEY `jobtocreator_idx` (`jobcreator`),
  CONSTRAINT `jobtocreator` FOREIGN KEY (`jobcreator`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (4,'New Job',NULL,'2024-01-11 11:41:51','2024-01-24',NULL,'completed',3,NULL),(5,'Epic Job',NULL,'2024-01-11 13:33:59','2024-01-08',NULL,'completed',3,NULL),(6,'Another Job Test',NULL,'2024-01-11 14:12:08','2024-01-23',NULL,'completed',3,NULL),(7,'PSU for Brody',NULL,'2024-01-15 10:37:32','',NULL,'completed',3,NULL),(8,'Jacksons Job',NULL,'2024-01-15 12:41:25','2024-01-22',NULL,'in progress',3,NULL),(9,'Testing Job',NULL,'2024-01-24 22:03:05','2024-01-31',NULL,'completed',3,NULL),(10,'Another Job For Testing',NULL,'2024-02-05 16:12:37','2024-02-19',NULL,'in progress',3,NULL),(11,'Final Job Test',NULL,'2024-03-06 13:46:36','2024-03-15',NULL,'in progress',3,NULL),(12,'Instancing Test',NULL,'2024-08-23 09:23:01','2024-08-30',NULL,'in progress',3,NULL);
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
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
