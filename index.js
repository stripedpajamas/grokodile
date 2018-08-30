const colorette = require('colorette')
const clp = require('clp')
const { config, http, ngrok, build } = require('./src')

const { bold, white, yellow, red } = colorette
const args = clp()

// get configuration from file specified in argument
// or from the default `.grokodile.json`
let configJson
config(args.config || '.grokodile.json')
  .then((json) => { configJson = json })
  .then(() => http(configJson))
  .then((status) => {
    console.log(bold(white(status)))
  })
  .then(() => ngrok(configJson))
  .then((url) => {
    console.log(bold(`${white('ngrok connected: ')}${yellow(url)}`))
    console.log(bold(`${white('Running build command: ')}${yellow(configJson.build)}`))
  })
  .then(() => build(configJson))
  .catch((e) => console.log(red(e)))
