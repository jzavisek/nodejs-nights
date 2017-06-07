/* eslint-disable no-template-curly-in-string */

'use strict'

const db = require('../../database')

module.exports = {

  async getByEmail(email) {
    const user = await db.oneOrNone(
      'select users.* from users where email = ${email}',
      { email },
    )

    return user
  },
}
