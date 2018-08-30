const child = require('child_process')

module.exports = (config) => new Promise((resolve, reject) => {
  const buildSplit = config.build.split(' ')
  const buildCmd = buildSplit[0]
  const buildArgs = buildSplit.slice(1)
  const builder = child.spawn(buildCmd, buildArgs, { stdio: 'inherit' })
  builder.on('error', reject)
  builder.on('close', resolve)
})
