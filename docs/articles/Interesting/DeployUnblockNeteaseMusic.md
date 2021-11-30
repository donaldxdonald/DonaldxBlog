---
title: 网易云去灰
date: 2021-09-27 23:50
---



> 部署 [@nondanee/UnblockNeteaseMusic](https://github.com/nondanee/UnblockNeteaseMusic) 在服务器，通过 clash 代理将网易云客户端请求导向服务器，从而达到去灰效果

## 1. 部署 UnblockNeteaseMusic

### 自签证书

> via [issue#48](https://github.com/nondanee/UnblockNeteaseMusic/issues/48#issuecomment-477870013)

```bash
# 新建证书文件夹
mkdir cert

# 生成 CA 私钥
openssl genrsa -out ca.key 2048

# 生成 CA 证书 ("YOURNAME" 处填上你自己的名字)
openssl req -x509 -new -nodes -key ca.key -sha256 -days 1825 -out ca.crt -subj "/C=CN/CN=UnblockNeteaseMusic Root CA/O=YOURNAME"

# 生成服务器私钥
openssl genrsa -out server.key 2048

# 生成证书签发请求
openssl req -new -sha256 -key server.key -out server.csr -subj "/C=CN/L=Hangzhou/O=NetEase (Hangzhou) Network Co., Ltd/OU=IT Dept./CN=*.music.163.com"

# 使用 CA 签发服务器证书
openssl x509 -req -extfile <(printf "extendedKeyUsage=serverAuth\nsubjectAltName=DNS:music.163.com,DNS:*.music.163.com") -sha256 -days 365 -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt

```



### 使用 dockerCompose 

#### 目录结构

```
├─docker-compose.yml
├─cert
|  ├─ca.crt
|  ├─ca.key
|  ├─ca.srl
|  ├─server.crt
|  ├─server.csr
|  └server.key
```

```yml
# docker-compose.yml
version: '3'

services:
  unblockneteasemusic:
    image: nondanee/unblockneteasemusic
    environment:
      NODE_ENV: production
    ports:
      - 80:80
      - 443:443
    restart: always
    volumes:
      - ./cert/server.key:/usr/src/app/server.key
      - ./cert/server.crt:/usr/src/app/server.crt
    command: -p 80:443 -s
```

```bash
docker-compose up -d
```



### 使用 pm2 

```bash
npm i -g pm2

git clone https://github.com/nondanee/UnblockNeteaseMusic.git

cd UnblockNeteaseMusic

# 替换 CA 证书 server.crt 和 server.key

pm2 start app.js -p 80:443 -s
```



## 2. Clash 配置

```yaml
# yml 版本
Rule:
	- DOMAIN-SUFFIX,163.com,NCM
	- PROCESS-NAME, NeteaseMusic,NCM

Proxy:
	- name: 🎵 NCM
		type: http
		server: <Server-IP>
    port: <Server-Port> #对应上方部署对应的80端口
```

### mixin

```javascript
module.exports.parse = ({ content, name, url }, { yaml, axios, notify }) => {
  const myProxies = [
    { name: '🎵 NCM', type: 'http', server: <Server-IP>, port: <Server-Port>}
  ]

  const myRules = [
    'DOMAIN-SUFFIX,163.com,🎵 NCM',
    'PROCESS-NAME, NeteaseMusic, 🎵 NCM'
  ]

  const extra = {
    proxies: [...myProxies, ...content.proxies],
    rules: [...myRules, ...content.rules]
  }

  return { ...content, ...extra }
}
```



## 3. 网易云音乐

#### UWP 版

保持 http 请求，可在关于网易云音乐中，左键点击 logo 5 次后迅速右键点击 1 次设置网址
