## [官网介绍](https://vuex.vuejs.org/zh/)

![vuex](https://vuex.vuejs.org/vuex.png)

getters相当于组件的computed

mutations相当于methods



## mutations

---

vuex的store状态的更新唯一方法：提交Mutations

mutations唯一的目的就是修改state中的状态

mutations中的每个方法里完成的事件尽可能单一一点

复杂的交给actions

### 传递参数

```javascript
//第一种提交风格
//在组件调用时可以添加参数payload
this.$store.commit('function', payload)
//在mutations的方法里可以添加参数

//第二种提交风格
//此时传入的payload为对象类型
this.$store.commit({
    type: 'function',
    payload
})
```

可以在一个js文件里给常量定义一个名称，方便维护

提交给mutation用commit

分发给action用dispatch



## getters

---

getters里的函数，默认参数为state，还可以传入getters，调用getters的其他函数，如果想传入其他参数，可以直接让当前函数返回一个函数



## 数据的响应式

---

在vuex里初始化的数据才能变成响应式，后来加的不行

后来加的可以用vue.set方法添加，用vue.delete方法删除响应式



## actons

---

在actions里处理异步操作

![image-20200406140408496](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200406140408496.png)



## modules

---





## mapGetters 辅助函数

---

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：

```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：

```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  doneCount: 'doneTodosCount'
})
```