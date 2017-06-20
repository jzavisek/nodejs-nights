'use strict'

const db = require('../../database')
const schema = require('./schema')
const log = require('../../logging')
const errors = require('../../errors')
const auth = require('../../auth')

module.exports = {

  schema,

  getById(userId) {
    return db.models.User.findById(userId)
  },

  async register(userData) {
    log.info({ email: userData.email }, 'Registering user.')

    // Verify that the user does not exist
    const conflictUser = await getByEmail(userData.email)
    if (conflictUser) {
      throw new errors.ConflictError('User.Conflict')
    }

    // Hash password
    const model = Object.assign({}, userData)
    model.passwordHash = await auth.hashPassword(userData.password)

    // Create a database record
    const user = await new db.models.User(model).save()
    const accessToken = await auth.generateAccessToken(user.id)

    return {
      user,
      accessToken,
    }
  },

  async createSession(userData) {
    log.info({ email: userData.email }, 'User sign in.')

    // Find user
    const user = await getByEmail(userData.email)
    if (!user) {
      throw new errors.Unauthorized()
    }

    // Verify password
    const isPasswordValid = await auth.comparePasswords(userData.password, user.passwordHash)
    if (!isPasswordValid) {
      throw new errors.Unauthorized()
    }

    // Generate auth data
    const accessToken = await auth.generateAccessToken(user.id)
    return {
      user,
      accessToken,
    }
  },

}

function getByEmail(email) {
  return db.models.User.findOne({ where: { email } })
}
