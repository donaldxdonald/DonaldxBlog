## webpack的loader

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