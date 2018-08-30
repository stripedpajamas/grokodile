const fs = require('fs')
const defaultConfig = require('./default.json')

module.exports = (file) => new Promise((resolve, reject) => {
  let raw
  try {
    raw = fs.readFileSync(file, { encoding: 'utf8' })
  } catch (e) { }

  let json = {}
  if (raw) {
    try {
      json = JSON.parse(raw)
    } catch (e) {
      return reject(new Error(`could not parse config file ${file}: ${e.message}`))
    }
  }

  return resolve(Object.assign({}, defaultConfig, json))
})
