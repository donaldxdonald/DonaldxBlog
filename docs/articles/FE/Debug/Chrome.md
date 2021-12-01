---
title: ChromeDevTools Tips
date: 2021-08-09 14:05
---



## 在console中控制当前选中的节点

`$0` - 在Element中选中节点后，在Console输入$0可以控制该节点数据

```bash
> console.dir($0)
```



## 在console中使用最后定义的变量

`$_`

```bash
> ['1', 2, '3']
> $_
['1', 2, '3']
```

