'use strict'

const _ = require('lodash')

const { expect } = require('../../common/chai')
const fake = require('../../common/fake-data')
const users = require('../../../src/modules/resources/users')

describe('Users', () => {

  context('Registration', () => {

    it('Should register a new user', async () => {
      const fakeUser = fake.user()
      const expectedResult = _.omit(fakeUser, 'password')

      const result = await users.register(fakeUser)

      // Validate result
      expect(result).to.exist()
      expect(result.accessToken).to.be.a('string')
      expect(result.user).to.be.an('object')

      const userObj = result.user.toJSON()
      expect(userObj).to.shallowDeepEqual(expectedResult)
      expect(userObj).to.include.keys(['id', 'createdAt', 'updatedAt'])

      // Validate db record
      const dbUser = await users.getById(userObj.id)
      expect(dbUser).to.exist()
      expect(dbUser.id).to.eql(userObj.id)
    })

  })

})
