const parseString = require('xml2js').parseString

const parser = (xml) => new Promise((resolve, reject) => {
  if (xml) {
    let options = {trim: true, explicitArray: false}
    parseString(xml, options, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  } else {
    reject(err)
  }
})



module.exports = parser
