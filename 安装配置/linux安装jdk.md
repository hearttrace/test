### 1、解压文件 

```bash
tar -zxvf  *.tar.gz
```



### 2、配置环境变量

```bash
vim /etc/profile
```

#### 2.1末尾添加如下内容

```bash
# set java environment
JAVA_HOME=/root/develop/jdk1.8.0_321
CLASSPATH=.:$JAVA_HOME/lib.tools.jar
PATH=$JAVA_HOME/bin:$PATH
export JAVA_HOME CLASSPATH PATH
```

#### 2.2 保存退出后执行以下命令生效配置

```bash
source /etc/profile
```



### 3、检查环境变量是否成功配置

```bash
java -version
```

如下表示JDK安装成功

```ba
java version "1.8.0_321"
Java(TM) SE Runtime Environment (build 1.8.0_321-b07)
Java HotSpot(TM) 64-Bit Server VM (build 25.321-b07, mixed mode)
```



