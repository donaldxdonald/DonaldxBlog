## 使用



## 参数

---

默认情况下不监听实时滚动位置

需要传入probeType

```javascript
const bs = new BScroll('', {
    probeType: 3
    //0,1都是不侦测实时的位置
    //2.手指离开后不侦测
    //3.只要是滚动，都侦测
})
```



建议通过给标签设置ref属性获取改标签



## 解决首页中可滚动区域的问题

---



使用事件总线监听

1. 先Vue.prototype.$bus = new Vue() 给原型添加一个$bus事件总线

2. 再用@load监听每个图片，将回调函数$emit给$bus
3. 然后在Home.vue里处理



## 防抖操作

---

对于refresh非常频繁的问题，进行防抖操作

+ 防抖debounce/ 节流throttle

