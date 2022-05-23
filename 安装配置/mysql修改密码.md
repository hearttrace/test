1、修改mysql配置文件，添加跳过密码验证

```bash
vim /etc/my.cnf

[mysqld]

#skip password  [mysqld] 配置中添加如下命令，保存退出
skip-grant-tables

```

2、重启mysql服务  

```bash
service mysql restart  # 或使用其他方式
```

3、登录mysql，重置账号密码

```bash
mysql -u root # 直接回车，不用输密码就可以登入mysql，此时为跳过密码模式，在此模式下部分命令不能执行

USE `mysql`;

# 重置密码为空字符串
UPDATE `user` SET authentication_string = '' WHERE `user`='root';

# 查看设置是否生效
SELECT `host`,`user`,`authentication_string` FROM `user`;

```

4、修改mysql配置文件，关闭跳过密码验证

```bash
vim /etc/my.cnf

[mysqld]

#skip password  [mysqld] 注释如下命令，保存退出
#skip-grant-tables

```

5、重启mysql服务

```bash
service mysql restart  # 或使用其他方式
```

6、登录mysql

```bash
mysql -u root -p # 直接回车，修改后密码为空, 不用输密码就可以登入mysql 

# 执行下方命令修改密码
ALTER USER 'root'@'localhost' IDENTIFIED BY '新密码'; # 该命令在跳过密码登录时不能执行

```

7、`mysql -u root -p` (输入新密码，再次登录)