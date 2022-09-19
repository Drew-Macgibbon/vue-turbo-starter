import express from 'express'
import controllers from '../controllers/index.js'

// Middleware
import useExpressJson from '../middleware/useJson.js'
import checkJwt from '../middleware/checkJwt.js'

const router = express.Router()

router.post('/posts', useExpressJson, controllers.circle.posts)

router.post('/info', useExpressJson, controllers.circle.info)

router.post('/current-user', useExpressJson, checkJwt, controllers.circle.user)

export default router
