'use strict'

const Koa = require('koa')
const Promise = require('bluebird')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const config = require('../modules/config')
const log = require('../modules/logging')
const routes = require('./routes')

global.Promise = Promise

const app = new Koa()

// Register middleware
app.use(koaCompress())
app.use(koaCors({ origin: '*' }))
app.use(koaBody({ multipart: true }))

// Register routes
app.use(routes)

// Initialize start method
app.start = () => {
  log.info('Starting server ...')
  app.listen(config.server.port, () => {
    log.info(`==> 🌎 Server running on port ${config.server.port}.`)
  })
}

// Start app
if (require.main === module) {
  app.start()
}

module.exports = app
