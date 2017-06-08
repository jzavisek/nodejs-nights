'use strict'

const validator = require('../../modules/validator')

module.exports = {

  validaBody(schema) {
    return async (ctx, nextMiddleware) => {
      ctx.request.rawBody = ctx.request.body
      ctx.request.body = validator.validate(ctx.request.body, schema)
      await nextMiddleware()
    }
  },

}
