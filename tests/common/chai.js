'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const shallowDeepEqual = require('chai-shallow-deep-equal')

chai.use(dirtyChai)
chai.use(shallowDeepEqual)

module.exports = chai
