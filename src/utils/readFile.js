let fs = require('fs')

const readFile = (pathFile, cb) => new Promise((resolve, reject) => {
  fs.readFile(pathFile, {encoding: 'UTF-8'}, (err, data) => {
    if (err) reject(err)
    else resolve(data)
  })
})

module.exports = readFile
