'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')

const BEARER_PREFIX = 'Bearer '

module.exports = {

  generateAccessToken(userId) {
    const payload = { userId }
    return jwt.sign(payload, config.auth.secret, config.auth.createOptions)
  },

  verifyAccessToken(authToken) {
    const token = authToken.replace(BEARER_PREFIX, '')
    return jwt.verify(token, config.auth.secret, config.auth.verifyOptions)
  },

}
