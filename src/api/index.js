'use strict'

const Koa = require('koa')
const Promise = require('bluebird')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const config = require('../modules/config')
const log = require('../modules/logging')
const db = require('../modules/database')
const routes = require('./routes')
const middleware = require('./middleware')

global.Promise = Promise

const app = new Koa()

// Register middleware
app.use(koaCompress())
app.use(koaCors(config.server.cors))
app.use(koaBody(config.server.bodyParser))
app.use(middleware.errors.handleError)

// Register routes
app.use(routes)

// Define start method
app.start = async () => {
  log.info('Starting server ...')
  await db.init()
  await Promise.fromCallback(done => app.listen(config.server.port, done))
  log.info(`==> 🌎 Server running on port ${config.server.port}.`)
}

// Start app
if (require.main === module) {
  app.start()
}

module.exports = app
