/* eslint-disable no-process-env */

'use strict'

module.exports = {
  database: {
    connectionString: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/bookmarks-db-test',
  },
  logging: {
    stdout: {
      level: 'error',
    },
  },
}
