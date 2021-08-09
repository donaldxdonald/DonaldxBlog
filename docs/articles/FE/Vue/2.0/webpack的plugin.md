## 备注版权信息的BannerPlugin

### webpack.config.js

```javascript
const webpack = require('webpack')
module.exports={
    plugins: [
        new webpack.BannerPlugin('')
    ]
}
```

## 打包html的html-webpack-plugin

### npm安装

> npm install --save-dev html-webpack-plugin

### webpack.config.js

```javascript
const webpackHtmlPlugin = require('html-webpack-plugin')
module.exports= {
    plugins: [
    	new htmlWebpackPlugin({
        	template: 'index.html'
    	})
	]
}

```

## js压缩的uglifyjs-webpack-plugin

### npm安装

>npm install --save-dev uglifyjs-webpack-plugin@1.1.1

### webpack.config.js

```javascript
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    plugins: [
        new uglifyJsPlugin()
    ]
}
```

