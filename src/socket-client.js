const WebSocket = require('ws')
const port = process.env.PORT || 3000
const defaultUrl = `ws://localhost:${port}`
const url = process.env.WS_URL || defaultUrl
const ws = new WebSocket(url)
const log = require('./log')('SOCKET-CLIENT')

let onReadyCallback
let isReady = false

ws.on('open', function open () {
  log('Connected.')
  isReady = true
  if (typeof onReadyCallback === 'function') onReadyCallback(ws)
})

ws.on('message', function incoming (data) {
  log('GOT MESSAGE', data)
})

function onReady (callback) {
  onReadyCallback = callback
}

function broadcast (data) {
  ws.send(JSON.stringify(data))
}

module.exports = { broadcast, onReady, isReady }
