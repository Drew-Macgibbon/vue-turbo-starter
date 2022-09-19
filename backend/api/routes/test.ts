import express from 'express'
import controllers from '../controllers/index.js'

// Middleware
import useExpressJson from '../middleware/useJson.js'
import checkJwt from '../middleware/checkJwt.js'

const router = express.Router()

router.post('/auth', useExpressJson, checkJwt, controllers.test.auth)

router.post('/public', useExpressJson, controllers.test.noAuth)

export default router
