'use strict'

const compose = require('koa-compose')
const middleware = require('../middleware')
const users = require('../../modules/resources/users')
const log = require('../../modules/logging')

module.exports = {

  async get(ctx) {
    const userId = ctx.params.userId
    log.info({ userId }, 'Fetching user.')
    const user = await users.getByEmail('john@example.com')
    ctx.body = user
  },

  post: compose([
    middleware.validator.validaBody(users.schema.register),
    ctx => {
      // TODO: register user
      ctx.status = 201
    },
  ]),
}
