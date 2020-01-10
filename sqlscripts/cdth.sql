-- MariaDB dump 10.17  Distrib 10.4.11-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: cdth
-- ------------------------------------------------------
-- Server version	10.4.11-MariaDB
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
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
) ENGINE = InnoDB AUTO_INCREMENT = 11 DEFAULT CHARSET = latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `af_account`
--
LOCK TABLES `af_account` WRITE;
/*!40000 ALTER TABLE `af_account` DISABLE KEYS */;
INSERT INTO `af_account`
VALUES
  (
    1,
    3,
    'admin',
    '$2a$10$kPSH9vyHlHyc5PfWG1ZnvO7WRAu30vbVm8.AeGwNLkLMGfmWva8s.',
    'Administrator',
    'Vô gia cư',
    'admin@localhost',
    1,
    0
  ),(
    2,
    1,
    'bidder',
    '',
    'Thai Chi Cuong',
    '123 Phung Hung',
    'thai.cuong@gmail.com',
    0,
    0
  ),(
    3,
    1,
    'bidder2',
    '1',
    'Thai Chi Cuong',
    '123 Phung Hung',
    'thai.cuong@gmail.com',
    0,
    0
  ),(
    4,
    1,
    'haiduoi',
    'haiduoi',
    '123',
    'Vo gia cu',
    'khong oc email',
    0,
    0
  ),(
    5,
    1,
    'cdth',
    '$2a$10$q9Nq/LSMsSbMMRc7X38ZQOA3/xk4G8GN7tGgo232sxUf4./wyVNnm',
    'CDTH Online Auction Floor',
    '228 Phùng Hừng, Phường 14, Quận 5',
    'thai.cuong1404@gmail.com',
    0,
    0
  ),(
    6,
    1,
    'hmchi',
    '$2a$10$SY4YIIDC9V9AiNkg6.2hVuSqK2Aq8klD81BbLnFJySIzqdCH74zpu',
    'Huynh Minh Chi',
    '228 Phùng Hừng, Phường 14, Quận 5',
    'thai.cuong1404@gmail.com',
    0,
    0
  ),(
    7,
    1,
    '',
    '$2a$10$dcB6QWkq44rZXjTd1KWZfudlTMKLsjfxY6rfW2I.CUtW87e2ljYE.',
    '',
    '',
    '',
    0,
    0
  ),(
    8,
    1,
    '1753044',
    '$2a$10$Ija9xt6EoIGyMwXM0pbATu.0kflQPCLX7HnXd4/zfwA/L0Z80j5CC',
    'Dinh 123',
    '489A/21/64 Huynh Van Banh',
    'dinhletrieuduong@gmail.com',
    0,
    0
  ),(
    9,
    1,
    'Bluee05',
    '$2a$10$H8sgI39RjjxqwjDUBX32NurTJ3QzTFONxjpePqJUE4VtZQVTtVyke',
    'Dinh 123',
    '489A/21/64 Huynh Van Banh',
    'dinhletrieuduong@gmail.com',
    0,
    0
  ),(
    10,
    1,
    'dinhletrieuduong',
    '$2a$10$WhIFoEznxIybC0o/CJi.o.rfMU4PlOblRMYrw0mT3TR.vcHUeaSre',
    'Dinh 123',
    '489A/21/64 Huynh Van Banh',
    '123@123.com',
    0,
    0
  );
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
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `af_category`
  --
  LOCK TABLES `af_category` WRITE;
  /*!40000 ALTER TABLE `af_category` DISABLE KEYS */;
INSERT INTO `af_category`
VALUES
  (1, 'Điện tử'),(2, 'Đồ cổ'),(3, 'Trang sức');
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
    `price` decimal(10, 0) NOT NULL,
    `creation_date` datetime NOT NULL,
    PRIMARY KEY (`history_id`),
    KEY `account_id` (`account_id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `af_history_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `af_account` (`account_id`),
    CONSTRAINT `af_history_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `af_product` (`product_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 16 DEFAULT CHARSET = latin1;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `af_history`
  --
  LOCK TABLES `af_history` WRITE;
  /*!40000 ALTER TABLE `af_history` DISABLE KEYS */;
INSERT INTO `af_history`
VALUES
  (1, 1, 1, 10001000, '2020-01-04 15:51:29'),(2, 1, 1, 10002000, '2020-01-05 04:24:26'),(3, 1, 1, 10000000, '2020-01-05 04:24:26'),(4, 1, 1, 10001000, '2020-01-05 04:40:41'),(5, 1, 1, 1000, '2020-01-05 04:41:15'),(6, 1, 1, 10000000, '2020-01-05 04:41:48'),(7, 1, 1, 10001000, '2020-01-05 07:06:13'),(8, 1, 1, 10002000, '2020-01-05 07:07:22'),(9, 1, 1, 10003000, '2020-01-05 07:07:47'),(10, 1, 1, 10004000, '2020-01-05 07:54:15'),(11, 1, 1, 10005000, '2020-01-05 11:23:01'),(12, 1, 3, 15000000, '2020-01-05 11:23:36'),(13, 1, 2, 15000000, '2020-01-05 11:24:04'),(14, 1, 4, 2000, '2020-01-05 11:25:49'),(15, 1, 4, 3000, '2020-01-05 11:25:53');
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
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
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
    `product_name` varchar(200) CHARACTER SET latin1 NOT NULL,
    `description` text CHARACTER SET utf8 NOT NULL,
    `start_date` datetime NOT NULL,
    `end_date` datetime NOT NULL,
    `highest_bidder` int(11) DEFAULT NULL,
    `highest_price` decimal(10, 0) NOT NULL,
    `purchase_price` decimal(10, 0) NOT NULL,
    `won_bidder` int(11) DEFAULT NULL,
    `tiny_desc` tinytext CHARACTER SET utf8 NOT NULL,
    PRIMARY KEY (`product_id`),
    KEY `category_id` (`category_id`),
    KEY `owner_id` (`owner_id`),
    KEY `highest_bidder` (`highest_bidder`),
    CONSTRAINT `af_product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `af_category` (`category_id`),
    CONSTRAINT `af_product_ibfk_2` FOREIGN KEY (`owner_id`) REFERENCES `af_account` (`account_id`),
    CONSTRAINT `af_product_ibfk_3` FOREIGN KEY (`highest_bidder`) REFERENCES `af_account` (`account_id`)
  ) ENGINE = InnoDB AUTO_INCREMENT = 7 DEFAULT CHARSET = utf8mb4;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `af_product`
  --
  LOCK TABLES `af_product` WRITE;
  /*!40000 ALTER TABLE `af_product` DISABLE KEYS */;
INSERT INTO `af_product`
VALUES
  (
    1,
    1,
    1,
    'PS4 - Hàng Chính Hãng',
    '',
    '2019-12-25 16:39:06',
    '2019-12-25 16:39:06',
    1,
    10005000,
    10000000,
    1,
    'aaaaabbbbccccdddd aaaaabbbbccccdddd aaaaabbbbccccdddd aaaaabbbbccccdddd aaaaabbbbccccdddd'
  ),(
    2,
    1,
    1,
    'Guoc Gucci - Hàng Chính Hãng',
    'Guốc rất phù hợp cho cánh đàn ông, đặc biệt là những thành phần bám vấy như Nguyễn Phúc Đăng',
    '2020-01-05 08:29:26',
    '2020-01-05 08:29:26',
    1,
    15000000,
    15000000,
    1,
    'Đây là đôi guốc độc nhất của Gucci mới ra'
  ),(
    3,
    1,
    1,
    'Giay Nike - Hang Chinh Hang',
    'Giầy rất phù hợp cho cánh đàn ông, đặc biệt là những thành phần bám vấy như Nguyễn Phúc Đăng',
    '2020-01-05 09:08:22',
    '2020-01-05 09:08:22',
    1,
    15000000,
    15000000,
    1,
    'Đây là đôi guốc độc nhất của Nike mới ra'
  ),(
    4,
    1,
    1,
    'Giay Nike 2 - Hang Chinh Hang',
    'Giầy rất phù hợp cho cánh đàn ông, đặc biệt là những thành phần bám vấy như Nguyễn Phúc Đăng',
    '2020-01-05 09:08:35',
    '2020-01-05 09:08:35',
    1,
    3000,
    15000000,
    NULL,
    'Đây là đôi guốc độc nhất của Nike mới ra'
  ),(
    5,
    1,
    1,
    'Giay adidas - Hang Chinh Hang',
    'Giầy rất phù hợp cho cánh đàn ông, đặc biệt là những thành phần bám vấy như Nguyễn Phúc Đăng',
    '2020-01-05 11:54:38',
    '2020-01-05 11:54:38',
    NULL,
    1000,
    15000000,
    NULL,
    'Đây là đôi guốc độc nhất của Nike mới ra'
  ),(
    6,
    1,
    1,
    'Nguyen Phuc Dang - Hang Chinh Hang',
    'Giầy rất phù hợp cho cánh đàn ông, đặc biệt là những thành phần bám vấy như Nguyễn Phúc Đăng',
    '2020-01-05 11:55:10',
    '2020-01-05 11:55:10',
    NULL,
    1000,
    15000000,
    NULL,
    'Đây là đôi guốc độc nhất của Nike mới ra'
  );
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
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `af_role`
  --
  LOCK TABLES `af_role` WRITE;
  /*!40000 ALTER TABLE `af_role` DISABLE KEYS */;
INSERT INTO `af_role`
VALUES
  (1, 'Bidder'),(2, 'Seller'),(3, 'Administrator');
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
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
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
    PRIMARY KEY (`account_id`, `product_id`),
    KEY `product_id` (`product_id`),
    CONSTRAINT `af_watchlist_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `af_account` (`account_id`),
    CONSTRAINT `af_watchlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `af_product` (`product_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `af_watchlist`
  --
  LOCK TABLES `af_watchlist` WRITE;
  /*!40000 ALTER TABLE `af_watchlist` DISABLE KEYS */;
INSERT INTO `af_watchlist`
VALUES
  (1, 1);
  /*!40000 ALTER TABLE `af_watchlist` ENABLE KEYS */;
UNLOCK TABLES;
--
  -- Table structure for table `sessions`
  --
  DROP TABLE IF EXISTS `sessions`;
  /*!40101 SET @saved_cs_client     = @@character_set_client */;
  /*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
    `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
    `expires` int(11) unsigned NOT NULL,
    `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    PRIMARY KEY (`session_id`)
  ) ENGINE = InnoDB DEFAULT CHARSET = latin1;
  /*!40101 SET character_set_client = @saved_cs_client */;
--
  -- Dumping data for table `sessions`
  --
  LOCK TABLES `sessions` WRITE;
  /*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions`
VALUES
  (
    '-LFGDQxvw6Sdhv9ZusA9G5bKzHx2aWVK',
    1578488410,
    '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'
  ),(
    '74WQDpv5PGu4rj4CuUAw6oPs9BwtLQLL',
    1578487858,
    '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}'
  );
  /*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;
  /*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
  /*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
  /*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
  /*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
  /*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
  /*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
  /*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
  /*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
-- Dump completed on 2020-01-07 21:55:55
ALTER TABLE af_product
ADD FULLTEXT(product_name);

CREATE TABLE af_ban (
    product_id INT REFERENCES af_product(product_id),
    account_id INT REFERENCES af_account(account_id),
    banned_date DATETIME NOT NULL,
    is_banned BIT NOT NULL,
    PRIMARY KEY(product_id, account_id)
);

CREATE TABLE af_vote (
    owner_id INT REFERENCES af_account(account_id),
    account_id INT REFERENCES af_account(account_id),
    vote_point SMALLINT NOT NULL
);