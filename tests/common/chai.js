'use strict'

const chai = require('chai')
const dirtyChai = require('dirty-chai')
const shallowDeepEqual = require('chai-shallow-deep-equal')
const chaiAsPromised = require('chai-as-promised')
const sinonChai = require('sinon-chai')

chai.use(chaiAsPromised)
chai.use(dirtyChai)
chai.use(shallowDeepEqual)
chai.use(sinonChai)

module.exports = chai
