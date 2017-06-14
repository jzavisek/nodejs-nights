'use strict'

const compose = require('koa-compose')
const middleware = require('../middleware')
const users = require('../../modules/resources/users')
const log = require('../../modules/logging')
const errors = require('../../modules/errors')

module.exports = {

  get: compose([
    middleware.validator.validateParams(users.schema.getDetail),
    async ctx => {

      // Get parameter from URL
      const userId = ctx.params.userId
      log.info({ userId }, 'Fetching user.')

      // Fetch user
      const user = await users.getById(userId)
      if (!user) {
        throw new errors.NotFound('User.NotFound')
      }

      // Return to use if found
      ctx.status = 200
      ctx.body = user
    },
  ]),

  post: compose([
    middleware.validator.validaBody(users.schema.register),
    async ctx => {
      // Perform registration
      const userData = ctx.request.body
      const registration = await users.register(userData)

      // Write response
      ctx.set('Authorization', registration.accessToken)
      ctx.body = registration.user
      ctx.status = 201
    },
  ]),

}
