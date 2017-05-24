'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')

const router = new Router()

router.get('/', controllers.status.get)

const middleware = router.routes()
module.exports = middleware
