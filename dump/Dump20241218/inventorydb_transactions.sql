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
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transactions` (
  `transactionid` int NOT NULL AUTO_INCREMENT,
  `partid` int DEFAULT NULL,
  `transactiontype` varchar(45) DEFAULT NULL,
  `quantity` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `transactorid` int DEFAULT NULL,
  `transactionfile` varchar(256) DEFAULT NULL,
  `stockbefore` int NOT NULL,
  `stockafter` int NOT NULL,
  `jobid` int DEFAULT NULL,
  `transactiondesc` varchar(256) DEFAULT NULL,
  `add` tinyint NOT NULL,
  PRIMARY KEY (`transactionid`),
  UNIQUE KEY `transactionid_UNIQUE` (`transactionid`),
  KEY `transactorid_idx` (`transactorid`),
  KEY `idofpart_idx` (`partid`),
  KEY `jobid_idx` (`jobid`),
  CONSTRAINT `idofjob` FOREIGN KEY (`jobid`) REFERENCES `jobs` (`idjobs`),
  CONSTRAINT `idofpart` FOREIGN KEY (`partid`) REFERENCES `parts` (`idparts`),
  CONSTRAINT `transactorid` FOREIGN KEY (`transactorid`) REFERENCES `users` (`idusers`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (13,3,'Assembly',10,'2024-02-02 23:35:09',3,NULL,145,135,8,NULL,0),(14,2,'Purchase',10,'2024-02-02 23:37:04',3,'1706917024109BrodyMoormanCOT4210HW1.pdf',308,318,NULL,NULL,1),(15,3,'Assembly',4,'2024-02-05 21:12:52',3,NULL,135,131,10,NULL,0),(16,3,'Assembly',17,'2024-02-05 21:13:00',3,NULL,131,114,10,NULL,0),(17,3,'Purchase',22,'2024-02-09 21:43:30',3,'1707515010096sampleInstructionDocument.pdf',114,136,NULL,NULL,1),(18,2,'Assembly',12,'2024-02-09 21:43:58',3,NULL,318,306,4,NULL,0),(19,1,'Assembly',19,'2024-02-09 21:44:05',3,NULL,323,304,4,NULL,0),(20,6,'Assembly',4,'2024-02-09 21:44:08',3,NULL,1242,1238,4,NULL,0),(21,2,'Assembly',12,'2024-02-29 18:47:54',3,NULL,306,294,9,NULL,0),(22,6,'Assembly',4,'2024-03-05 02:26:58',3,NULL,1238,1234,10,NULL,0),(23,100002,'Assembly',0,'2024-03-05 02:30:34',3,NULL,3,3,4,NULL,0),(24,100002,'Restock',0,'2024-03-06 19:11:29',3,NULL,3,3,NULL,NULL,1),(25,100002,'Restock',10,'2024-03-06 19:11:37',3,NULL,3,13,NULL,NULL,1),(26,100002,'Purchase',3,'2024-03-06 19:35:28',3,NULL,5,8,NULL,NULL,1),(27,100002,'Assembly',7,'2024-03-06 19:35:57',3,NULL,8,1,5,NULL,0),(28,1,'Assembly',300,'2024-03-06 19:38:15',3,NULL,304,4,NULL,NULL,0),(29,1,'Assembly',3,'2024-03-06 19:46:53',3,NULL,4,1,11,NULL,0),(30,2,'Restock',12,'2024-03-23 16:06:20',3,NULL,294,306,NULL,NULL,1),(31,2,'Restock',0,'2024-03-23 16:08:06',3,NULL,306,306,NULL,NULL,1),(32,2,'',0,'2024-03-23 16:08:15',3,NULL,306,306,NULL,NULL,1),(33,2,'Purchase',219,'2024-03-23 16:13:19',3,NULL,306,525,NULL,NULL,1),(34,1,'Purchase',4,'2024-03-25 03:45:26',3,NULL,1,5,4,NULL,1),(35,2,'Assembly',12,'2024-03-26 18:24:08',3,NULL,525,513,10,NULL,0),(36,3,'Restock',8,'2024-08-18 00:16:14',3,NULL,136,144,NULL,NULL,1),(37,2,'Assembly',12,'2024-08-27 23:53:51',3,NULL,513,501,11,NULL,0);
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
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
