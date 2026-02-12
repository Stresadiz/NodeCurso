const http = require('node:http')
const { findAvalaiblePort } = require('./10.free-port')

const server = http.createServer((req, res) => {
  console.log('Request received')
  res.end('Hola Mundo')
})

findAvalaiblePort(3000).then(port => {
  server.listen(port, () => {
    console.log(`El server está escuchando en http://localhost:${port}/`)
  })
})
