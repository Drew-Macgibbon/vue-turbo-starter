import Stripe from 'stripe'
import env from '../../../config.js'

async function stripeSession(req, res) {
  // logger.info(['Stripe Checkout:'])
  const stripe = new Stripe(env.STRIPE_SECRET)
  const { sessionId } = req.body
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  res.status(200).send(session)
}

export default stripeSession
