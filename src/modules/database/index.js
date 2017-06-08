'use strict'

const Sequelize = require('sequelize')
const config = require('../config')
const userModel = require('../resources/users/model')

const sequelize = new Sequelize(config.database.connectionString, config.database.options)

const models = {
  User: sequelize.import('user', userModel),
}

module.exports = {

  init(force = false) {
    return sequelize.sync({ force })
  },

  models,
  sequelize,
}
