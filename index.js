const colorette = require('colorette')
const clp = require('clp')
const neatLog = require('neat-log')
const output = require('neat-log/output')
const { config, http, ngrok, build } = require('./src')

const { bold, white, yellow, red } = colorette
const args = clp()

const neat = neatLog((state) => {
  let bufferedOutput
  if (state.buildOut.length < 10) {
    bufferedOutput = state.buildOut.join('')
  } else {
    bufferedOutput = state.buildOut.slice(state.buildOut.length - 10).join('')
  }
  return output(`
    ${state.messages.join('\n')}
    ${state.messages.length && bold('-'.repeat(process.stdout.columns))}
    ${bufferedOutput}
    ${state.messages.length && bold('-'.repeat(process.stdout.columns))}
    ${state.buildErr.join('')}
  `)
})

neat.use((state, bus) => {
  state.messages = []
  state.buildOut = []
  state.buildErr = []

  // get configuration from file specified in argument
  // or from the default `.grokodile.json`
  let configJson
  config(args.config || '.grokodile.json')
    .then((json) => { configJson = json })
    .then(() => http(configJson))
    .then((status) => {
      state.messages.push(bold(white(status)))
      bus.emit('render')
    })
    .then(() => ngrok(configJson))
    .then((url) => {
      state.messages.push(bold(`${white('ngrok connected: ')}${yellow(url)}`))
      state.messages.push(bold(`${white('Running build command: ')}${yellow(configJson.build)}`))
      bus.emit('render')
    })
    .then(() => build(configJson))
    .then((builder) => {
      builder.stdout.on('data', (chunk) => {
        state.buildOut.push(chunk)
        bus.emit('render')
      })
      builder.stderr.on('data', (chunk) => {
        state.buildErr.push(chunk)
        bus.emit('render')
      })
    })
    .catch((e) => {
      state.messages.push(red(e))
      bus.emit('render')
    })
})
