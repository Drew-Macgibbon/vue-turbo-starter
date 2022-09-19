import express from 'express'
import controllers from '../controllers/index.js'

// Middleware
import useExpressJson from '../middleware/useJson.js'
import useExpressRaw from '../middleware/useRaw.js'
import checkJwt from '../middleware/checkJwt.js'

const router = express.Router()

router.post('/customer-portal', useExpressJson, checkJwt, controllers.stripe.customerPortal)

router.post('/checkout', useExpressJson, checkJwt, controllers.stripe.checkout)

router.post('/webhook', useExpressRaw, controllers.stripe.webhook)

router.post('/session', useExpressJson, checkJwt, controllers.stripe.session)

export default router
