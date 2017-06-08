/* eslint-disable no-process-env, global-require */

'use strict'

const env = process.env.NODE_ENV || 'local'

if (env === 'local') {
  require('dotenv').config({ silent: false })
}

const _ = require('lodash')

const envConfigPath = `./env/${env}`
const envConfig = require(envConfigPath)
const defaultConfig = require('./default')(env)

const resultConfig = _.merge({}, defaultConfig, envConfig)
module.exports = resultConfig
