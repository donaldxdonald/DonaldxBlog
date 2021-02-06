# AJAX

## Ajax的实现步骤

---

```javascript
//创建Ajax对象
var xhr = new XMLHttpRequest()
//老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象：
//var xhr = new ActiveXObject("Microsoft.XMLHTTP");

//告诉Ajax对象要向哪发送请求
xhr.open('get', 'http://xxx.com')
//发送请求
xhr.send()
//获取服务端响应到客户端的数据
xhr.onload() = function (){
  console.log(xhr.responseText)
}
```




## 异步？

---

XMLHttpRequest 对象如果要用于 AJAX 的话，其 open() 方法的 async 参数必须设置为 true：

```javascript
xmlhttp.open("GET","ajax_test.html",true);
```

对于 web 开发人员来说，发送异步请求是一个巨大的进步。很多在服务器执行的任务都相当费时。AJAX 出现之前，这可能会引起应用程序挂起或停止。

通过 AJAX，JavaScript 无需等待服务器的响应，而是：

- 在等待服务器响应时执行其他脚本
- 当响应就绪后对响应进行处理



## 服务器相应的数据格式

---

responseText返回的是Json字符串

使用JSON.parse()可以将其转换为Json格式



## 请求参数传递

---

![image-20200619153314587](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200619153314587.png)



## 请求参数的格式

---

![image-20200619161000652](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200619161000652.png)



json格式的在后端需要用bodyParser.json()中间件解析



## onreadystatechange 事件

---

当请求被发送到服务器时，我们需要执行一些基于响应的任务。

每当 readyState 改变时，就会触发 onreadystatechange 事件。

readyState 属性存有 XMLHttpRequest 的状态信息。

下面是 XMLHttpRequest 对象的三个重要的属性：

![image-20200619164038727](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200619164038727.png)



__与onload对比（推荐用onload）__

![image-20200619174600882](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200619174600882.png)

