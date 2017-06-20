'use strict'

const _ = require('lodash')
const log = require('../../logging')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNulls: false,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNulls: false,
      field: 'first_name',
    },
    lastName: {
      type: DataTypes.STRING,
      allowNulls: false,
      field: 'last_name',
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNulls: false,
      field: 'password_hash',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  }, {

    tableName: 'users',
    timestamps: true,

    hooks: {

      beforeCreate(instance, options) {
        log.info({ instance, options }, 'Before create hook hit.')
        // Run the code before a database record is created
      },

    },
  })

  // Instance methods
  User.prototype.toJSON = function toJSON() {
    const user = this.get()
    return _.omit(user, 'passwordHash')
  }

  // Class methods
  // User.doSomething = function () {}

  return User
}
