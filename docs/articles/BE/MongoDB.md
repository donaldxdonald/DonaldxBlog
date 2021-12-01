---
title: 使用 MongoDB
date: 2020-05-20 09:22
---



## 创建数据库

---

MongoDB 创建数据库的语法格式如下：

```mongodb
use DATABASE_NAME
```

如果数据库不存在，则创建数据库，否则切换到指定数据库。

如果你想查看所有数据库，可以使用 **show dbs** 命令：

```
> show dbs  
local  0.078GB  
test   0.078GB  
>   
```



## 删除数据库

---

MongoDB 删除数据库的语法格式如下：

```
db.dropDatabase()
```

集合删除语法格式如下：

```
db.collection.drop()  
```



## 插入文档

---

MongoDB 使用 insert() 或 save() 方法向集合中插入文档，语法如下：

```
 db.COLLECTION_NAME.insert(document)  
```

### 实例

以下文档可以存储在 MongoDB 的 mongo 数据库 的 col集合中：

```
>db.col.insert({title: 'MongoDB 教程',
			description: 'MongoDB 是一个 Nosql 数据库',
             by: 'MongoDB中文网',
             url: 'http://www.mongodb.org.cn',
             tags: ['mongodb', 'database', 'NoSQL'],
             likes: 100  })
```



## 删除文档

---



```
db.collection.remove(
		<query>,
        {
        	justOne: <boolean>,
            writeConcern: <document>
        } 
)
```

**参数说明：**

- **query** :（可选）删除的文档的条件。
- **justOne** : （可选）如果设为 true 或 1，则只删除一个文档。
- **writeConcern** :（可选）抛出异常的级别。



## 更新文档

---

update() 方法用于更新已存在的文档。语法格式如下：

```
db.collection.update(
		<query>,
        <update>,
        {
        	upsert: <boolean>,
            multi: <boolean>,
            writeConcern: <document>
        }
)
```

参数说明：

- **query** : update的查询条件，类似sql update查询内where后面的。
- **update** : update的对象和一些更新的操作符（如$,$inc...）等，也可以理解为sql update查询内set后面的
- **upsert** : 可选，这个参数的意思是，如果不存在update的记录，是否插入objNew,true为插入，默认是false，不插入。
- **multi** : 可选，mongodb 默认是false,只更新找到的第一条记录，如果这个参数为true,就把按条件查出来多条记录全部更新。
- **writeConcern** :可选，抛出异常的级别。

update中不加入$set: 的话就是替换



## 索引

---

MongoDB使用 ensureIndex() 方法来创建索引。

### 语法

创建索引：

```
  db.user.ensureIndex({"username":1}) 
```

获取当前集合的索引：

```
db.user.getIndexes()
```

删除索引：

```
db.user.dropIndex({"username":1})
```

语法中 Key 值为你要创建的索引字段，1为指定按升序创建索引，如果你想按降序来创建索引指定为-1即可。



### 复合索引

复合索引可以支持要求匹配多个键的查询。

```
db.events.createIndex( { "username" : 1, "date" : -1 } )
```

如果设置了多个个键值，查询的时候只查询第一个是可以索引，但是只查询后面的就不行



### 唯一索引

``` 
db.user.ensureIndex({"userid":1},{"unique":true})
```

如果再次插入userid重复的文档时，MongoDB将报错

``` 
db.user.insert({"userid":5})
db.user.insert({"userid":5})
```





### 实例

```
  >db.col.ensureIndex({"title":1})  
  >  
```

ensureIndex() 方法中你也可以设置使用多个字段创建索引（关系型数据库中称作复合索引）。

```
  >db.col.ensureIndex({"title":1,"description":-1})  
  >  
```

ensureIndex() 接收可选参数，可选参数列表如下：

| Parameter          | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | 在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

### 实例

在后台创建索引：

```
  db.values.ensureIndex({open: 1, close: 1}, {background: true})  
```

通过在创建索引时加background:true 的选项，让创建工作在后台执行



## 关联

---

在定义schema的时候，关联某一项

```javascript
const schema = new mongoose.Schema({
    name: {type: String},
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}//关联Category
  })
```

获取的时候默认是返回id，加个populate('parent')方法就可以获取到parent的全部数据



## 账户权限配置

---

### 第一步创建超级管理用户

```
use admin
db.createUser({
	user:'admin',
	pwd:'123456',
	roles:[{role:'root',db:'admin'}]
})
```



### 第二步修改Mongodb数据库配置文件

mongodb目录下的mongodb.cfg文件

```
security:
	authorization: enabled
```



### 第三步重启mongodb服务

在系统服务那里



### 第四步用超级管理员账户连接数据库

```
mongo admin -u username -p password
```



### 第五步给其他数据库创建一个用户

```
use superheroes
db.createUser({
	user:'superheroesadmin',
	pwd:'123456',
	roles:[{role:'dbOwner',db:'superheroes'}]
})
```



查看当前库下的用户

```
show users
```



删除用户

```
db.dropUser('superheroesadmin')
```



修改账户密码

```
db.updateUser("admin",{pwd:"password"})
```



密码认证

```
db.auth("admin","password")
```





## MongDB数据库角色

---

![image-20200428120311615](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200428120311615.png)



## 聚合管道

---

使用聚合管道可以对集合中的文档进行变换和组合

实际项目：表关联查询、数据的统计

```
adb.superheroes.aggregate([
	{$match: {hero: "batman"}},
	{$group: {comicname: "$comic", total: {$sum: "$price"}}}
])
```



![image-20200428151827977](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200428151827977.png)



## SQL和NOSQL对比

---

![image-20200428151856363](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200428151856363.png)