'use strict'

const Koa = require('koa')

console.log(test)

const app = new Koa()

const port = 3000
const log = {
  info: console.log,
  error: console.error,
}

app.start = () => {
  log.info('Starting server ...')
  app.listen(port, () => {
    log.info(`==> 🌎 Server running on port ${port}.`)
  })
}
