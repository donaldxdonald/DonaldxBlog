# JAVASCRIPT



## 类型转换

---

### 转数字

`Number()`

`parseInt()`

`parseFloat`

### 转字符串

`toString()`

`string()`

其他类型和字符串直接用+拼接

### 转成布尔类型

`Boolean()`

tips: 空字符串、0、null、undefined和NaN使用该方法转换后均为false



## 自增/自减的前置与后置的区别

---

i++  先使用，再自身加1

++i  先自身+1，再使用



## 分支结构

---

### if分支结构

单分支  if..

多分支  

+ if...
+ if... else...
+ if... else if... else...



### switch分支结构

```javascript
switch (character) {
    case "spiderman": 
        console.log("Peter Parker");
        break;
    default "batman": 
        console.log("Bruce Wayne");
        break;
}
```



### 三目运算符

表达式1 ? 表达式2 :  表达式3



## 数组的排序

---

冒泡排序/选择排序/插入排序

堆排序/希尔排序/快速排序

### 冒泡排序

![image-20200401200157354](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200401200157354.png)

![image-20200401200219824](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200401200219824.png)



### 函数的参数 - arguments

在函数里可以调用arguments，记录着传入函数的所有参数

是一个对象类型



## 块级作用域

---

es5没有块级作用域，但是函数可以定义自己的作用域



## 函数

---

### 声明式

``` javascript
function test() {
    
}
//要直接调用需要用括号括住，再在后面加上括号
//直接调用函数执行完后会立即销毁
(function () {
    
})()
```

### 匿名函数表达式

```javascript
var demo = function() {
    
}
//可直接在后面加个括号直接调用
```



### 值传递和引用传递

基本数据类型保存在栈内存中

引用数据类型保存在堆内存中

所以将一个变量作为参数传递到函数里，并在函数里修改，是不会影响该变量本身的值。而将数组等引用数据类型传递，在里面修改，会根据引用地址导向内存的数据修改。

[不懂再看]('https://www.bilibili.com/video/BV1nJ411J7a2?p=91')



## 本地储存

---

### 特性

![image-20200425205616780](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200425205616780.png)

### localStorage

![image-20200425210512444](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200425210512444.png)

### sessionStorage

![image-20200425210323764](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200425210323764.png)



## this的指向

---

![image-20200426215914680](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426215914680.png)

改变函数内this的指向可用call方法和apply方法

call的主要作用可以实现继承

![image-20200426221235131](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426221235131.png)



apply

![image-20200426221326220](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426221326220.png)

![image-20200426221813839](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426221813839.png)



严格模式下的this

![image-20200426225203480](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426225203480.png)

## 高阶函数

---

高阶函数是对其他函数进行操作的函数，接受函数作为参数，或者将函数作为返回值输出

### map

我们调用`Array`的`map()`方法，传入我们自己的函数，就得到了一个新的`Array`作为结果

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
```



### reduce

这个函数必须接收两个参数，`reduce()`把结果继续和序列的下一个元素做累积计算，其效果就是：

```javascript
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x + y;
}); // 25
```



### filter

和`map()`类似，`Array`的`filter()`也接收一个函数。和`map()`不同的是，`filter()`把传入的函数依次作用于每个元素，然后根据返回值是`true`还是`false`决定保留还是丢弃该元素。

例如，在一个`Array`中，删掉偶数，只保留奇数，可以这么写：

```javascript
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
var r = arr.filter(function (x) {
    return x % 2 !== 0;
});
r; // [1, 5, 9, 15]
```





## 闭包

---

闭包（closure）指有权访问另一个函数作用域中变量的函数。

简单理解就是，一个作用域可以访问另外一个函数内部的局部变量



👇可以实现在函数外的作用域访问函数内的变量

![image-20200426231123679](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426231123679.png)

👇用立即执行函数的闭包方式来得到索引号

![image-20200426232833397](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426232833397.png)

👇如果直接在for循环里使用setTimeout的话，因为setTimeout是异步操作，for循环是同步操作，等setTimeout执行的时候for循环已经执行完成，i=4了。用闭包的话就可以解决，下面的立即执行函数是闭包，因此setTimeout里使用的i是其传入的i

![image-20200426233231351](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200426233231351.png)



## 递归

---

函数内部自己调用自己，这个函数就是递归函数

由于递归很容易发生栈溢出错误（stack overflow），所以必须加退出条件return

![image-20200427001841522](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200427001841522.png)



## ES6

---

### let

- 使用let声明的变量才有块级作用域特性，使用var的没有

- 不存在变量提升（不能先使用后声明）

- 变量具有展示性死区特性（只会使用块级作用域的变量）

![image-20200427005245285](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200427005245285.png)



### 剩余参数

将剩下的参数一起打包

```javascript
//剩余参数和解构赋值一起用
let arr = [1, 2, 3, 4]

let [a, ...b] = arr 
//a 就等于 1
//b 等于[2,3,4]
```



### 扩展运算符

- 也是前面加...
- 可以将数组或对象转为用逗号分隔的参数序列（将里面的参数逐个拿出）

可用于 合并数组

可以将伪数组（类数组或可遍历对象）转换为真正的数组



### set数据结构

也是数组，但是里面的值不能有重复



## 深度拷贝

---

```javascript
// 1
JSON.parse(JSON.stringify(val))

// 2
const old = {
  key: value
}
const new = {
  ...old
}
```

