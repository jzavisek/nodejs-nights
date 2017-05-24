'use strict'

const Koa = require('koa')
const Promise = require('bluebird')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')

global.Promise = Promise

const port = 3000
const log = {
  info: console.log,
  error: console.error,
}

const app = new Koa()

app.use(koaCompress())
app.use(koaCors({ origin: '*' }))
app.use(koaBody({ multipart: true }))

app.use(ctx => {
  ctx.render('index')
})

app.start = () => {
  log.info('Starting server ...')
  app.listen(port, () => {
    log.info(`==> 🌎 Server running on port ${port}.`)
  })
}

app.start()
