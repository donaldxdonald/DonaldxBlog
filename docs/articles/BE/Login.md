# 登录验证

## 后端

1. 给密码加密

      （在数据库“用户”的模型里，给password添加加密操作）

      ```javascript
      password: {
        type: String,
        set(val) {
          return require('bcrypt').hashSync(val, 10)
        }
      }
      ```

2. 根据用户名查找用户

3. 校验密码

   用bcrypt的compareSync方法，返回布尔值判断

   （在请求中添加验证）

   ```javascript
   app.post('/login', aysnc (req, res) => {
   	const user = await User.findOne({username : req.body.username})
     //没有此用户
     if(	!user	) {
       return res.status(422).send({
         message: '用户不存在'
       })
     }
     //验证密码
     const isPasswordValid = require('bcrypt').compareSync(
     	req.body.password,
       user.password
     )
     if(	!isPasswordValid ) {
       return res.status(422).send({
         message: '密码错误'
       })
     }
     //生成token
     //见下方代码
     
     res.send({
       user,
       token
     })
   })
   ```

   

3. 返回token

   用jsonwebtoken的sign方法得到token，发送到前端
   
   ```javascript
   const jwt = require('jsonwebtoken')
   //密钥，一般是另外创建在全局文件中，不在代码里
   const SECRET = 'asdkljqkldjklqjdkljad'
   const token = jwt.sign({
     id: String(user._id),
   }, SECRET)
   ```
   
5. 根据token获取个人信息

      

在数据请求的router中间加个中间件验证token

```javascript
const auth = async (req, res, next) {
  //获取请求头的token
  const raw = String(req.headers.authorization.split(' ').pop())
  //同样的密钥验证，并提取id
  const {	id } = jwt.verify(raw, SECRET)
  //根据token获取个人信息
  req.user = await User.findById(id)
  next()
}
```



## 前端

拦截axios的请求将token添加到headers里

```javascript
request.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + (sessionStorage.token || '')
  }
})
```

