import request from 'request'
import Stripe from 'stripe'
import getAuth0ManagementApiJwt from '../../helper/functions/getAuth0ManagementApiJwt.js'
import logger from '../../middleware/logger.js'
import env from '../../../config.js'

async function updateAuth0({ app_metadata, eventType, authId }) {
  getAuth0ManagementApiJwt()
    .then(data => {
      const token = data.access_token
      const options = {
        method: 'PATCH',
        url: `https://${env.AUTH0_DOMAIN}/api/v2/users/${authId}`,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: {
          app_metadata,
        },
        json: true,
      }
      request(options, (error, response) => {
        logger.info(`${eventType} Response:`, response)
        logger.info(`${eventType} Options:`, options)
        if (error) {
          logger.error(`Stripe Webhook Error For ${eventType}: ${error}`)
          throw new Error(error)
        }
      })
    }).catch(err => { throw new Error(`AUTH0: ${eventType}`, err) })
}

async function stripeWebhook(req, res) {
  const stripe = new Stripe(env.STRIPE_SECRET)
  const webhookSecret = env.STRIPE_WEBHOOK
  let eventData
  let eventType

  // verify the event secret against our recorded secret
  if (webhookSecret) {
    let event
    const signature = req.headers['stripe-signature']
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret,
      )
    } catch (err) {
      return res.sendStatus(400)
    }

    // Extract the object from the event.
    eventData = event.data
    eventType = event.type
  }

  // listen for essential stripe event types
  switch (eventType) {
    //
    // customer makes initial payment
    case 'checkout.session.completed': { // verify payment
      logger.info(['Stripe Webhook Event Type:', eventType])
      //
      // get customer subscription and metadata for auth0 id
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const authId = customer.metadata.auth0
      logger.info(`${eventType} Customer:`, customerId)

      // get auth0 access token and send data to auth0
      updateAuth0({ app_metadata: { plan: 'Gold' }, authId, eventType })
      break
    }
    case 'invoice.payment_succeeded': { // when a subscription renews
      logger.info(['Stripe Webhook Event Type:', eventType])
      const customerId = eventData.object.customer

      // get auth0 Id and subscription data
      const customer = await stripe.customers.retrieve(customerId)
      const authId = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info(['Stripe Customer:', sub])

      // update auth0 with new subscription end date
      updateAuth0({ app_metadata: { plan: 'Gold' }, authId, eventType })

      break
    }
    case 'invoice.payment_failed': { // if renewal fails redirect user to customer portal
      logger.info(['Stripe Webhook Event Type:', eventType])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const authId = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info(`Stripe Customer: ${sub}`)
      updateAuth0({ app_metadata: { plan: 'Gold' }, authId, eventType })

      break
    }
    case 'customer.subscription.deleted': { //  customer manually canceled, don't redirect to customer portal when period ends
      //
      logger.info(['Stripe Webhook Event Type:', eventType])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const authId = customer.metadata.auth0
      // const sub = customer.data // expand the event and get first sub

      updateAuth0({ app_metadata: { plan: 'Gold' }, authId, eventType })
      break
    }
    case 'customer.subscription.updated': { //  when a user renews their subscription after canceling in customer portal
      //
      logger.info(['Stripe Webhook Event Type:', eventType])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const authId = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info('Stripe Customer:', JSON.stringify(sub))

      updateAuth0({ app_metadata: { plan: 'Gold' }, authId, eventType })
      break
    }
    default: logger.info(`Unhandled event type: ${eventType}`)
      // must capture unhandled events
  }
  // Return a 200 response to acknowledge receipt of the event so stripe doesn't try again
  return res.sendStatus(200)
}

export default stripeWebhook
