'use strict'

const validator = require('../../modules/validator')

module.exports = {

  validateParams(schema) {
    return async (ctx, nextMiddleware) => {
      ctx.rawParams = ctx.params
      ctx.params = validator.validate(ctx.params, schema)
      await nextMiddleware()
    }
  },

  validaBody(schema) {
    return async (ctx, nextMiddleware) => {
      ctx.request.rawBody = ctx.request.body
      ctx.request.body = validator.validate(ctx.request.body, schema)
      await nextMiddleware()
    }
  },

}
