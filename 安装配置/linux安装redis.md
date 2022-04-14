### 一、解压redis到/usr/local/目录下

```bash
tar -zxvf redis-6.2.6.tar.gz
mv redis-6.2.6 /usr/local/redis
```



### 二、编译安装

```bash
make PREFIX=/usr/local/redis install
```



### 三、配置redis

使用 `vim` 命令打开 `redis.conf` 文件修改配置

* 修改 `daemonize`改为`yes` 开启守护线程（建议）：

* 修改配置允许外网访问  注释 `bind 127.0.0.1` 这一行 ：（可选）：

* 设置 `protected-mode` 为 `no`：
  `protected-mode`即保护模式，默认是开启状态，只允许本地客户端连接。这里将其改成no，就可以设置密码或添加bind来连接。

* 设置永久密码，需重启才能生效

```bash
requirepass password  # 连接Redis密码是：password
```



### 四、配置redis服务systemd

执行以下命令创建打开`redis.service`

```bash
vim /etc/systemd/system/redis.service
```

编辑如下内容后保存退出

```bash
[Unit]
Description=Redis
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/redis/bin/redis-server  /usr/local/redis/redis.conf 
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s QUIT $MAINPID
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

执行如下命令重载服务列表

```bash
systemctl daemon-reload 
```

相关命令

```bash
systemctl start redis # 启动redis

systemctl reload redis # 重启redis

systemctl stop redis # 停止redis

systemctl enable redis # 开机自启

systemctl status redis # 查看redis状态

ps -ef | grep redis # 查看redis进程

redis-cli -h -p -a 密码 # 登录redis
```

