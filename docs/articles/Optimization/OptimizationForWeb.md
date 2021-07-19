# Web开发性能优化笔记

## 运行时性能优化

### 1. 减少重绘与重排

浏览器下载完页面需要的所有资源后， 就开始渲染页面，主要经历这5个过程：

1. 解析HTML生成DOM树
2. 解析CSS生成CSSOM规则树
3. 将DOM树与CSSOM规则树合并生成Render(渲染)树
4. 遍历Render(渲染)树开始布局， 计算每一个节点的位置大小信息
5. 将渲染树每个节点绘制到屏幕上

![](https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwvSR4dG1qENWeQC4gTDtkRA4xTPdXNn7uib6tQgoNeQicVYvCesUGncJk9tBHRnFTnaStXpHZHRkanA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**重排**

当改变DOM元素位置或者大小时， 会导致浏览器重新生成Render树， 这个过程叫重排

**重绘**

当重新生成渲染树后， 将要将渲染树每个节点绘制到屏幕， 这个过程叫重绘。

**重排触发时机**

重排发生后的根本原理就是元素的几何属性发生改变， 所以从能够改变几何属性的角度入手：

- 添加|删除可见的DOM元素
- 元素位置发生改变
- 元素本省的尺寸发生改变
- 内容变化
- 页面渲染器初始化
- 浏览器窗口大小发生改变

> 二者关系：重排会导致重绘， 但是重绘不会导致重排

了解了重排和重绘这两个概念，我们还要知道重排和重绘的开销都是非常昂贵的，如果不停的改变页面的布局，就会造成浏览器消耗大量的开销在进行页面的计算上，这样容易造成页面卡顿。那么回到我们的问题`如何减少重绘与重排呢？`

#### 1.1 避免table布局

- 不要使用table布局，可能很小的一个改动会造成整个table重新布局

#### 1.2 分离读写操作

DOM 的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作。

```javascript
// bad 强制刷新 触发四次重排+重绘
div.style.left = div.offsetLeft + 1 + 'px';
div.style.top = div.offsetTop + 1 + 'px';
div.style.right = div.offsetRight + 1 + 'px';
div.style.bottom = div.offsetBottom + 1 + 'px';


// good 缓存布局信息 相当于读写分离 触发一次重排+重绘
var curLeft = div.offsetLeft;
var curTop = div.offsetTop;
var curRight = div.offsetRight;
var curBottom = div.offsetBottom;

div.style.left = curLeft + 1 + 'px';
div.style.top = curTop + 1 + 'px';
div.style.right = curRight + 1 + 'px';
div.style.bottom = curBottom + 1 + 'px';
```

#### 1.3 样式集中改变

不要频发的操作样式，虽然现在大部分浏览器有渲染队列优化，但是在一些老版本的浏览器仍然存在效率低下的问题：

```javascript
// 三次重排
div.style.left = '10px';
div.style.top = '10px';
div.style.width = '20px';

// 一次重排
el.style.cssText = 'left: 10px;top: 10px; width: 20px';
```

或者可以采用更改类名而不是修改样式的方式。

#### 1.4 position属性为absolute或fixed

使用绝对定位会使的该元素单独成为渲染树中 body 的一个子元素，重排开销比较小，不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。



### 2. 长列表优化

#### 1.1 实现虚拟列表

虚拟列表是一种用来优化长列表的技术。它可以保证在列表元素不断增加，或者列表元素很多的情况下，依然拥有很好的滚动、浏览性能。它的核心思想在于：只渲染可见区域附近的列表元素。下图左边就是虚拟列表的效果，可以看到只有视口内和临近视口的上下区域内的元素会被渲染。

![](https://mmbiz.qpic.cn/mmbiz_png/YBFV3Da0NwvSR4dG1qENWeQC4gTDtkRAibtibcICqZ8Ecw2L5w3kWnxdp1tGgjArjPxuN0mTmq3rMYmzsTEO1DxA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

具体实现步骤如下所示：

- 首先确定长列表所在父元素的大小，父元素的大小决定了可视区的宽和高
- 确定长列表每一个列表元素的宽和高，同时初始的条件下计算好长列表每一个元素相对于父元素的位置，并用一个数组来保存所有列表元素的位置信息
- 首次渲染时，只展示相对于父元素可视区内的子列表元素，在滚动时，根据父元素的滚动的`offset`重新计算应该在可视区内的子列表元素。这样保证了无论如何滚动，真实渲染出的dom节点只有可视区内的列表元素。
- 假设可视区内能展示5个子列表元素，及时长列表总共有1000个元素，但是每时每刻，真实渲染出来的dom节点只有5个。
- 补充说明，这种情况下，父元素一般使用`position：relative`，子元素的定位一般使用：`position：absolute`或`sticky`



```javascript
// 需要用到的数据
screenHeight // 可视区域高度
itemSize // 列表项高度
listData // 列表数据
scrollTop // 当前滚动位置

listHeight = listData.length * itemSize  // 列表总高度
visibleCount = Math.ceil(screenHeight / itemSize)  // 可显示的列表项数
startIndex = Math.floor(scrollTop / itemSize)  // 起始索引
endIndex = startIndex + visibleCount  // 结束索引
visibleData = listData.slice(startIndex, endIndex + 1)  // 列表显示数据

// 当滚动后，由于渲染区域相对于可视区域已经发生了偏移，此时我需要获取一个偏移量startOffset，通过样式控制将渲染区域偏移至可视区域中。
startOffset = scrollTop - (scrollTop % itemSize)
```

