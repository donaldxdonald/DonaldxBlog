# CSS

## 初始化

---

```css
body {
    margin: 0;
    padding: 0;
    
}

a {
    text-decoration: none;
}

ul li {
    list-style: none;
}
```





## 颜色

---

+ 英文
+ 十进制 
+ RGB (255, 255, 255)
+ RGBA(255, 255, 255, 1)
+ 十六进制 #ff0000



## display

------

div是块级元素，独占一行



## content相关

---

`height`

`min-height`

`max-height`

`width`

`min-width`

`max-width`



### 上下margin传递

![image-20200323143159284](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323143159284.png)

### 上下margin折叠

![image-20200323144337947](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323144337947.png)

![image-20200323144714811](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323144714811.png)

### 注意点

![image-20200323152258478](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323152258478.png)



## text-align

---

 `justify` 两端对齐



## line-height

---

line-height = text-height + line-spacing

行高 = 文字高度 + 行距



## outline

---

![image-20200323174017321](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323174017321.png)



## [伪类 pseudo-classes](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

---

### 动态伪类

+ :link 未访问 
+ :visited 已访问
+ :hover 鼠标悬停  a:hover 必须被置于 a:link 和 a:visited 之后，才是有效的
+ :active 已选中 a:active 必须被置于 a:hover 之后，才是有效的
+ :focus  获取焦点

### 结构伪类

+ nth-child(1)  第一个子元素
+ 数字可以填n，代表自然数
+ 偶数可写2n 或 even
+ 奇数可写2n+1 或 odd
+ -n+3 等于前三个

### 总表

|                            选择器                            |         示例          |                    示例说明                     |
| :----------------------------------------------------------: | :-------------------: | :---------------------------------------------: |
|  [:checked](https://www.runoob.com/cssref/sel-checked.html)  |     input:checked     |             选择所有选中的表单元素              |
| [:disabled](https://www.runoob.com/css/cssref/sel-disabled.html) |    input:disabled     |             选择所有禁用的表单元素              |
|    [:empty](https://www.runoob.com/cssref/sel-empty.html)    |        p:empty        |            选择所有没有子元素的p元素            |
|  [:enabled](https://www.runoob.com/cssref/sel-enable.html)   |     input:enabled     |             选择所有启用的表单元素              |
| [:first-of-type](https://www.runoob.com/cssref/sel-first-of-type.html) |    p:first-of-type    |   选择的每个 p 元素是其父元素的第一个 p 元素    |
| [:in-range](https://www.runoob.com/cssref/sel-in-range.html) |    input:in-range     |             选择元素指定范围内的值              |
|  [:invalid](https://www.runoob.com/cssref/sel-invalid.html)  |     input:invalid     |               选择所有无效的元素                |
| [:last-child](https://www.runoob.com/cssref/sel-last-child.html) |     p:last-child      |          选择所有p元素的最后一个子元素          |
| [:last-of-type](https://www.runoob.com/cssref/sel-last-of-type.html) |    p:last-of-type     |     选择每个p元素是其母元素的最后一个p元素      |
| [:not(selector)](https://www.runoob.com/cssref/sel-not.html) |        :not(p)        |               选择所有p以外的元素               |
| [:nth-child(n)](https://www.runoob.com/cssref/sel-nth-child.html) |    p:nth-child(2)     |      选择所有 p 元素的父元素的第二个子元素      |
| [:nth-last-child(n)](https://www.runoob.com/cssref/sel-nth-last-child.html) |  p:nth-last-child(2)  |         选择所有p元素倒数的第二个子元素         |
| [:nth-last-of-type(n)](https://www.runoob.com/cssref/sel-nth-last-of-type.html) | p:nth-last-of-type(2) |      选择所有p元素倒数的第二个为p的子元素       |
| [:nth-of-type(n)](https://www.runoob.com/cssref/sel-nth-of-type.html) |   p:nth-of-type(2)    |         选择所有p元素第二个为p的子元素          |
| [:only-of-type](https://www.runoob.com/cssref/sel-only-of-type.html) |    p:only-of-type     |         选择所有仅有一个子元素为p的元素         |
| [:only-child](https://www.runoob.com/cssref/sel-only-child.html) |     p:only-child      |          选择所有仅有一个子元素的p元素          |
| [:optional](https://www.runoob.com/cssref/sel-optional.html) |    input:optional     |          选择没有"required"的元素属性           |
| [:out-of-range](https://www.runoob.com/cssref/sel-out-of-range.html) |  input:out-of-range   |         选择指定范围以外的值的元素属性          |
| [:read-only](https://www.runoob.com/cssref/sel-read-only.html) |    input:read-only    |             选择只读属性的元素属性              |
| [:read-write](https://www.runoob.com/cssref/sel-read-write.html) |   input:read-write    |           选择没有只读属性的元素属性            |
| [:required](https://www.runoob.com/cssref/sel-required.html) |    input:required     |       选择有"required"属性指定的元素属性        |
|     [:root](https://www.runoob.com/cssref/sel-root.html)     |         root          |                选择文档的根元素                 |
|   [:target](https://www.runoob.com/cssref/sel-target.html)   |     #news:target      |   选择当前活动#news元素(点击URL包含锚的名字)    |
|    [:valid](https://www.runoob.com/cssref/sel-valid.html)    |      input:valid      |              选择所有有效值的属性               |
|     [:link](https://www.runoob.com/cssref/sel-link.html)     |        a:link         |               选择所有未访问链接                |
|  [:visited](https://www.runoob.com/cssref/sel-visited.html)  |       a:visited       |              选择所有访问过的链接               |
|   [:active](https://www.runoob.com/cssref/sel-active.html)   |       a:active        |                选择正在活动链接                 |
|    [:hover](https://www.runoob.com/cssref/sel-hover.html)    |        a:hover        |             把鼠标放在链接上的状态              |
|    [:focus](https://www.runoob.com/cssref/sel-focus.html)    |      input:focus      |             选择元素输入后具有焦点              |
| [:first-letter](https://www.runoob.com/cssref/sel-firstletter.html) |    p:first-letter     |          选择每个p 元素的第一个字母           |
| [:first-line](https://www.runoob.com/cssref/sel-firstline.html) |     p:first-line      |            选择每个p 元素的第一行             |
| [:first-child](https://www.runoob.com/cssref/sel-firstchild.html) |     p:first-child     | 选择器匹配属于任意元素的第一个子元素的 p 元素 |
|   [:before](https://www.runoob.com/cssref/sel-before.html)   |       p:before        |            在每个p元素之前插入内容            |
|    [:after](https://www.runoob.com/cssref/sel-after.html)    |        p:after        |            在每个p元素之后插入内容            |
| [:lang(*language*)](https://www.runoob.com/cssref/sel-lang.html) |      p:lang(it)       |        为p元素的lang属性选择一个开始值        |



## 伪元素

---

用::开头

![伪元素](http://www.alloyteam.com/wp-content/uploads/2016/05/%E4%BC%AA%E5%85%83%E7%B4%A0.png)



## overflow

---

管理元素溢出的处理

`auto` 通常用这个



## box-sizing

---

![image-20200323200010706](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200323200010706.png)



## background-size

---

![image-20200325135106526](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200325135106526.png)



## CSS-sprite

---

![image-20200325140215890](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200325140215890.png)



## 背景图居中

---

~~`background-positon` : center xx;~~

```css
img {
    /* 先将图片向左移动本身的50% */
    transform: translate(-50%);
    /* 再向右移动父级div的50% */
    margin-left: -50%;
}
```



## background-attachment

---

![image-20200325153445206](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200325153445206.png)



## absolute定位

---

![image-20200326130631732](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200326130631732.png)



## 绝对定位技巧

---

![image-20200326154319647](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200326154319647.png)



## float

---

### 规则一

![image-20200326230409440](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200326230409440.png)

### 规则二

![image-20200326232206333](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200326232206333.png)

### 规则三

![image-20200326233447148](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200326233447148.png)

### 规则四

![image-20200327112248816](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327112248816.png)

### 规则五

![image-20200327112730819](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327112730819.png)

### 规则六

![image-20200327113045207](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327113045207.png)



## flex布局

---

### flex相关的属性

![image-20200327164429791](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327164429791.png)



### flex-container的属性👇

---

### flex-direction

绝对主轴的方向，默认为row



### justify-content

![image-20200327171303300](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327171303300.png)



### align-items

![image-20200327173018944](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200327173018944.png)



### flex-wrap

![image-20200329124410116](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329124410116.png)



### align-content

![image-20200329134327578](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329134327578.png)



### flex-items的属性👇

---

### order

![image-20200329135632803](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329135632803.png)



### align-self

![image-20200329135823884](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329135823884.png)



### flex-grow

![image-20200329140931344](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329140931344.png)



### flex-shrink

![image-20200329142153290](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329142153290.png)



### flex-basis

![image-20200329142408675](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329142408675.png)



### flex

![image-20200329142654730](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200329142654730.png)



## 动画

---

### 贝塞尔曲线

```
cubic-bezier(x1, y1, x2, y2)
```