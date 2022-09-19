import { Router } from 'express'
import controllers from '../controllers/index'

// Middleware
import useExpressJson from '../middleware/useJson'
import useExpressRaw from '../middleware/useRaw'
import checkJwt from '../middleware/checkJwt'

const router = Router()

router.post('/customer-portal', useExpressJson, checkJwt, controllers.stripe.customerPortal)

router.post('/checkout', useExpressJson, checkJwt, controllers.stripe.checkout)

router.post('/webhook', useExpressRaw, controllers.stripe.webhook)

router.post('/session', useExpressJson, checkJwt, controllers.stripe.session)

export default router
