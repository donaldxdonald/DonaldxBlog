---
title: 自用DockerCompose配置
date: 2020-12-1 13:12
---



```yaml
version: "3"
services:
  jenkins:
    image: jenkins/jenkins:lts
    # arm64
    # image: jenkins4eval/jenkins
    container_name: jenkins_compose
    privileged: true
    user: "root"
    restart: always
    ports:
      - "8081:8080"
    volumes:
      - ./data/jenkins_home:/var/jenkins_home
  mongo:
    image: mongo
    container_name: mongo_compose
    restart: always
    ports:
      - "27017:27017"
    volumes:
      - ./mongo/dump:/usr/local/mongo/dump
      - ./mongo/db:/data/db
    command: mongod --auth
  openwrt:
    image: registry.cn-shanghai.aliyuncs.com/suling/openwrt:rpi4
    container_name: openwrt_compose
    restart: always
    privileged: true
    command: /sbin/init
  frps:
    image: snowdreamtech/frps
    container_name: frps_compose
    restart: always
    ports:
      - "10055:10055"
      - "10077:10077"
      - "10022:10022"
      - "10080:10080"
    volumes:
      - ./conf/frps.ini:/etc/frp/frps.ini
  frpc:
    image: snowdreamtech/frpc
    container_name: frpc_compose
    restart: always
    volumes:
      - ./conf/frpc.ini:/etc/frp/frpc.ini
    network_mode: "host"

```

