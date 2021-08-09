## 什么是Promise



```javascript
new Promise((resolve,reject) => {
    setTimeout(() => {
        //尽量不要将任务放在函数里处理，放在then和catch里
    }).then(() => {
        //成功就调用then
    }).catch(() => {
        //失败就调用catch
    })
})
```

