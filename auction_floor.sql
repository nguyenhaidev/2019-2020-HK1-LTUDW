-- MySQL dump 10.13  Distrib 5.7.28, for Linux (x86_64)
--
-- Host: localhost    Database: auction_floor
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `af_account`
--

DROP TABLE IF EXISTS `af_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_account` (
  `account_id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL,
  `uname` varchar(20) NOT NULL,
  `passwd` char(60) NOT NULL,
  `fullname` varchar(60) CHARACTER SET utf8 NOT NULL,
  `address` varchar(100) CHARACTER SET utf8 NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 NOT NULL,
  `upvote` int(11) NOT NULL,
  `downvote` int(11) NOT NULL,
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `uname` (`uname`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `af_account_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `af_role` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_account`
--

LOCK TABLES `af_account` WRITE;
/*!40000 ALTER TABLE `af_account` DISABLE KEYS */;
INSERT INTO `af_account` VALUES (1,3,'admin','$2a$10$kPSH9vyHlHyc5PfWG1ZnvO7WRAu30vbVm8.AeGwNLkLMGfmWva8s.','Administrator','Vô gia cư','admin@localhost',0,0);
/*!40000 ALTER TABLE `af_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_category`
--

DROP TABLE IF EXISTS `af_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_category` (
  `category_id` int(11) NOT NULL,
  `category_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_category`
--

LOCK TABLES `af_category` WRITE;
/*!40000 ALTER TABLE `af_category` DISABLE KEYS */;
INSERT INTO `af_category` VALUES (1,'Điện tử'),(2,'Đồ cổ'),(3,'Trang sức');
/*!40000 ALTER TABLE `af_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_history`
--

DROP TABLE IF EXISTS `af_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `creation_date` datetime NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `account_id` (`account_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `af_history_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `af_account` (`account_id`),
  CONSTRAINT `af_history_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `af_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_history`
--

LOCK TABLES `af_history` WRITE;
/*!40000 ALTER TABLE `af_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `af_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_image`
--

DROP TABLE IF EXISTS `af_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_image` (
  `image_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_path` varchar(256) NOT NULL,
  `image_alt` varchar(256) CHARACTER SET utf8 NOT NULL,
  `image_caption` varchar(256) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_image`
--

LOCK TABLES `af_image` WRITE;
/*!40000 ALTER TABLE `af_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `af_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_product`
--

DROP TABLE IF EXISTS `af_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `description` text CHARACTER SET utf8 NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `highest_bidder` int(11) DEFAULT NULL,
  `highest_price` decimal(10,0) NOT NULL,
  `purchase_price` decimal(10,0) NOT NULL,
  `won_bidder` int(11) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `owner_id` (`owner_id`),
  KEY `highest_bidder` (`highest_bidder`),
  CONSTRAINT `af_product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `af_category` (`category_id`),
  CONSTRAINT `af_product_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `af_account` (`account_id`),
  CONSTRAINT `af_product_ibfk_3` FOREIGN KEY (`highest_bidder`) REFERENCES `af_account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_product`
--

LOCK TABLES `af_product` WRITE;
/*!40000 ALTER TABLE `af_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `af_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_role`
--

DROP TABLE IF EXISTS `af_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_role` (
  `role_id` int(11) NOT NULL,
  `role_title` varchar(50) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_role`
--

LOCK TABLES `af_role` WRITE;
/*!40000 ALTER TABLE `af_role` DISABLE KEYS */;
INSERT INTO `af_role` VALUES (1,'Bidder'),(2,'Seller'),(3,'Administrator');
/*!40000 ALTER TABLE `af_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_seller_request`
--

DROP TABLE IF EXISTS `af_seller_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_seller_request` (
  `request_id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) NOT NULL,
  `request_date` datetime NOT NULL,
  `finish_flag` bit(1) NOT NULL,
  PRIMARY KEY (`request_id`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `af_seller_request_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `af_account` (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_seller_request`
--

LOCK TABLES `af_seller_request` WRITE;
/*!40000 ALTER TABLE `af_seller_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `af_seller_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `af_watchlist`
--

DROP TABLE IF EXISTS `af_watchlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `af_watchlist` (
  `account_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`account_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `af_watchlist_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `af_account` (`account_id`),
  CONSTRAINT `af_watchlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `af_product` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `af_watchlist`
--

LOCK TABLES `af_watchlist` WRITE;
/*!40000 ALTER TABLE `af_watchlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `af_watchlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-24 22:51:39
