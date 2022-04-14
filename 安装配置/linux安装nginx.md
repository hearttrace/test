### 一、下载稳定版文件解压

```bash
tar -zxvf *.tar.gz
```



### 二、安装必要组件

```bash 
yum -y install gcc pcre pcre-devel zlib zlib-devel openssl openssl-devel
```

解释：

* **gcc** 可以编译 C,C++,Ada,Object C和Java等语言

* **pcre pcre-devel** pcre是一个perl库，包括perl兼容的正则表达式库，nginx的http模块使用pcre来解析正则表达式，所以需要安装pcre库

* **zlib zlib-devel** zlib库提供了很多种压缩和解压缩方式nginx使用zlib对http包的内容进行gzip，所以需要安装

* **openssl openssl-devel** openssl是web安全通信的基石，没有openssl，可以说我们的信息都是在裸奔



### 三、编译与安装nginx

1、进入nginx文件夹：cd nginx-1.20.2

2、编译Nginx：

```bash 
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-http_v2_module --with-http_sub_module --with-http_gzip_static_module --with-pcre
```

解释：

* --prefix 指定安装路径

- --with-http_stub_status_module  允许查看nginx状态的模块
- --with-http_ssl_module   支持https的模块

3、编译和安装

```bash
make && make install
```



### 四、启动Nginx

　　1、进入nginx程序的安装目录：

　　　　命令1：cd /usr/local/nginx/sbin

　　　　命令2：./nginx

　　2、常用命令：

```bash
./nginx -s quit:   # （温和）此方式停止步骤是待nginx进程处理任务完毕进行停止。
./nginx -s stop:   # （强硬）此方式相当于先查出nginx进程id再使用kill命令强制杀掉进程。　　　　
./nginx -s reload  # 重启nginx(不推荐此方法，推荐先停止在启动)
```



### 五、配置Nginx开机启动

```bash
vim /lib/systemd/system/nginx.service　
```

写入如下内容保存退出

```bash
[Unit]
Description=nginx service

After=network.target

[Service]
Type=forking

ExecStart=/usr/local/nginx/sbin/nginx

ExecReload=/usr/local/nginx/sbin/nginx -s reload

ExecStop=/usr/local/nginx/sbin/nginx -s stop

PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

相关命令

```bash
systemctl enable nginx.service # 设置开机自动启动

systemctl disable nginx.service # 取消开机自动启动

systemctl start nginx.service　 # 启动nginx服务

systemctl stop nginx.service　 # 停止服务

systemctl restart nginx.service　 # 重新启动服务

systemctl list-units --type=service # 查看所有已启动的服务

systemctl status nginx.service # 查看服务当前状态
```

