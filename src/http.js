const http = require('http')
const handler = require('serve-handler')

module.exports = (config) => new Promise((resolve, reject) => {
  if (!config.httpServer) {
    return resolve('')
  }
  http.createServer((req, res) => {
    return handler(req, res, {
      public: config.path
    })
  }).listen(config.port, () => {
    resolve(`Local dev server started on port ${config.port}`)
  })
})
