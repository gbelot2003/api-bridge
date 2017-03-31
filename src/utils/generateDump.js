// dependencies:
import 'colors'
import moment     from 'moment'
import writeFile  from './writeFile'

// variables && helpers:
const settings = require(`${process.cwd()}/settings.js`)

export default (content) => {
  let format = 'ddd_DD-MMM-YYYY_hh:mm:ss_A'
  let now = moment().toDate()
  let date = moment(now).format(format)
  let pathName = `${settings.hosts.local.folders.dump}/${date}.html`

  writeFile({ content: content, pathName: pathName })
  .then(filePath => console.log(`Dump writen, check this file: ${pathName.yellow}`))
  .catch(err => console.log(`Error when trying to generate the dump file`, err))
}
