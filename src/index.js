const socketServer = require('./socket-server')
const webServer = require('./web-server')

webServer.start(app => socketServer.start(app))
