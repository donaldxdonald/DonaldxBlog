---
title: 使用 Jenkins
date: 2020-12-18 17:30
---



## docker-compose.yml文件配置

```yaml
version: '3'
services:                                      # 集合
  docker_jenkins:
    user: root                                 # 为了避免一些权限问题 在这我使用了root
    restart: always                            # 重启方式
    image: jenkins/jenkins:lts                 # 指定服务所使用的镜像 在这里我选择了 LTS (长期支持)
    container_name: jenkins                    # 容器名称
    ports:                                     # 对外暴露的端口定义
      - 8080:8080
      - 50000:50000
    volumes:                                   # 卷挂载路径
      - /home/jenkins/jenkins_home/:/var/jenkins_home  # 这是我们一开始创建的目录挂载到容器内的jenkins_home目录
      - /var/run/docker.sock:/var/run/docker.sock
      - /usr/bin/docker:/usr/bin/docker                # 这是为了我们可以在容器内使用docker命令
      - /usr/local/bin/docker-compose:/usr/local/bin/docker-compose
  docker_nginx:
    restart: always
    image: nginx
    container_name: nginx
    ports:
      - 8090:80
      - 80:80
      - 433:433
    volumes:
      - /home/nginx/conf.d/:/etc/nginx/conf.d
      - /home/webserver/static/jenkins/dist/dist:/usr/share/nginx/html
```

## 配置Jenkins权限

```shell
chown -R root:root /home/jenkins/jenkins_home
```



## 进入Jenkins

想进入要先解锁，密码就在 `/var/jenkins_home/secrets/initialAdminPassword` 文件里，怎么查看呢？两种方案：

1. 首先要进入刚刚启动的jenkins容器里面，执行 `$ docker exec -it jenkins bash`，然后 `$ cat /var/jenkins_home/secrets/initialAdminPassword`。
2. 由于运行容器时，已经将Jenkins目录挂载到了宿主机，所以可以不用进入容器，直接在宿主机执行 `$ sudo cat /var/jenkins_home/secrets/initialAdminPassword`。

## 安装Jenkins插件

进入页面之后，选择推荐安装。![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a565ae8d1ece41839dc15b73172e30ee~tplv-k3u1fbpfcp-zoom-1.image)

安装完成之后，选择左侧Manage Jenkins选项。如下图所示：

![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12672a0115c34cb9af6e14beb94f75e0~tplv-k3u1fbpfcp-zoom-1.image)

jenkins中Manage Plugins搜索以下插件`Publish Over SSH`、`nodejs`并安装。![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ce27354315a4175a2dab5517aa993d0~tplv-k3u1fbpfcp-zoom-1.image)

安装完成后配置nodejs环境和ssh参数 在首页选择`global tool Configuration`>`NodeJS`选择自动安装和对应的nodejs版本号，选择成功后点击保存。![img](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/564f869249fa491285d63e425d33b78e~tplv-k3u1fbpfcp-zoom-1.image)![img](https://user-gold-cdn.xitu.io/2020/4/1/171346034d047b6a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

配置ssh信息，`Manage Jenkins`>`configure System`填写服务器的相关信息![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/439110754a404246bc0e10fb4682fd5e~tplv-k3u1fbpfcp-zoom-1.image)

![img](https://user-gold-cdn.xitu.io/2020/4/1/171346eea555cfce?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



## Git hook

> 现在要搞一下git钩子功能，当我们本地向远程仓库push代码，远程仓库会向配置的Jenkins服务器接口地址发送一个POST请求，Jenkins收到之后会构建触发任务。

1.在配置页面点击源码管理，勾选Git,如下配置



![image.png](https://user-gold-cdn.xitu.io/2020/2/19/1705d30ddb86b833?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



2.添加触发器
使用Generic Webhook Trigger Plugin 插件(若没有则需要安装)，勾选，添加Token(用于触发远程仓库web hooks 的标识)

![image.png](https://user-gold-cdn.xitu.io/2020/2/19/1705d30de4d8e2e5?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



1. ### 仓库配置钩子

打开仓库管理，添加webHook,
URL规则为：http://:<端口>/generic-webhook-trgger/invoke?token=<token为Jenkins 任务配置中构建触发器中配置的token
最后选择添加



![image.png](https://user-gold-cdn.xitu.io/2020/2/19/1705d30dfec8fe7e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



1. ### 构建配置

这里是指git 拉取代码后，执行的构建任务，一般会有升级依赖包，测试，压缩资源等，本文只是一个demo,只涉及到将代码部署到web工作目录中
选择构建 => 增加构建步骤 => 执行shell
执行命令的操作是将目录下的文件，复制到/work/lsq web工作目录下

```shell
node -v &&
npm config set registry https://registry.npm.taobao.org
npm i &&
npm run build
tar -zcvf dist.tar.gz dist
exit
```



![image.png](https://user-gold-cdn.xitu.io/2020/2/19/1705d30e07987113?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)





## 配置构建后操作

在前端资源打包完成后，我们需要将文件送到目标服务器。此处添加送往的目标服务器。

点击`Add Server`添加构建后需要将文件传送的目标服务器，并指定传送的文件名称`dist.tar.gz`，并编写传送后需要执行的命令。

`Exec command` 中的命令在不同的操作系统中是不一样的。

```shell
cd /usr/local/projects/Ayanami_server/web/main/
mv dist dist_bak
tar -zxvf dist.tar.gz
rm -rf dist.tar.gz
```



![img](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/191f777448044a6a9e9858939714a8af~tplv-k3u1fbpfcp-watermark.image)
