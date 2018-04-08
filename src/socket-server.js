const http = require('http')
const WebSocket = require('ws')
const log = require('./log')('SOCKET-SERVER')

let wss
const port = process.env.PORT || 3000

function start (app, callback) {
  const server = http.createServer(app)
  wss = new WebSocket.Server({
    perMessageDeflate: false,
    server
  })

  setBroadcasting()

  server.listen(port, () => {
    console.log(`
      WEB-2-SOCKET listening on port ${port}.
    `)
  })
}

function setBroadcasting () {
  wss.on('connection', (ws) => {
    log('NEW client.')

    ws.on('message', (data) => {
      const message = JSON.parse(data)
      broadcast(ws, message)
    })
  })
}

function broadcast (ws, message) {
  const data = JSON.stringify(message)
  wss.clients.forEach((client) => {
    if (client === ws) return
    if (client.readyState !== WebSocket.OPEN) return
    client.send(data, (error) => {}) // eslint-disable-line
  })
}

module.exports = { start }
