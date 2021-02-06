const getNavConf = (dirPath, rootPath) => {
  const fs = require('fs')
  const objModel = {
    text: ''
  }
  const nav = loadFiles(dirPath, rootPath)

  function loadFiles(dirPath, rootPath) {
    // console.log('dirPath', dirPath);
    const arr = []
    const files = fs.readdirSync(dirPath)
    Object.values(files).forEach(name => {
      // console.log('name', name);
      const model = JSON.parse(JSON.stringify(objModel))
      model.text = name
      const stats = fs.statSync(dirPath + name)
      // console.log('stats', name ,stats);
      if (stats.isDirectory()) {
        model.items = loadFiles(dirPath + name + '/', `${rootPath}/${name}`)
      } else if (stats.isFile()) {
        const fileName = name.split('.md')[0]
        model.text = fileName
        model.link = `${rootPath}/${fileName}`
      } else {
        return
      }
      arr.push(model)
    })
    // console.log('arr', arr);
    return arr
  }
  return nav
}

module.exports = {
  getNavConf
}
