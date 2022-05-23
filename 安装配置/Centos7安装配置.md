###  一、安装基本工具

```bash
# 安装wget
yum install wget

# 替换镜像源
wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo

# 安装ifconfig
yum install net-tools.x86_64 -y

```



### 二、防火墙管理（CentOS7+）

```bash
# 查询端口是否开放
firewall-cmd --query-port=8080/tcp

# 开放端口
firewall-cmd --permanent --add-port=8080/tcp

# 关闭端口
firewall-cmd --permanent --remove-port=8080/tcp

# 刷新防火墙规则
firewall-cmd --reload


```

#### 防火墙其它管理操作命令

| 命令                       | 命令功能                   |
| -------------------------- | -------------------------- |
| 启动 firewalld.service服务 | service firewalld start    |
| 停止firewalld.service服务  | service firewalld stop     |
| 重启firewalld.service服务  | service firewalld restart  |
| 查看firewall的状态         | firewall-cmd --state       |
| 查看防火墙已有规则列表     | firewall-cmd --list-all    |
| 查看firewall服务状态       | systemctl status firewalld |



### 三、进程管理

```bash
# nohup 英文全称 no hang up（不挂起），用于在系统后台不挂断地运行命令，退出终端不会影响程序的运行。
# 语法格式: nohup Command [ Arg … ] [　& ]
# Command：要执行的命令。
# Arg：一些参数，可以指定输出文件。
# &：让命令在后台执行，终端退出后命令仍旧执行。
nohup /root/runoob.sh > runoob.log 2>&1 &
# 将标准错误 2 重定向到标准输出 &1 ，标准输出 &1 再被重定向输入到 runoob.log 文件中。
# 0 – stdin (standard input，标准输入)
# 1 – stdout (standard output，标准输出)
# 2 – stderr (standard error，标准错误输出)


```

