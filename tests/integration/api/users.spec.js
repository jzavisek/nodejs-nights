'use strict'

const _ = require('lodash')
const request = require('supertest-koa-agent')
const db = require('../../../src/modules/database')
const users = require('../../../src/modules/resources/users')
const fake = require('../../common/fake-data')
const api = require('../../../src/api')
const { expect } = require('../../common/chai')
const sinon = require('sinon')

describe('POST /users', () => {

  beforeEach(() => db.init(true))

  it('Should register a new user', async () => {

    const fakeUser = fake.user()
    const expectedResult = _.omit(fakeUser, 'password')

    const response = await request(api)
      .post('/users')
      .send(fakeUser)
      .expect(201)

    expect(response.body).to.shallowDeepEqual(expectedResult)
    expect(response.body).to.include.keys(['id', 'createdAt', 'updatedAt'])

    expect(response.headers).to.have.property('authorization')
    expect(response.headers.authorization).to.be.a('string')
  })

  it('Should call business logic', async () => {

    const fakeUser = fake.user()
    const fakeResponse = {
      accessToken: '123',
      user: fakeUser,
    }

    const sandbox = sinon.sandbox.create()
    sandbox.stub(users, 'register').callsFake(() => Promise.resolve(fakeResponse))

    const response = await request(api)
      .post('/users')
      .send(fakeUser)
      .expect(201)

    expect(users.register).to.have.been.calledOnce()
    sandbox.restore()
  })

})
