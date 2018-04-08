const { onReady } = require('./socket-client')
onReady((ws) => {
  const message = {
    type: 'addDevice',
    data: {
      id: 42,
      ip: '192.168.0.27',
      name: 'TEST-EVENT'
    }
  }
  ws.send(JSON.stringify(message))
  console.log('TEST message sent.')
  process.exit()
})
