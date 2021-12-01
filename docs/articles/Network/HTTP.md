---
title: 学习计算机网络
date: 2021-03-14 10:52
---



## Http和Https的区别

Http协议运行在TCP之上，明文传输，客户端与服务器端都无法验证对方的身份；Https是身披SSL(Secure Socket Layer)外壳的Http，运行于SSL上，SSL运行于TCP之上，是添加了加密和认证机制的HTTP。二者之间存在如下不同：

- 端口不同：Http与Http使用不同的连接方式，用的端口也不一样，前者是80，后者是443；

- 资源消耗：和HTTP通信相比，Https通信会由于加减密处理消耗更多的CPU和内存资源；

- 开销：Https通信需要证书，而证书一般需要向认证机构购买；
  　

Https的加密机制是一种共享密钥加密和公开密钥加密并用的混合加密机制。



## 三次握手

![三次握手](https://github.com/donaldxdonald/Waking-Up/raw/master/_v_images/20191129101827556_21212.png)

> 我要和你建立链接，你真的要和我建立链接么，我真的要和你建立链接，成功

- 第一次握手：Client将标志位SYN置为1，随机产生一个值seq=J，并将该数据包发送给Server，Client进入SYN_SENT状态，等待Server确认。

- 第二次握手：Server收到数据包后由标志位SYN=1知道Client请求建立连接，Server将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给Client以确认连接请求，Server进入SYN_RCVD状态。

- 第三次握手：Client收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给Server，Server检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，Client和Server进入ESTABLISHED状态，完成三次握手，随后Client与Server之间可以开始传输数据了

## GET与POST的区别

1. GET是幂等的，即读取同一个资源，总是得到相同的数据，POST不是幂等的；
2. GET一般用于从服务器获取资源，而POST有可能改变服务器上的资源；
3. 请求形式上：GET请求的数据附在URL之后，在HTTP请求头中；POST请求的数据在请求体中；
4. 安全性：GET请求可被缓存、收藏、保留到历史记录，且其请求数据明文出现在URL中。POST的参数不会被保存，安全性相对较高；
5. GET只允许ASCII字符，POST对数据类型没有要求，也允许二进制数据；
6. GET的长度有限制（操作系统或者浏览器），而POST数据大小无限制



## Session与Cookie的区别

Session是服务器端保持状态的方案，Cookie是客户端保持状态的方案Cookie保存在客户端本地，客户端请求服务器时会将Cookie一起提交；Session保存在服务端，通过检索Sessionid查看状态。保存Sessionid的方式可以采用Cookie，如果禁用了Cookie，可以使用URL重写机制（把会话ID保存在URL中）。





## 防盗链

“盗链”是互联网用语。通常指未经源网站允许的情况下，通过超链接引用源网站内容，如图片，视频等。盗链行为会造成受害网站数据泄露以及经济损失。

在现代互联网公司业务中防盗链技术扮演者越来越重要的角色，例如：网站通常会对内容进行防盗链处理，仅仅对特定用户开放，而没有权限的用户即使获得链接地址，也无法访问该链接所指向的内容。

### Referer防盗链

Referer在HTTP协议里有特殊的用途，当浏览器向服务器发送请求时，一般会带上Referer头，告知服务器该请求是从哪个页面链接过来的。Referer经常被用于页面访问统计、图片防盗链等。

流媒体直播同样支持Referer防盗链，当请求发送到CDN服务器后，CDN服务器检查客户URL中所携带的Referer字段的信息，禁止或者允许符合特定规则（支持正则匹配）的Referer的请求。
