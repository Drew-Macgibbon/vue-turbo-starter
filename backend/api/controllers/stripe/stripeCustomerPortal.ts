import Stripe from 'stripe'
import env from '../../../config.js'

async function stripeCustomerPortal(req, res) {
  // logger.info(['Stripe Customer Portal:'])

  const stripe = new Stripe(env.STRIPE_SECRET) // must be inside call
  const { stripe_id } = req.body
  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_id,
    return_url: env.BASE_URL,
  })

  res.status(200).send(session.url)
}

export default stripeCustomerPortal
