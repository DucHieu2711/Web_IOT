-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: tram_chim
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
-- Table structure for table `messtram`
--

DROP TABLE IF EXISTS `messtram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messtram` (
  `id` int NOT NULL AUTO_INCREMENT,
  `station_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `volt_battery` decimal(10,4) DEFAULT NULL,
  `volt_solar` decimal(10,4) DEFAULT NULL,
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `station_id_thongtintram` (`station_id`),
  KEY `idx_timestamp` (`timestamp`),
  CONSTRAINT `station_id_thongtintram` FOREIGN KEY (`station_id`) REFERENCES `thongtintram` (`station_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messtram`
--

LOCK TABLES `messtram` WRITE;
/*!40000 ALTER TABLE `messtram` DISABLE KEYS */;
INSERT INTO `messtram` VALUES (4,'TRC-solar-air-001',12.5000,5.3000,'2023-09-30 16:33:11'),(6,'TRC-solar-air-002',12.5000,5.3000,'2023-09-30 16:33:11'),(7,'TRC-solar-air-003',12.5000,5.3000,'2023-10-01 14:46:12'),(8,'TRC-solar-air-004',12.5000,5.3000,'2023-09-30 16:33:11'),(9,'TRC-solar-air-005',12.5000,5.3000,'2023-10-01 14:02:42'),(10,'TRC-solar-air-006',12.5000,5.3000,'2023-09-30 16:33:11'),(11,'TRC-water-sensor-001',12.5000,5.3000,'2023-09-30 16:33:11'),(12,'TRC-water-sensor-002',12.5000,5.3000,'2023-09-30 16:33:11'),(13,'TRC-water-sensor-003',12.5000,5.3000,'2023-09-30 16:33:11'),(14,'TRC-water-sensor-004',12.5000,5.3000,'2023-09-30 16:33:11'),(15,'TRC-water-sensor-005',12.5000,5.3000,'2023-09-30 16:33:11'),(16,'TRC-water-sensor-006',12.5000,5.3000,'2023-09-30 16:33:11'),(17,'TRC-solar-air-003',12.5000,5.3000,'2023-10-01 15:16:23'),(18,'TRC-solar-air-005',12.5000,5.3000,'2023-10-01 14:02:42'),(19,'TRC-solar-air-005',12.5000,5.3000,'2023-10-01 14:02:42'),(20,'TRC-solar-air-005',12.5000,5.3000,'2023-10-04 10:22:32'),(21,'TRC-solar-air-003',12.5000,5.3000,'2023-10-04 15:10:04'),(22,'TRC-solar-air-003',12.5000,5.3000,'2023-10-05 21:50:05'),(23,'TRC-solar-air-002',12.5000,5.3000,'2023-10-05 22:00:24'),(26,'TRC-solar-air-005',12.5000,5.3000,'2023-10-05 19:36:22'),(27,'TRC-solar-air-002',12.5000,5.3000,'2023-10-07 22:36:53'),(28,'TRC-solar-air-003',12.5000,5.3000,'2023-10-07 22:36:15'),(29,'TRC-solar-air-004',12.5000,5.3000,'2023-10-07 16:33:34'),(30,'TRC-solar-air-005',12.5000,5.3000,'2023-10-07 19:01:12');
/*!40000 ALTER TABLE `messtram` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-10-07 23:17:24
