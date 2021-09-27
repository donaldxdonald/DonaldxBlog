## Docker架构

---

Docker 包括三个基本概念:

- **镜像（Image）**：Docker 镜像（Image），就相当于是一个 root 文件系统。比如官方镜像 ubuntu:16.04 就包含了完整的一套 Ubuntu16.04 最小系统的 root 文件系统。
- **容器（Container）**：镜像（Image）和容器（Container）的关系，就像是面向对象程序设计中的类和实例一样，镜像是静态的定义，容器是镜像运行时的实体。容器可以被创建、启动、停止、删除、暂停等。
- **仓库（Repository）**：仓库可看成一个代码控制中心，用来保存镜像。

Docker 使用客户端-服务器 (C/S) 架构模式，使用远程API来管理和创建Docker容器。

Docker 容器通过 Docker 镜像来创建。

容器与镜像的关系类似于面向对象编程中的对象与类。

![img](https://www.runoob.com/wp-content/uploads/2016/04/576507-docker1.png)

| 概念                   | 说明                                                         |
| :--------------------- | :----------------------------------------------------------- |
| Docker 镜像(Images)    | Docker 镜像是用于创建 Docker 容器的模板，比如 Ubuntu 系统。  |
| Docker 容器(Container) | 容器是独立运行的一个或一组应用，是镜像运行时的实体。         |
| Docker 客户端(Client)  | Docker 客户端通过命令行或者其他工具使用 Docker SDK (https://docs.docker.com/develop/sdk/) 与 Docker 的守护进程通信。 |
| Docker 主机(Host)      | 一个物理或者虚拟的机器用于执行 Docker 守护进程和容器。       |
| Docker Registry        | Docker 仓库用来保存镜像，可以理解为代码控制中的代码仓库。Docker Hub([https://hub.docker.com](https://hub.docker.com/)) 提供了庞大的镜像集合供使用。一个 Docker Registry 中可以包含多个仓库（Repository）；每个仓库可以包含多个标签（Tag）；每个标签对应一个镜像。通常，一个仓库会包含同一个软件不同版本的镜像，而标签就常用于对应该软件的各个版本。我们可以通过 **<仓库名>:<标签>** 的格式来指定具体是这个软件哪个版本的镜像。如果不给出标签，将以 **latest** 作为默认标签。 |
| Docker Machine         | Docker Machine是一个简化Docker安装的命令行工具，通过一个简单的命令行即可在相应的平台上安装Docker，比如VirtualBox、 Digital Ocean、Microsoft Azure。 |



## Docker命令

---

### 镜像相关

- 查看镜像

  ```
  docker images
  docker images -q #查看镜像的id
  ```

- 搜索镜像

  ``` 
  docker search [镜像名称]
  ```

- 拉取镜像

  ```
  docker pull [镜像名称]
  ```

- 删除镜像

  ``` 
  docker rmi 镜像id #删除指定本地镜像
  docker rmi `docker images -q` #删除所有本地镜像
  ```

  

### 容器相关

- 查看容器

  ```
  docker ps #查看正在运行的容器
  docker ps -a #查看所有容器
  ```

  OPTIONS说明：

  - **-a :**显示所有的容器，包括未运行的。

  - **-f :**根据条件过滤显示的内容。

    

  - **--format :**指定返回值的模板文件。

  - **-l :**显示最近创建的容器。

  - **-n :**列出最近创建的n个容器。

  - **--no-trunc :**不截断输出。

  - **-q :**静默模式，只显示容器编号。

  - **-s :**显示总的文件大小。

    

- 创建并启动容器

  ```
  docker run [参数]
  ```

  OPTIONS说明：

  - **-a stdin:** 指定标准输入输出内容类型，可选 STDIN/STDOUT/STDERR 三项；

  - **-d:** 后台运行容器，并返回容器ID；

  - **-i:** 以交互模式运行容器，通常与 -t 同时使用；

  - **-P:** 随机端口映射，容器内部端口**随机**映射到主机的端口

  - **-p:** 指定端口映射，格式为：**主机(宿主)端口:容器端口**

  - **-t:** 为容器重新分配一个伪输入终端，通常与 -i 同时使用；

  - **--name="nginx-lb":** 为容器指定一个名称；

  - **--dns 8.8.8.8:** 指定容器使用的DNS服务器，默认和宿主一致；

  - **--dns-search example.com:** 指定容器DNS搜索域名，默认和宿主一致；

  - **-h "mars":** 指定容器的hostname；

  - **-e username="ritchie":** 设置环境变量；

  - **--env-file=[ ]:** 从指定文件读入环境变量；

  - **--cpuset="0-2" or --cpuset="0,1,2":** 绑定容器到指定CPU运行；

  - **-m :**设置容器使用内存最大值；

  - **--net="bridge":** 指定容器的网络连接类型，支持 bridge/host/none/container: 四种类型；

  - **--link=[ ]:** 添加链接到另一个容器；

  - **--expose=[ ]:** 开放一个端口或一组端口；

  - **--volume , -v:** 绑定一个卷

    

- 进入容器

  ```
  docker exec [参数]
  ```

- 停止/启动/删除容器

  ```
  docker stop [容器名称]
  docker start [容器名称]
  docker rm [容器名称]
  ```

- 查看容器信息

  ```
  docker inspect [容器名称]
  ```

  

## 数据卷

---

类似OTG

![image-20200721113000052](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200721113000052.png)



### 配置数据卷

- 创建启动容器时，是用-v参数 设置数据卷

  ```
  docker run ... -v [宿主机目录(文件)]:[容器内目录(文件)] ...
  ```

- 注意事项：

  1. 目录必须是绝对路径
  2. 如果目录不存在，会自动创建
  3. 可以挂在多个数据卷