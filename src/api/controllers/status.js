'use strict'

module.exports = {

  get(ctx) {
    ctx.status = 200
    ctx.body = {
      status: 'running',
    }
  },

}
