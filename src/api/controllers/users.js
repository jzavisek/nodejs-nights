'use strict'

const compose = require('koa-compose')
const middleware = require('../middleware')
const schema = require('../../modules/resources/users/schema')
const userRepository = require('../../modules/resources/users/repository')
const log = require('../../modules/logging')

module.exports = {

  async get(ctx) {
    const userId = ctx.params.userId
    log.info({ userId }, 'Retrieving user.')

    const user = await userRepository.getByEmail('john@example.com')
    ctx.body = user
  },

  post: compose([
    middleware.validator.validaBody(schema.register),
    async ctx => {
      // TODO: do bussiness logic
      ctx.body = ctx.request.body
    },
  ]),
}

