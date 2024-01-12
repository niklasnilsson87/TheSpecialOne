const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  const apiProxy = createProxyMiddleware('/api', {
    target: 'http://localhost:5000',
    changeOrigin: true
  })

  const socketProxy = createProxyMiddleware('/socket', {
    target: 'http://localhost:5000',
    changeOrigin: true,
    ws: true,
    logLevel: 'debug'
  })

  app.use(apiProxy)
  app.use(socketProxy)
}
