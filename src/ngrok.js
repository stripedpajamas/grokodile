const ngrok = require('ngrok')

module.exports = (config) => ngrok.connect(config.port)
