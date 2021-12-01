---
title: 数据结构
date: 2021-05-16 23:32
---



> 用JavaScript学数据结构！

## 列表

> 列表是一组有序的数据。每个列表 中的数据项成为**元素**。

### 实现
```javascript
function List() {
	this.listSize = 0
    this.pos = 0
    this.dataStore = []//初始化一个空数组来保存列表元素
    this.find = find
    this.insert = insert
    this.append = append
    this.remove = remove
    this.length = length
    
    //给列表添加元素
    function append(element) {
         this.dataStore[this.listSize++] = element
    }
    //在列表中查找某一元素
    function find(element) {
		for(var i = 0; i < this.dataStore.length; i++) {
            if(this.dataStore[i] === element) {
                return i
            }
        }
        return -1
    }
    //从列表删除元素
    function remove(element) {
		var foundAt = this.find(element)
        if (foundAt > -1) {
        	this.dataStore.splice(index, 1)
            --this.listSize
            return true
		}
        return false
    }
    // 向列表插入一个元素
    function insert(element, after) {
		var insertPos = this.find(after)
        if(insertPos > -1) {
            this.dataStore.splice(insertPos + 1, 0, element)
            ++this.listSize
            return true
        }
        return false
    }
    function length() {
		return this.listSize
    }
    
}
```



- 优点：
  1. 按照索引查询元素速度快
  2. 按照索引遍历数组方便
- 缺点：
  1. 列表的大小固定后就无法扩容了
  2. 列表只能存储一种类型的数据
  3. 添加，删除的操作慢，因为要移动其他的元素。
- 适用场景：
  频繁查询，对存储空间要求不大，很少增加和删除的情况。





## 栈

> 栈是一种特殊的列表，栈内的元素只能通过列表的一端访问，这一端称为**栈顶**。栈的结构就像一个集装箱，越先放进去的东西越晚才能拿出来，所以，栈常应用于实现递归功能方面的场景，例如斐波那契数列。栈被称为一种后入先出（LIFO，Last In First Out）的数据结构。

### 实现

```javascript
function Stack() {
  this.dataStore = []
  this.top = 0
  this.push = push
  this.pop = pop
  this.peek = peek
  this.clear = clear
  this.length = length

  function push(element) {
    this.dataStore[this.top++] = element
  }

  function peek() {
    return this.dataStore[this.top - 1]
  }

  function pop() {
    return this.dataStore[--this.top]
  }

  function clear() {
    this.top = 0
  }

  function length() {
    return this.top
  }
}
```



### 使用

#### 判断字符串是否为回文

```javascript
function isPalindrome(word) {
  var s = new Stack()
  for(var i = 0; i < word.length; i++) {
    s.push(word[i])
  }
  var rword = ''
  while(s.length() > 0) {
    rword += s.pop()
  }
  return word === rword
}

isPalindrome('Spider-Man') //false
isPalindrome('dad') //true
```





## 队列

> **队列**是一种列表，不同的是队列只能在队尾插入元素，在队首删除元素。队列用于存储按顺序排列的数据，先进先出（FIFO, First In First Out）。队列被用在很多地方，比如提交操作系统执行的一系列进程、打印任务池等。向队列中插入新元素叫做**入队**，删除操作叫做**出队**。



### 实现

```javascript
function Queue() {
  this.dataStore = []
  this.enqueue = enqueue
  this.dequeue = dequeue
  this.front = front
  this.back = back
  this.toString = toString
  this.empty = empty

  function enqueue(element) {
    this.dataStore.push(element)
  }
  function dequeue() {
    return this.dataStore.shift()
  }
  function front() {
    return this.dataStore[0]
  }
  function back() {
    return this.dataStore[this.dataStore.length - 1]
  }
  function toString() {
    var retStr = ''
    for(var i = 0; i < this.dataStore.length; i++) {
      retStr += this.dataStore[i] + '\n'
    }
    return retStr
  }
  function empty() {
    return this.dataStore.length === 0
  }
}
```



### 使用

