'use strict'

const db = require('../../database')
const schema = require('./schema')

module.exports = {

  schema,

  async getByEmail(email) {
    const user = await db.models.User.findOne({ where: { email } })
    return user
  },

}
