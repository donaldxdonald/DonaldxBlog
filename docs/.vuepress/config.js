const themeConfig = require("./config/themeConfig")
const path = require('path')
const resolve = pathName => path.join(__dirname, pathName)
module.exports = {
  title: 'DonaldxDocs',
  base: "/",
  theme: 'simple',
  themeConfig,
  configureWebpack () {
    return {
      resolve: {
        alias: {
          '@': resolve('/')
        }
      }
    }
  }
}
