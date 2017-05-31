'use strict'

const uuid = require('uuid')
const errors = require('../../modules/errors')
const log = require('../../modules/logging')
const config = require('../../modules/config')

module.exports = {
  async handleError(ctx, nextMiddleware) {
    try {
      await nextMiddleware()
    } catch (err) {
      if (err instanceof errors.AppError) {
        processKnownError(ctx, err)
      } else {
        processUnknownError(ctx, err)
      }
    }
  },
}

function processKnownError(ctx, err) {
  ctx.status = err.status || 500
  ctx.body = {
    type: err.type,
    message: err.message,
    errors: err.errors,
  }
}

function processUnknownError(ctx, err) {
  err.correlationId = uuid.v1()
  log.error(err, 'Unhandler erorr')

  if (config.env === 'production') {
    ctx.body = {
      correlationId: err.correlationId,
      message: 'Unknown error occurred.',
    }
  } else {
    ctx.body = {
      message: err.message,
      stackTrace: err.stack,
    }
  }
}
