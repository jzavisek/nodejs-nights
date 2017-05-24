'use strict'

module.exports = {
  extends: [
    '@strv/javascript/environments/nodejs/optional',
    '@strv/javascript/environments/nodejs/v7',
    '@strv/javascript/coding-styles/recommended',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'valid-jsdoc': 2,
    'paddid-blocks': 0,
    'id-length': [1, {
      min: 2,
      max: 30,
      exceptions: ['i', '_']
    }]
  }
}
