CREATE DATABASE IF NOT EXISTS `mydb`;
	
USE `mydb`;

CREATE TABLE IF NOT EXISTS `tb_user`(
	`id`  VARCHAR(36) PRIMARY KEY COMMENT '用户ID',
	`username` VARCHAR(20) UNIQUE	NOT NULL COMMENT '用户名',
	`password` VARCHAR(50) COMMENT '密码',
	`enabled` TINYINT DEFAULT 0 COMMENT '启用标志: 1 启用, 0 禁用'
)ENGINE=INNODB DEFAULT CHARSET = utf8 COMMENT '用户表';

CREATE TABLE IF NOT EXISTS `tb_user_role`(
	`uid` VARCHAR(36) COMMENT '用户ID',
	`rid` VARCHAR(36) COMMENT '角色ID',
	CONSTRAINT fk_ref_uid FOREIGN KEY(`uid`) REFERENCES `tb_user`(`id`),
	CONSTRAINT fk_ref_rid FOREIGN KEY(`rid`) REFERENCES `tb_role`(`id`)
)ENGINE=INNODB DEFAULT CHARSET = utf8 COMMENT '用户角色关系表';

CREATE TABLE IF NOT EXISTS `tb_account`(
	`id`  INT PRIMARY KEY AUTO_INCREMENT COMMENT 'ID',
	`username` VARCHAR(20) COMMENT '用户名',
	`money` DECIMAL COMMENT '账户余额',
	CONSTRAINT fk_ref_username FOREIGN KEY(`username`) REFERENCES `tb_user`(`username`)
)ENGINE=INNODB DEFAULT CHARSET = utf8 COMMENT '账户表';

CREATE TABLE IF NOT EXISTS `tb_order`(
	`id`  VARCHAR(36) PRIMARY KEY COMMENT '订单ID',
	`uid` VARCHAR(36) NOT NULL COMMENT '用户ID',
	`order_desc` VARCHAR(50) COMMENT '订单描述',
	`create_time` LONG COMMENT '订单创建时间'
)ENGINE=INNODB DEFAULT CHARSET = utf8 COMMENT '订单表';

ALTER TABLE `mydb`.`tb_order` 
ADD CONSTRAINT `fk_ref_userid` FOREIGN KEY (`uid`) REFERENCES `mydb`.`tb_user` (`id`);

CREATE TABLE IF NOT EXISTS `tb_account_log`(
	`id` INT AUTO_INCREMENT PRIMARY KEY COMMENT 'ID',
	`aid` INT NOT NULL COMMENT '账户ID',
	`time` LONG NOT NULL COMMENT '操作时间',
	`type` TINYINT(1) NOT NULL COMMENT '操作类型',
	`money` LONG NOT NULL COMMENT '变动金额',
	`create_uid` VARCHAR(20) NOT NULL COMMENT '创建用户ID',
	CONSTRAINT fk_alog_aid FOREIGN KEY(`aid`) REFERENCES `tb_account`(`id`),
	CONSTRAINT fk_alog_uid FOREIGN KEY(`create_uid`) REFERENCES `tb_user`(`id`)
)ENGINE=INNODB DEFAULT CHARSET = utf8 COMMENT '账户操作日志表';

