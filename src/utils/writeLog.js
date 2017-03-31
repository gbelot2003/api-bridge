const fs = require('fs')
const writeFile = require('./writeFile')
const settings = require(`${process.cwd()}/settings.js`)
const logs = require(`${settings.logs.filePath}`)

const writeLog = (metadata = 'No error description') => new Promise((resolve, reject) => {
  logs.push(metadata)
  writeFile({
    content: JSON.stringify(logs),
    pathName: settings.logs.filePath
  })
  .then(file => resolve(file))
  .catch(err => reject(err))
})

module.exports = writeLog
