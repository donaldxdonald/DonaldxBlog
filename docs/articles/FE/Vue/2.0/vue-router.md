## 三个阶段

1. 后端路由阶段
2. 前后端分离阶段
3. SPA页面阶段 （前端路由）



## url的hash和HTML5的history

```javascript
//1、可直接加载网页而不向服务器发送请求
location.hash = ''
//2、history
history.pushstate({}, '', 'url')
history.replacestate({}, '', 'url')
history.go(-1) == history.back()
history.go(1) == history.forward()
```



## 使用步骤

### 安装

> npm install vue-router --save

### 在模块化工程中使用它（因为vue-router是一个插件，需要通过Vue.use()来安装路由功能）

```javascript
//index.js
import VueRouter from ('vue-router')
Vue.use(VueRouter)
//创建实例
const newrouter = new VueRouter({
    routes: [],
    //默认为hash模式，可以设置为history模式
    mode: 'history'
})
```

### 使用vue-router的步骤

1. 创建路由组件
2. 配置路由映射：组件和路由映射关系
3. 使用路由：通过<router-link>和<router-view>

![image-20200316182418606](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200316182418606.png)

![image-20200316183958704](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200316183958704.png)



## 动态路由

$router  > 创建的最外层的router

$route > 当前活跃的route

1. 需要在route的路径里加入[:参数名]
2. 在App.vue里处理数据
3. 在相应的组件(User.vue)里获取数据 this.$route.params.参数名



## 路由懒加载

```javascript
// 使用路由懒加载的方式，使得打包后的js文件分开存放
() => import('')
```



## 路由嵌套

在相应的route下加children项

```javascript
new router({
    route: [
        {
            path: '/',
            component: '../home.vue',
            children: [
                {
                    path: 'news'
                }
            ]
        }
    ]
})
```

在相应的组件vue里添加子组件的<router-link>和<router-view>



## 参数传递

#### params

参考上方动态路由

#### query

直接给地址传一个query的对象



## 生命周期函数

```javascript
//1、当组件被创建出来时会被回调/执行
created(){}
//2、当template被挂到DOM上时会被回调
mounted(){}
//3、当界面发生更新时会被回调
updated(){}
```





## 全局导航守卫

案例：监听路由，并将当前组件的title赋值到网页的title

```javascript
//index.js
router.beforeEach(to,from,next())
```

[导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)



## keep-alive

```html
//组件中加入keep-alive可使该组件不会被destroyed和重新created
//并且可以使用activated和deactivated两个回调函数
<keep-alive>
	<router-view></router-view>
</keep-alive>
```

![image-20200319153333257](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200319153333257.png)



