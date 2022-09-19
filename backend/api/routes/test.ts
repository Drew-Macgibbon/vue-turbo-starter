import express from 'express'
import controllers from '../controllers/index'

// Middleware
import useExpressJson from '../middleware/useJson'
import checkJwt from '../middleware/checkJwt'

const router = express.Router()

router.post('/auth', useExpressJson, checkJwt, controllers.test.auth)

router.post('/public', useExpressJson, controllers.test.noAuth)

export default router
