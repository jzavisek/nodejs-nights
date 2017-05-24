'use strict'

const Koa = require('koa')
const Promise = require('bluebird')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

const config = require('../modules/config')
const log = require('../modules/logging')

global.Promise = Promise

const app = new Koa()

app.use(koaCompress())
app.use(koaCors({ origin: '*' }))
app.use(koaBody({ multipart: true }))

app.use(ctx => {
  log.info({ header: ctx.request.headers }, 'Server route hit.')
  ctx.body = {
    status: 'running',
  }
})

app.start = () => {
  log.info('Starting server ...')
  app.listen(config.server.port, () => {
    log.info(`==> 🌎 Server running on port ${config.server.port}.`)
  })
}

app.start()
