# webpack配置vue

## npm引入vue

> npm install --save vue

## webpack.config.js

```javascript
resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
```

## npm引入vue-loader

> npm install --save-dev vue-loader vue-template-compiler

### webpack.config.js

```javascript
module:{
	test: /\.vue$/,
	use: ['vue-loader']
}
```

