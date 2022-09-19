import stripe from './stripe_client'

async function stripeSession (req: any, res: any) {
  // logger.info(['Stripe Checkout:'])
  const { sessionId } = req.body
  const session = await stripe.checkout.sessions.retrieve(sessionId)
  res.status(200).send(session)
}

export default stripeSession
