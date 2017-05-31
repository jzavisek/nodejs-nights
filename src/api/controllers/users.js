'use strict'

const compose = require('koa-compose')
const middleware = require('../middleware')
const schema = require('../../modules/resources/users/schema')

module.exports = {
  post: compose([
    middleware.validator.validaBody(schema.register),
    async ctx => {
      // TODO: do bussiness logic
      ctx.body = ctx.request.body
    },
  ]),
}

