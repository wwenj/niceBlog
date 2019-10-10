/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost:3306
 Source Schema         : niceBlog

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : 65001

 Date: 29/09/2019 16:53:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for blog_article
-- ----------------------------
DROP TABLE IF EXISTS `blog_article`;
CREATE TABLE `blog_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '文章唯一标识id',
  `user_id` int(11) NOT NULL COMMENT '所属作者',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章title',
  `content` longtext,
  `stars` int(11) DEFAULT '0' COMMENT '点赞',
  `reads` int(11) DEFAULT '0' COMMENT '阅读人数',
  `date_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '最后一次修改时间',
  `class` int(11) DEFAULT NULL COMMENT '文章分类',
  `tab` varchar(255) DEFAULT NULL COMMENT '文章标签',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_article
-- ----------------------------
BEGIN;
INSERT INTO `blog_article` VALUES (1, 1, 'JavaScript详解', '## 需求 ##\n![1212](https://user-gold-cdn.xitu.io/2018/12/7/1678792925377405?w=1448&h=857&f=png&s=113369)\n- 为了防止截图等安全问题，在web项目页面中生成一个平铺全屏的水印\n- 要求水印内容为用户名，水印节点用户不能通过开发者工具等删除\n## 效果 ##\n- 如上图\n- 在`body`节点下插入水印DOM节点，水印节点覆盖在页面最上层但不影响页面正常操作\n- 在通过js或者用户通过开发者工具删除或修改水印节点时自动复原\n## 原理 ##\n- 通过`canvas`画出节点需生成水印的文字生成`base64`图片\n- 生成该水印背景图的div节点插入到body下，通过js`MutationObserver`方法监听节点变化，再自动重新生成\n\n**生成水印DOM节点** \n```\n// 生成水印DOM节点    \ninit () {\n      let canvas = document.createElement(\'canvas\')\n      canvas.id = \'canvas\'\n      canvas.width = \'200\' // 单个水印的宽高\n      canvas.height = \'130\'\n      this.maskDiv = document.createElement(\'div\')\n      let ctx = canvas.getContext(\'2d\')\n      ctx.font = \'normal 18px Microsoft Yahei\' // 设置样式\n      ctx.fillStyle = \'rgba(112, 113, 114, 0.1)\' // 水印字体颜色\n      ctx.rotate(30 * Math.PI / 180) // 水印偏转角度\n      ctx.fillText(this.inputText, 30, 20)\n      let src = canvas.toDataURL(\'image/png\')\n      this.maskDiv.style.position = \'fixed\'\n      this.maskDiv.style.zIndex = \'9999\'\n      this.maskDiv.id = \'_waterMark\'\n      this.maskDiv.style.top = \'30px\'\n      this.maskDiv.style.left = \'0\'\n      this.maskDiv.style.height = \'100%\'\n      this.maskDiv.style.width = \'100%\'\n      this.maskDiv.style.pointerEvents = \'none\'\n      this.maskDiv.style.backgroundImage = \'URL(\' + src + \')\'\n      // 水印节点插到body下\n      document.body.appendChild(this.maskDiv)\n    },\n```\n**监听DOM更改**\n```\n// 监听更改，更改后执行callback回调函数，会得到一个相关信息的参数对象\n    Monitor () {\n      let body = document.getElementsByTagName(\'body\')[0]\n      let options = {\n        childList: true,\n        attributes: true,\n        characterData: true,\n        subtree: true,\n        attributeOldValue: true,\n        characterDataOldValue: true\n      }\n      let observer = new MutationObserver(this.callback)\n      observer.observe(body, options) // 监听body节点\n    },\n```\n## 使用 ##\n- 直接引入项目任何组件中使用即可\n\n- 组件prop接收三个参数\n```\n  props: {\n    // 显示的水印文本\n    inputText: {\n      type: String,\n      default: \'waterMark水印\'\n    },\n    // 是否允许通过js或开发者工具等途径修改水印DOM节点（水印的id，attribute属性，节点的删除）\n    // true为允许，默认不允许\n    inputAllowDele: {\n      type: Boolean,\n      default: false\n    },\n    // 是否在组件销毁时去除水印节点（前提是允许用户修改DOM，否则去除后会再次自动生成）\n    // true会，默认不会\n    inputDestroy: {\n      type: Boolean,\n      default: false\n    }\n  }\n```\n\n- **inputText**（String）：需要生成的水印文本，默认为`\'waterMark水印\'`\n\n- **inputAllowDele**（Boolean）：是否需要允许用户删除水印DOM节点，true为允许，默认不允许\n\n- **inputDestroy**（Boolean）：是否在组件销毁时去除水印节点，true会，默认不会，（只有在inputAllowDele为ftrue时才能生效）\n\n- 如果需要修改水印大小，文字，颜色等样式，可直接进入组件中按注释修改\n\n## 小结 ##\n\n- 工作写了个相关组件，复用率挺高就封装了下，没有经过严格测试，可当做参考使用,有需要的朋友欢迎下载源码使用[相关GitHub代码][2]  \n- 当然在浏览器端无论怎样也不能完全防止用户的的行为，但也能满足多数需求场景\n', 0, 0, '2019-09-29 16:49:30', 1, '1');
INSERT INTO `blog_article` VALUES (2, 1, '标题标题标题标题标题标题标题标题', '博客内容', 0, 0, '2019-09-29 16:50:46', 2, '1,2');
COMMIT;

-- ----------------------------
-- Table structure for blog_class
-- ----------------------------
DROP TABLE IF EXISTS `blog_class`;
CREATE TABLE `blog_class` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `class` varchar(255) NOT NULL COMMENT '文章分类，每文章必选其一',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_class
-- ----------------------------
BEGIN;
INSERT INTO `blog_class` VALUES (1, 'JavaScript');
INSERT INTO `blog_class` VALUES (2, 'vue相关');
INSERT INTO `blog_class` VALUES (3, '前端技术');
INSERT INTO `blog_class` VALUES (4, 'NODE');
INSERT INTO `blog_class` VALUES (5, '随笔');
COMMIT;

-- ----------------------------
-- Table structure for blog_comment
-- ----------------------------
DROP TABLE IF EXISTS `blog_comment`;
CREATE TABLE `blog_comment` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL COMMENT '用户id',
  `content` varchar(255) DEFAULT NULL COMMENT '评论内容',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_comment
-- ----------------------------
BEGIN;
INSERT INTO `blog_comment` VALUES (1, 1, '评论11212121', '2019-09-24 17:45:44');
COMMIT;

-- ----------------------------
-- Table structure for blog_tab
-- ----------------------------
DROP TABLE IF EXISTS `blog_tab`;
CREATE TABLE `blog_tab` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `tab` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '文章标签，每篇文章可多选，最少选1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of blog_tab
-- ----------------------------
BEGIN;
INSERT INTO `blog_tab` VALUES (1, 'js');
INSERT INTO `blog_tab` VALUES (2, 'css');
INSERT INTO `blog_tab` VALUES (3, 'html');
INSERT INTO `blog_tab` VALUES (4, 'vue');
INSERT INTO `blog_tab` VALUES (5, 'node');
INSERT INTO `blog_tab` VALUES (6, 'react');
INSERT INTO `blog_tab` VALUES (7, 'flutter');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识id',
  `password` char(10) NOT NULL COMMENT '密码',
  `username` char(255) NOT NULL COMMENT '账号',
  `name` char(255) NOT NULL COMMENT '用户名',
  `head_img` char(255) DEFAULT NULL,
  `declaration` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '个性签名',
  `class` int(10) NOT NULL COMMENT '文章分类',
  `tab` varchar(255) NOT NULL COMMENT '文章标签',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, '12345', '15330734121', '王文健', NULL, '我是吴彦祖', 0, '');
INSERT INTO `user` VALUES (2, '12345', '15330734121', '吴彦祖', NULL, NULL, 0, '');
INSERT INTO `user` VALUES (3, '44444', '123', 'yyy', NULL, NULL, 0, '');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
