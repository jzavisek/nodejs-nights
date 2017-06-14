'use strict'

const _ = require('lodash')

const { expect } = require('../../common/chai')
const fake = require('../../common/fake-data')
const users = require('../../../src/modules/resources/users')
const errors = require('../../../src/modules/errors')
const db = require('../../../src/modules/database')

describe('Users', () => {

  beforeEach(() => db.init(true))

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

    it('Should not register a duplicate user', async () => {
      const fakeUser = fake.user()

      // Register for the first time
      await users.register(fakeUser)

      // Check that duplicate registration will fail
      const error = await expect(users.register(fakeUser)).to.be.rejectedWith(errors.ConflictError)
      expect(error).to.have.property('type')
      expect(error.type).to.eql('User.Conflict')
    })

  })

})
