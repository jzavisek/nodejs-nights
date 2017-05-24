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
}
