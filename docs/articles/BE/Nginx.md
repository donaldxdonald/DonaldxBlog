# Nginx

---

## 引言

```
为什么要学习Nginx
问题1：客户端到底要将请求发送给哪台服务器
问题2：如果所有客户端的请求都发送给了服务器1
问题3：客户端发送的请求可能是申请动态资源的，也有申请静态资源的

服务器搭建集群后

```

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-c4fOulBr-1596523530155)(Nginx笔记.assets/1596442414104.png)]](https://img-blog.csdnimg.cn/20200804144611463.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

```
在搭建集群后，使用Nginx做反向代理
```

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-3QqWfnB1-1596523530159)(Nginx笔记.assets/1596442512901.png)]](https://img-blog.csdnimg.cn/20200804144623426.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

## Nginx介绍

Nginx是由俄罗斯人研发的，应对Rambler的网站并发，并且2004年发布的第一个版本

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-7WuZL9xs-1596523530161)(Nginx笔记.assets/1596442670671.png)]](https://img-blog.csdnimg.cn/20200804144640485.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

```
Nginx的特点
1.稳定性极强，7*24小时不间断运行(就是一直运行)
2.Nginx提供了非常丰富的配置实例
3.占用内存小，并发能力强(随便配置一下就是5w+,而tomcat的默认线程池是150)
```



# Nginx的安装

---

## 安装Nginx

使用docker-compose安装

```shell
#在/opt目录下创建docker_nginx目录
cd /opt
mkdir docker_nginx
#创建docker-compose.yml文件并编写下面的内容,保存退出
vim docker-compose.yml
```

```yaml
version: '3.1'
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
```

```
执行docker-compose up -d
```

访问80端口，看到下图说明安装成功（ncthz.top是我阿里云服务器的域名，大家输入自己服务器的Ip就可以访问80端口了）

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-U1ZGOlc2-1596523530163)(Nginx笔记.assets/1596445007607.png)]](https://img-blog.csdnimg.cn/20200804144702568.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

## Nginx的配置文件

```shell
#查看当前nginx的配置需要进入docker容器中
docker exec -it 容器id bash
#进入容器后
cd /etc/nginx/
cat nginx.conf
```

nginx.conf文件内容如下

```json
user  nginx;
worker_processes  1;

error_log  /var/log/nginx/error.log warn;
pid        /var/run/nginx.pid;
# 以上同城为全局块
# worker_processes的数值越大，Nginx的并发能力就越强
# error_log代表Nginx错误日志存放的位置
# pid是Nginx运行的一个标识

events {
    worker_connections  1024;
}
# events块
# worker_connections的数值越大，Nginx的并发能力就越强

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf;
}

# http块
# include代表引入一个外部文件
# include       /etc/nginx/mime.types;	mime.types中存放着大量媒体类型
#include /etc/nginx/conf.d/*.conf;	引入了conf.d下以.conf为结尾的配置文件

```

conf.d目录下只有一个default.conf文件，内容如下

```json
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    #charset koi8-r;
    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
	# location块
	# root:将接受到的请求根据/usr/share/nginx/html去查找静态资源
	# index:默认去上述的路径中找到index.html或index.htm

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
	

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}

# server块
# listen代表Nginx监听的端口号
# server_name代表Nginx接受请求的IP
```



## 修改docker-compose文件

```shell
#退出容器
exit
#关闭容器
docker-compose down
#修改docker-compose.yml文件如下
```

```shell
version: '3.1'
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
```

```shell
#重新构建容器
docker-compose bulid
#重新启动容器
docker-compose up -d
```



这时我们再次访问80端口是访问不到的，因为我们映射了数据卷之后还没有编写server块中的内容

我们在/opt/docker_nginx/conf.d下新建default.conf，并插入如下内容

```json
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }
}
```

```shell
#重启nginx
docker-compose restart
```



这时我们再访问80端口，可以看到是访问成功的



# Nginx的反向代理

---

## 正向代理和反向代理介绍

```
正向代理：
1.正向代理服务是由客户端设立的
2.客户端了解代理服务器和目标服务器都是谁
3.帮助咱们实现突破访问权限，提高访问的速度，对目标服务器隐藏客户端的ip地址
```

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-iO837s1s-1596523530165)(Nginx笔记.assets/1596447757765.png)]](https://img-blog.csdnimg.cn/20200804144856773.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

```
反向代理：
1.反向代理服务器是配置在服务端的
2.客户端不知道访问的到底是哪一台服务器
3.达到负载均衡，并且可以隐藏服务器真正的ip地址
```

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-BSBnK7dQ-1596523530166)(Nginx笔记.assets/1596447952049.png)]](https://img-blog.csdnimg.cn/20200804144918883.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

## 基于Nginx实现反向代理

```
准备一个目标服务器
启动tomcat服务器
编写nginx的配置文件(/opt/docker_nginx/conf.d/default.conf)，通过Nginx访问到tomcat服务器
```

准备tomcat服务器

```shell
docker run -d -p 8080:8080 --name tomcat  daocloud.io/library/tomcat:8.5.15-jre8
#或者已经下载了tomcat镜像
docker run -d -p 8080:8080 --name tomcat 镜像的标识

#添加数据卷
docker run -it -v /宿主机绝对目录:/容器内目录 镜像名
```

default.conf文件内容如下

```json
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

    location / {
        proxy_pass http://ncthz.top:8080/;
    }
}
```

```shell
#重启nginx
docker-compose restart
```



这时我们访问80端口可以看到8080端口tomcat的默认首页

## 关于Nginx的location路径映射

```
优先级关系：
(location = ) > (location /xxx/yyy/zzz) > (location ^~) > (location ~,~*) > (location /起始路径) > (location /)
# 1. = 匹配
location / {
	#精准匹配，主机名后面不能带能和字符串
	#例如www.baidu.com不能是www.baidu.com/id=xxx
}
```

------

```json
#2. 通用匹配
location /xxx {
	#匹配所有以/xxx开头的路径
	#例如127.0.0.1:8080/xxx	xxx可以为空，为空则和=匹配一样
}
```

------

```json
#3. 正则匹配
location ~ /xxx {
	#匹配所有以/xxx开头的路径
}
```

------

```json
#4. 匹配开头路径
location ^~ /xxx/xx {
	#匹配所有以/xxx/xx开头的路径
}
```

------

```json
#5. 匹配结尾路径
location ~* \.(gif/jpg/png)$ {
	#匹配以.gif、.jpg或者.png结尾的路径
}
```

修改/opt/docker_nginx/conf.d/default.conf如下

```json
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

	location /index {
        proxy_pass http://ncthz.top:8081/;	#tomcat首页
    }

	location ^~ /CR/ {
        proxy_pass http://ncthz.top:8080/CR/;	#毕设前台首页
    }

    location / {
        proxy_pass http://ncthz.top:8080/CRAdmin/;	#毕设后台首页
    }
}
```



```shell
#重启nginx
docker-compose restart

#访问ncthz.top/index可以进入tomcat首页
#访问ncthz.top/CR/XXX可以进入毕设前台首页
#访问ncthz.top或者ncthz.top:80可以进入毕设后台首页
```



# Nginx负载均衡

---

```
Nginx为我们默认提供了三种负载均衡的策略：
1.轮询：
  将客户端发起的请求，平均分配给每一台服务器
2.权重：
  会将客户端的请求，根据服务器的权重值不同，分配不同的数量
3.ip_hash:
  基于发起请求的客户端的ip地址不同，他始终会将请求发送到指定的服务器上
  就是说如果这个客户端的请求的ip地址不变，那么处理请求的服务器将一直是同一个
```

## 轮询

想实现Nginx轮询负载均衡机制只需要修改配置文件如下

```json
upstream my_server{
    server ncthz.top:8080;
    server ncthz.top:8081;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

	location / {
        proxy_pass http://my_server/;	#tomcat首页
    }
}
```

```json
upstream 名字{
    server ip:端口;
    server 域名:端口;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

	location / {
        proxy_pass http://upstream的名字/;	
    }
}
```

```shell
#重启nginx
docker-compose restart
```



多次刷新ncthz.top页面，根据版本号我们可以发现我们进入的是不同的tomcat

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-av9O7Ur0-1596523530167)(Nginx笔记.assets/1596509394002.png)]](https://img-blog.csdnimg.cn/20200804145017833.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-kxpmdzQe-1596523530168)(Nginx笔记.assets/1596509413468.png)]](https://img-blog.csdnimg.cn/2020080414503175.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)

## 权重

实现权重的方式：在配置文件中upstream块中加上weight

```json
upstream my_server{
    server ncthz.top:8080 weight=10;
    server ncthz.top:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

	location / {
        proxy_pass http://my_server/;	#tomcat首页
    }
}
```



## ip_hash

实现ip_hash方式：在配置文件upstream块中加上ip_hash;

```json
upstream my_server{
	ip_hash;
    server ncthz.top:8080 weight=10;
    server ncthz.top:8081 weight=2;
}
server {
    listen       80;
    listen  [::]:80;
    server_name  localhost;

	location / {
        proxy_pass http://my_server/;	#tomcat首页
    }
}
```

# Nginx动静分离

---

```
Nginx的并发能力公式：
  worker_processes * worker_connections / 4|2 = Nginx最终的并发能力
动态资源需要/4，静态资源需要/2
Nginx通过动静分离来提升Nginx的并发能力，更快的给用户响应
```

## 动态资源代理

```json
#配置如下
location / {
  proxy_pass 路径;
}
```

## 静态资源代理

```shell
#停掉nginx
docker-compose down

修改docker-compose.yml添加静态资源数据卷
不同版本的静态资源位置可能不同，可以在2.2中查看默认的位置（location块中root后的路径）

#启动nginx
docker-compose up -d
```

```yaml
version: '3.1'
services: 
  nginx:
    restart: always
    image: daocloud.io/library/nginx:latest
    container_name: nginx
    ports: 
      - 80:80
    volumes:
      - /opt/docker_nginx/conf.d/:/etc/nginx/conf.d
      - /opt/docker_nginx/html/:/usr/share/nginx/html

```

在/opt/docker_nginx/html下新建一个index.html
在index.html里面随便写点东西展示
修改nginx的配置文件

```json
location / {
    root /usr/share/nginx/html;
    index index.html;
}

#配置如下
location / {
    root 静态资源路径;
    index 默认访问路径下的什么资源;
    autoindex on;#代表展示静态资源的全部内容，以列表的形式展开
}
```

```shell
#重启nginx
docker-compose restart
#访问ncthz.top如下
```



![[外链图片转存失败,源站可能有防盗链机制,建议将图片保存下来直接上传(img-ysUPSO1S-1596523530169)(Nginx笔记.assets/1596519784166.png)]](https://img-blog.csdnimg.cn/20200804145109582.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L20wXzQ5NTU4ODUx,size_16,color_FFFFFF,t_70)