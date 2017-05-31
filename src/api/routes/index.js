'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()

router.get('/', controllers.status.get)
router.post('/users', controllers.users.post)

const middleware = router.routes()
module.exports = middleware
