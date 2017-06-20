'use strict'

const compose = require('koa-compose')
const middleware = require('../middleware')
const users = require('../../modules/resources/users')

module.exports = {

  post: compose([
    middleware.validator.validaBody(users.schema.createSession),
    async ctx => {

      // Perform registration
      const userData = ctx.request.body
      const session = await users.createSession(userData)

      // Write response
      ctx.set('Authorization', session.accessToken)
      ctx.body = session.user
      ctx.status = 201
    },
  ]),

}
