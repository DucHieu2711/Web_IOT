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
-- Table structure for table `thongtintram`
--

DROP TABLE IF EXISTS `thongtintram`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `thongtintram` (
  `project_id` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `project_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `station_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `station_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci DEFAULT NULL,
  `longitude` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `latitude` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`station_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `thongtintram`
--

LOCK TABLES `thongtintram` WRITE;
/*!40000 ALTER TABLE `thongtintram` DISABLE KEYS */;
INSERT INTO `thongtintram` VALUES ('TRC-001','TramChimMoritoring','TRC-solar-air-001','Trạm solar-air-001','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-solar-air-002','Trạm solar-air-002','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-solar-air-003','Trạm solar-air-003','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-solar-air-004','Trạm solar-air-004','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-solar-air-005','Trạm solar-air-005','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-solar-air-006','Trạm solar-air-006','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-001','Trạm water-sensor-001','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-002','Trạm water-sensor-002','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-003','Trạm water-sensor-003','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-004','Trạm water-sensor-004','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-005','Trạm water-sensor-005','105.5720453','10.669585'),('TRC-001','TramChimMoritoring','TRC-water-sensor-006','Trạm water-sensor-006','105.5720453','10.669585');
/*!40000 ALTER TABLE `thongtintram` ENABLE KEYS */;
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
