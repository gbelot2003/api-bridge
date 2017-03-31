const request = require('request')

const performRequest = ({url, data}) => new Promise((resolve, reject) => {
  let options = {
    url: url,
    json: data,
    headers: {
      'User-Agent': 'request'
    }
  }

  request.post(options, (err, response, body) => {
    if (err) reject(err)
    else resolve(body)
  })
})

module.exports = performRequest
