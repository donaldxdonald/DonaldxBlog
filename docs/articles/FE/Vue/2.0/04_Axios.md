## 发送并发请求

---

```javascript
axios.all([
    axios{},
    axios{}
])
```



## 默认配置

---

`axios.default.baseurl=''`



## 模块封装

---

尽量不要用全局axios，将axios封装在一个request.js里



## 拦截器

---

```javascript
//instance为axios的实例
instance.interceptors.request.use(res => {
    
    return res
},err => {
    
} )

instance.interceptors.response.use(res => {
    
    return res
},err => {
    
} )
```

