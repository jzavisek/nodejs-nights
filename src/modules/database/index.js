'use strict'

const postgres = require('pg-promise')()
const config = require('../config')

const pgp = postgres(config.database.connectionString)

module.exports = pgp
