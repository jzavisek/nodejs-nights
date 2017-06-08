'use strict'

const _ = require('lodash')

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
  }, {
    tableName: 'users',
    timestamps: false,
    classMethods: {
    },
    instanceMethods: {
      toJSON() {
        const user = this.get()
        return _.omit(user, 'passwordHash')
      },
    },
    hooks: {
      // beforeCreate
    },
  })

  return User
}

