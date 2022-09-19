import Stripe from 'stripe'
import env from '../../../config.js'

async function stripeCheckout(req, res) {
  // logger.info(['Stripe Checkout:'])
  const stripe = new Stripe(env.STRIPE_SECRET)
  let { priceId, customerId } = req.body
  if (env.NODE_ENV === 'development') {
    priceId = 'price_1InBZfDhvT9geSyOLlbiYCYB'
    customerId = 'cus_LVetyg6kfVg35x'
  }
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    success_url: `${env.BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.BASE_URL}/payment-failed?session_id={CHECKOUT_SESSION_ID}`,
  })
  res.status(200).send(session)
}

export default stripeCheckout
