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
-- Table structure for table `parts`
--

DROP TABLE IF EXISTS `parts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parts` (
  `idparts` int NOT NULL AUTO_INCREMENT,
  `partname` varchar(45) NOT NULL,
  `count` int DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `restocklink` varchar(45) DEFAULT NULL,
  `restockphonenumber` varchar(45) DEFAULT NULL,
  `manufacturer` varchar(45) DEFAULT NULL,
  `mfgno` varchar(45) DEFAULT NULL,
  `binid` int DEFAULT NULL,
  PRIMARY KEY (`idparts`),
  UNIQUE KEY `partname_UNIQUE` (`partname`),
  KEY `parttobin_idx` (`binid`)
) ENGINE=InnoDB AUTO_INCREMENT=100003 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parts`
--

LOCK TABLES `parts` WRITE;
/*!40000 ALTER TABLE `parts` DISABLE KEYS */;
INSERT INTO `parts` VALUES (1,'Fake Part',5,'Room 1, Shelf 9, Bin 1-2',12.99,'https://google.com/',NULL,'Poop. McGoo','133769',6),(2,'Test Part',501,'unassigned',12.11,'Google.com',NULL,'Amazon','42142',NULL),(3,'12mm Screw',144,'Room 1, Shelf 10, Bin 2-1',0.02,NULL,NULL,'Ace Vending','42142',25),(4,'5A Fuse',523,'unassigned',0.56,NULL,NULL,'Albertson Electrical','53123',NULL),(6,'Electrical Tape',1234,'Room 1, Shelf 9, Bin 2-1',2,NULL,NULL,'Walmart','42142',2),(7,'4in PVC T Fitting',24,'Unassigned',0.75,'www.amazon.com',NULL,'Ace Hardware','84232',NULL),(8,'Gorilla Glue',32,'Unassigned',4.32,'Amazon.com',NULL,'Amazon','3241',NULL),(9,'15A Fuse',10,'Unassigned',0.1,'acehardware.com',NULL,'Orville Electrical','40631',NULL),(10,'1in Copper Fitting',32,'Unassigned',1.24,'copper.com',NULL,'CopperHub','2451',NULL),(11,'1/2in Ball Bearing',12,'Room 1, Shelf 9, Bin 3-3',1,'ballbearings.com',NULL,'BallBearing Co.','3242',9),(100000,'7A Fuse',90,'Unassigned',7.42,'fuzeclan.gg',NULL,'FuzeClan','42231',NULL),(100001,'Steel Ball',3,'Room 1, Shelf 9, Bin 2-3',100,'balling.com',NULL,'SteelBallers Co.','32521',5),(100002,'3\" PVC fitting',1,'Unassigned',0.5,'acehardware.com',NULL,'FuzeClan','42321',NULL);
/*!40000 ALTER TABLE `parts` ENABLE KEYS */;
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
