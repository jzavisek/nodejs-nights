'use strict'

/* eslint-disable no-process-env */

const pkg = require('../../../package.json')

module.exports = {
  appName: pkg.name,
  server: {
    port: process.env.PORT || 3000,
  },
  logging: {
    stdout: {
      enabled: true,
      level: 'debug',
    },
  },
  validation: {
    shortTextLength: 300,
  },
  database: {
    connectionString: process.env.DATABASE_URL
      || 'postgres://postgres@localhost:5432/bookmarks-db',
    options: {
      dialect: 'postgres',
      dialectOptions: {
        ssl: false,
      },
      logging: false,
    },
  },
  auth: {
    secret: process.env.AUTH_SECRET,
    options: {
      algorithm: 'HS256',
      // 1h
      expiresIn: 60 * 60,
      issuer: 'com.strv.bookmarks-app-dev',
    },
  },
}
