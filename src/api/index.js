'use strict'

const Koa = require('koa')
const Promise = require('bluebird')
const koaBody = require('koa-body')
const koaCompress = require('koa-compress')

global.Promise = Promise

const port = 3000
const log = {
  info: console.log,
  error: console.error,
}

const app = new Koa()
app.use(koaCompress())
app.use(koaBody({ multipart: true }))

app.use(async (ctx, nextMiddleware) => {
  log.info('Incoming request')
  await nextMiddleware()
})

app.use(async ctx => {
  log.info(ctx.request.headers)
  log.info(ctx.request.body)
  await Promise.delay(1000)
  ctx.status = 200
  ctx.body = {
    status: 'runnning',
  }
})

app.start = () => {
  log.info('Starting server ...')
  app.listen(port, () => {
    log.info(`==> 🌎 Server running on port ${port}.`)
  })
}

app.start()
