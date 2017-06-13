'use strict'

const bunyan = require('bunyan')
const config = require('../config')

const logStreams = []
if (config.logging.stdout) {
  logStreams.push({
    level: config.logging.stdout.level,
    stream: process.stdout,
  })
}

const logger = bunyan.createLogger({
  name: config.appName,
  streams: logStreams,
})

module.exports = logger
