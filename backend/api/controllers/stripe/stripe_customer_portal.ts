import env from '../../config'
import stripe from './stripe_client'

async function stripeCustomerPortal (req: any, res: any) {
  // logger.info(['Stripe Customer Portal:'])

  const { stripe_id } = req.body
  const session = await stripe.billingPortal.sessions.create({
    customer: stripe_id,
    return_url: env.BASE_URL
  })

  res.status(200).send(session.url)
}

export default stripeCustomerPortal
