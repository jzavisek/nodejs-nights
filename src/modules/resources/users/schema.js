'use strict'

const joi = require('joi')
const config = require('../../config')

module.exports = {

  getDetail: joi.object().keys({
    userId: joi.number().required(),
  }),

  register: joi.object().keys({
    email: joi.string().required().max(config.validation.shortTextLength),
    firstName: joi.string().required().max(config.validation.shortTextLength),
    lastName: joi.string().required().max(config.validation.shortTextLength),
    password: joi.string().min(8).required(),
  }),

}
