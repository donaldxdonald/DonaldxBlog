## webpack的loader

### 图片

![image-20200312203519437](C:\Users\MZHlo\AppData\Roaming\Typora\typora-user-images\image-20200312203519437.png)

### ES6 → ES5

`npm install --save-dev babel-loader@7 babel-core babel-preset-es2015`

```javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```