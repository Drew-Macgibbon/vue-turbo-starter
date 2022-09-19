import { Router } from 'express'
import controllers from '../controllers/index'

// Middleware
import useExpressJson from '../middleware/useJson'
import useExpressRaw from '../middleware/useRaw'
import checkJwt from '../middleware/checkJwt'

const router = Router()

router.post('-create', useExpressJson, checkJwt, controllers.stripe.customerPortal)

router.post('-update', useExpressJson, checkJwt, controllers.stripe.session)

router.post('-one', useExpressJson, checkJwt, controllers.stripe.checkout)

router.post('-many', useExpressRaw, controllers.stripe.webhook)

router.post('-delete', useExpressJson, checkJwt, controllers.stripe.session)

export default router
