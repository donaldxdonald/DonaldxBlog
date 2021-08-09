将发布时要用的和开发时要用的配置文件分离

新建build文件夹，建base.config.js, prod.config.js, dev.config.js

base.config.js 放置开发和发布时必要的配置文件

prod.config.js 放置发布时才需要的配置文件

dev.config.js 放置开发时才需要的配置文件

> npm install --save-dev webpack-merge

分别在prod和dev两个文件中将各自与base结合

## package.json

在脚本后面加上对应的配置文件地址

```json
"build": "webpack --config ./build/prod.config.js",
"dev": "webpack-dev-server --open --config ./build/dev.config.js"
```

