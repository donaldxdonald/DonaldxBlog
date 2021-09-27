# frp

> 在一个有公网ip的服务器里部署服务器端，在内网设备里部署客户端访问服务器端，然后服务器端就会识别到客户端的公网ip并连接

## frps 服务器端

```yaml
# docker-compose.yml
  frps:
    image: snowdreamtech/frps
    container_name: frps_compose
    restart: always
    ports:
      # 服务端口
      - "10055:10055"
      # 后台管理端口
      - "10077:10077"
      # SSH端口
      - "10022:10022"
      # 外网访问端口
      - "10080:10080"
    volumes:
      - ./conf/frps.ini:/etc/frp/frps.ini
```

```ini
#frps.ini
[common]
# 服务端口
bind_port = 10055
vhost_http_port = 10080
vhost_https_port = 10443
# 后台管理端口
dashboard_port = 10077
dashboard_user = admin
dashboard_pwd = admin
  
tcp_mux = true
max_pool_count = 10
```



## frpc 客户端

```yaml
# docker-compose.yml
  frpc:
    image: snowdreamtech/frpc
    container_name: frpc_compose
    restart: always
    volumes:
      - ./conf/frpc.ini:/etc/frp/frpc.ini
    network_mode: host
```

```ini
#frpc.ini
[common]
#服务器ip
server_addr = SERVER_IP
server_port = 10055
  
[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 10022
use_encryption = true
use_compression = true
  
[pi.mydomain.com]
type = http
local_port = 80
custom_domains = pi.mydomain.com
```

