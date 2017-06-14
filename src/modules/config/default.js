'use strict'

/* eslint-disable no-process-env */

const pkg = require('../../../package.json')

module.exports = env => ({
  env,
  appName: pkg.name,
  server: {
    port: process.env.PORT || 3000,
    bodyParser: {
      multipart: true,
    },
    cors: {
      origin: '*',
      exposeHeaders: [
        'Authorization',
        'Content-Language',
        'Content-Length',
        'Content-Type',
        'ETag',
      ],
      maxAge: 3600,
    },
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
    secret: process.env.AUTH_SECRET
      || 'wPlwdiDMLthMSQUcEgRQDSM2gBbW0chWv/gE8YVP1L6iWYaRKolm7UoXClFjPAQb',
    saltRounds: 10,
    createOptions: {
      // expires in 1h
      expiresIn: 60 * 60,
      algorithm: 'HS256',
      issuer: `com.strv.bookmarks-api.${env}`,
    },
    verifyOptions: {
      algorithm: 'HS256',
      issuer: `com.strv.bookmarks-api.${env}`,
    },
  },
})
