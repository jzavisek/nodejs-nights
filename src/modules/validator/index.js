'use strict'

const joi = require('joi')
const Promise = require('bluebird')
const errors = require('../errors')

module.exports = {
  async validate(data, schema) {
    try {
      const result = await Promise.fromCallback(done =>
        joi.validate(data, schema, { abortEarly: false }, done))
      return result
    } catch (err) {
      throw new errors.ValidationError('Validation', 'Invalid data format',
        err.details.map(detail => detail.message))
    }
  },
}
