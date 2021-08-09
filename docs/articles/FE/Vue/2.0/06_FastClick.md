# FastClick

## 为什么要使用FastClick

移动设备上的浏览器默认会在用户点击屏幕大约延迟300毫秒后才会触发点击事件，这是为了检查用户是否在做双击。为了能够立即响应用户的点击事件，才有了FastClick。

项目地址：https://github.com/ftlabs/fastclick



## 安装fastclick

`npm install fastclick --save`

然后在main.js里面添加上

```javascript
  import  FastClick  from  'fastclick'
  FastClick.attach(document.body);
```



