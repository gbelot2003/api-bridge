import moment     from 'moment'
import writeFile  from './writeFile'
import generateId from './generateId'
import generateDate from './generateDate'
const settings = require(`${process.cwd()}/settings.js`)

export default ({content, extension}) => new Promise((resolve, reject) => {
  let format = 'ddd_DD-MMM-YYYY_hh:mm:ss_A'
  let now = moment().toDate()
  let date = generateDate()
  let pathName = `${settings.errors.baseName}/${date}.${extension}`

  writeFile({content: content, pathName: pathName})
  .then(file => resolve({file: file, date: date, pathName: pathName, id: generateId()}))
  .catch(err => reject(err))
})
