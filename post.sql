/*
 Navicat MySQL Data Transfer

 Source Server         : lyw
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost
 Source Database       : post

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : utf-8

 Date: 04/04/2018 16:35:05 PM
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `background`
-- ----------------------------
DROP TABLE IF EXISTS `background`;
CREATE TABLE `background` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `bg_url` varchar(256) NOT NULL,
  `bg_desc` varchar(256) NOT NULL,
  `bg_type` varchar(32) NOT NULL,
  `bg_show` tinyint(4) NOT NULL,
  `add_time` varchar(16) NOT NULL,
  `bg_link` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `focus`
-- ----------------------------
DROP TABLE IF EXISTS `focus`;
CREATE TABLE `focus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `theme_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `new_message`
-- ----------------------------
DROP TABLE IF EXISTS `new_message`;
CREATE TABLE `new_message` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(16) NOT NULL,
  `post_id` int(11) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `sub_reply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `post`
-- ----------------------------
DROP TABLE IF EXISTS `post`;
CREATE TABLE `post` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `content` text,
  `add_time` varchar(16) NOT NULL,
  `user_id` int(11) NOT NULL,
  `theme_id` int(11) NOT NULL,
  `images` text,
  `reply_count` int(11) NOT NULL,
  `building_count` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=63 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `reply`
-- ----------------------------
DROP TABLE IF EXISTS `reply`;
CREATE TABLE `reply` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `add_time` varchar(16) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `images` text,
  `sub_reply_count` int(5) NOT NULL,
  `building_num` int(5) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=86 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sign`
-- ----------------------------
DROP TABLE IF EXISTS `sign`;
CREATE TABLE `sign` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `theme_id` int(16) NOT NULL,
  `user_id` int(16) NOT NULL,
  `sign_time` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `sub_reply`
-- ----------------------------
DROP TABLE IF EXISTS `sub_reply`;
CREATE TABLE `sub_reply` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) NOT NULL,
  `add_time` varchar(16) NOT NULL,
  `reply_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `theme`
-- ----------------------------
DROP TABLE IF EXISTS `theme`;
CREATE TABLE `theme` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `head_thumb` varchar(256) NOT NULL,
  `creator_id` int(16) NOT NULL,
  `administrator` varchar(256) DEFAULT NULL,
  `add_time` varchar(32) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `head_thumb` varchar(256) NOT NULL,
  `nickname` varchar(32) NOT NULL,
  `gender` varchar(16) NOT NULL,
  `add_time` varchar(16) NOT NULL,
  `background` varchar(256) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=115 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
