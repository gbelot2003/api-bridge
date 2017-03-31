// dependencies:
import 'colors'
import writeError from './writeError'
import writeLog   from './writeLog'

export default (body, extension) => {
  let content = (extension === 'json') ? JSON.stringify(body) : body

  writeError({content: content, extension: extension })
  .then(({file, date, pathName, id}) => {
    writeLog({ id: id, date: date, file: pathName })
    .then(result => console.log('Error, check this file:', pathName.red))
    .catch(err => console.log(`Error when trying to generate the error and log`, err))
  })
  .catch(err => console.log(`Error when trying to generate the error and log`, err))
}
