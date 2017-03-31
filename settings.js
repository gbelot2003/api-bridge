// dependencies:
const pathModule = require('path')

// helpers:
const path = (src) => pathModule.join(process.cwd(), src)

module.exports = {
  errors: {
    baseName: path('./src/errors'),
  },
  logs: {
    filePath: path('./src/logs.json'),
    message: {
      uploading: false,
      uploaded: true,
      error: true,
      deleted: false,
    }
  },
  hosts: {
    remote: {
      connection: {
        host: process.env.SERVER_A_HOST,
        port: 22,
        username: process.env.SERVER_A_USER,
        password: process.env.SERVER_A_PASS,
      },
      folders: {
        source: process.env.SERVER_A_SOURCE,
        target: process.env.SERVER_A_TARGET
      },
    },
    local: {
      url: process.env.SERVER_B_ENDPOINT,
      folders: {
        temp: path('./src/tmp'),
        dump: path('./src/dumps'),
        error: path('./src/errors'),
        log: path('./src/logs'),
      },
    },
  },
  watcher: {
    host: process.env.SERVER_A_HOST,
    port: 22,
    username: process.env.SERVER_A_USER,
    password: process.env.SERVER_A_PASS,
    algorithms: {
      serverHostKey: [
        'ssh-rsa',
        'ssh-dss',
      ],
    },
    folders : {
      0: process.env.SERVER_A_SOURCE
    },
  },
  listeners: {
    sftp: null, // Infinity or 0 for unlimited listeners | number | null and node will handle automatically.
    watcher: null, // Infinity or 0 for unlimited listeners | number | null and node will handle automatically.
    defaults: null, //  Infinity or 0 for unlimited listeners | number | null and node will handle automatically.
  },
}

/*console.log('=============================================')
console.log(process.env.SERVER_A_HOST)
console.log(process.env.SERVER_A_USER)
console.log(process.env.SERVER_A_PASS)
console.log(process.env.SERVER_A_SOURCE)
console.log(process.env.SERVER_A_TARGET)
console.log(process.env.SERVER_B_ENDPOINT)
console.log('=============================================')*/
