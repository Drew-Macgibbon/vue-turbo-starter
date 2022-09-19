import Stripe from 'stripe'
import env from '../../config'

const stripeConfig =

const stripe = new Stripe(env.STRIPE_SECRET, {})

export default stripe
