'use strict'

/* eslint-disable no-process-env */

const pkg = require('../../../package.json')

module.exports = {
  env: process.env.NODE_ENV || 'local',
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
}
