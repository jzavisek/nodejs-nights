'use strict'

const db = require('../../database')
const schema = require('./schema')

module.exports = {

  schema,

  getByEmail(email) {
    return db.models.User.findOne({ where: { email } })
  },

  getById(userId) {
    return db.models.User.findById(userId)
  },

}
