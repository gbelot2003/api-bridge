// dependencies:
import 'colors'
import Watcher        from 'remote-file-watcher'
import Client         from 'ssh2-sftp-client'
import path           from 'path'
import readFile       from './utils/readFile'
import writeFile      from './utils/writeFile'
import writeError     from './utils/writeError'
import writeLog       from './utils/writeLog'
import parseXMLToJSON from './utils/parseXMLToJSON'
import performRequest from './utils/performRequest'
import generateError  from './utils/generateError'
import generateDump   from './utils/generateDump'
import {isObject}     from './utils/methods'
import logs           from './logs.json'
import settings       from '../settings.js'
import generateDate   from './utils/generateDate'

// helpers & variables:
const dir     = (src) => path.join(__dirname, src)
const sftp    = new Client()
const watcher = new Watcher('remote-server', settings.watcher)

sftp.connect(settings.hosts.remote.connection)
.then(() => {
  let counter = 0
  console.log(`Listening for changes...`.gray)
  watcher.on('uploaded', ({serverName, folder, fileName}) => {
    let tmpFile = `${settings.hosts.local.folders.temp}/${fileName}`

    sftp.get(`${folder}/${fileName}`)
    .then(data => data.on('data', (chunk) =>  {
      writeFile({content: chunk, pathName: tmpFile})
      .then(pathFile => readFile(pathFile))
      .then(contentFile => parseXMLToJSON(contentFile))
      .then(json => {
        const factura = json.Factura
        factura.id = factura['$'].id
        delete(factura['$'])

        performRequest({url: settings.hosts.local.url, data: factura})
        .then(response => {
          let dump = !!response.toString().includes('Sfdump')
          let validation = !!(isObject(response) && JSON.stringify(response).toLowerCase().includes('validation'))
          let exception = !!response.toString().includes('Exception')

          if (dump) {
            generateDump(response)
          } else if (validation) {
            generateError(response, 'json')
          } else if (exception) {
            generateError(response, 'html')
          } else {
            sftp.put(tmpFile, `${settings.hosts.remote.folders.target}/${fileName}`)
            .then(ops => sftp.delete(`${settings.hosts.remote.folders.source}/${fileName}`))
            .then(ops => !!settings.logs.message.uploaded && console.log(`#${++counter}. ${generateDate().toLowerCase()} -> "${fileName}" uploaded!.`.gray))
            .catch(err => generateError(err.message, 'txt'))
          }
        }).catch((err) => generateError(`Error when sending data to the datastore: "${err.message}"`, 'txt'))
      }).catch((err) => generateError(`Error when parsing the xml file "${fileName}": "${err.message}"`, 'txt'))
    })).catch((err) => generateError(`Error when getting the file "${fileName}": "${err.message}"`, 'txt'))

  })
}).catch((err) => generateError(`Error when connecting to "${process.env.SERVER_A_HOST}": "${err.message}"`, 'txt'))

// prints messages of: errors, files deleted and files uploading
if (settings.logs.message.uploading) {
  watcher.on('uploading', ({fileName}) => console.log(`The file "${fileName}" is uploading...`))
}
if (settings.logs.message.deleted) {
  watcher.on('deleted', ({fileName}) => console.log(`The file "${fileName}" has been deleted.`.yellow))
}
if (settings.logs.message.error) {
  watcher.on('error', (serverName, err) => generateError(`Error when trying to watch the server: "${err.message}"`, 'txt'))
}

// change number of listeners:
if (settings.listeners.defaults === Infinity || settings.listeners.defaults === 0) {
  require('events').EventEmitter.defaultMaxListeners = Infinity;
}
if (settings.listeners.sftp === Infinity || settings.listeners.sftp === 0) {
  sftp.client.setMaxListeners(Infinity)
}
if (settings.listeners.sftp === Infinity || settings.listeners.sftp === 0) {
  watcher.setMaxListeners(Infinity)
}
