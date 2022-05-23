### 一、下载稳定版文件解压

```bash
tar -zxvf mongodb-linux-x86_64-rhel70-4.0.27.tgz

# 移动到指定路径并重命名
mv mongodb-linux-x86_64-rhel70-4.0.27/ /usr/local/mongodb
```



### 二、配置环境变量

在 **/etc/profile** 中加入下面一行：

```bash 
export PATH=/usr/local/mongodb/bin:$PATH
```

然后 **source /etc/profile** 使之生效



### 三、创建相关目录

```bash 
mkdir -p /usr/local/mongodb/db  # 数据库目录
mkdir -p /usr/local/mongodb/log  # 日志目录
mkdir -p /usr/local/mongodb/conf  # 配置目录
```



### 四、创建配置文件

```bash
vim /usr/local/mongodb/conf/mongodb.conf

port= 27017
dbpath=/usr/local/mongodb/db  # 指定数据库路径
logpath=/usr/local/mongodb/log/mongodb.log # 指定日志文件路径
logappend=true  # 使用追加方式写日志
fork=true  # 以守护进程的方式运行
maxConns=100  # 最大同时连接数
auth=true  # 启用验证
journal=true  # 每次写入会记录一条操作日志
storageEngine=wiredTiger # 存储引擎
bind_ip=0.0.0.0 # 服务绑定地址

```



### 五、配置开机启动

```bash
vim /etc/init.d/mongodb
```

写入如下内容保存退出

```bash
#!/bin/sh
#
#chkconfig: 2345 80 90
#description: mongodb
start() {
 /usr/local/mongodb/bin/mongod --config /usr/local/mongodb/conf/mongodb.conf
}
 
stop() {
  /usr/local/mongodb/bin/mongod --config /usr/local/mongodb/conf/mongodb.conf --shutdown
}
 
case "$1" in
  start)
 start
 ;;
  stop)
 stop
 ;;
  restart)
 stop
 start
 ;;
  *)
 echo $"Usage: $0 {start|stop|restart}"
 exit 1
esac

```

```bash
cd /etc/init.d/

chkconfig --add mongodb
chmod +x  mongodb
chkconfig mongodb on
```

相关命令

```bash
service mongodb start # 启动mongodb：

service mongodb stop # 停止mongodb：

service mongodb restart # 重启mongodb

```



### 六、创建授权用户

启动mongodb，使用mongo命令连接客户端

```bash
#设置用户名、密码与数据库连接,通过向表admin中添加用户来设置
use admin  
db.createUser({
  user: 'root',
  pwd: '12345678',
  roles:[{
    role: 'root',
    db: 'admin'
  }]
})
```



### 七、登录数据库

```bash
mongo admin -uroot -p12345678
```

