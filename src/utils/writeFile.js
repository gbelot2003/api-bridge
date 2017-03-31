const fs   = require('fs')

const writeFile = ({content, pathName}, cb) => new Promise((resolve, reject) => {
  let wstream = fs.createWriteStream(pathName)
  wstream.on('finish', () => resolve(pathName))
  wstream.on('error', (err) => reject(err))
  wstream.write(content)
  wstream.end()
})

module.exports = writeFile
