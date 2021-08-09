## 什么是Promise

![image-20200330134943299](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200330134943299.png)



![image-20200402151127298](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200402151127298.png)



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

