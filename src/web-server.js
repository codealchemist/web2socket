const express = require('express')
const httpsEnforcer = require('https-enforcer')
const bodyParser = require('body-parser')
const socketClient = require('./socket-client')

const app = express()

function start (callback) {
  setRoutes()
  callback(app)
}

function setRoutes () {
  app.use(httpsEnforcer)
  app.use(bodyParser.json()) // support json encoded bodies
  app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  app.get('/', (req, res) => {
    const data = req.query
    console.log('GET REQUEST:', data)
    socketClient.broadcast(data)

    res
      .status(200)
      .json(data)
  })

  app.post('/', (req, res) => {
    const data = req.body
    console.log('POST REQUEST:', data)
    socketClient.broadcast(data)

    res
      .status(200)
      .json(data)
  })

  app.use((req, res) => {
    res.sendStatus(404)
  })
}

module.exports = { start }
