'use strict'

const Chance = require('chance')

const chance = new Chance()

module.exports = {

  user: () => ({
    firstName: chance.first(),
    lastName: chance.last(),
    email: chance.email(),
    password: chance.word({ length: 10 }),
  })

}
