'use strict'

const jwt = require('jsonwebtoken')
const config = require('../config')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

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

  hashPassword(password) {
    return bcrypt.hash(pepperify(password), config.auth.saltRounds)
  },

  comparePasswords(plainText, cipherText) {
    return bcrypt.compare(pepperify(plainText), cipherText)
  },

}

function pepperify(string) {
  return crypto
    .createHmac('sha1', config.auth.secret)
    .update(string)
    .digest('hex')
}
