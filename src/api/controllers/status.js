'use strict'

const errors = require('../../modules/errors')

module.exports = {

  get(ctx) {
    throw new errors.AppError('Validation', 'Sample error', 400)

    // ctx.status = 200
    // ctx.body = {
    //   status: 'running',
    // }
  },

}
