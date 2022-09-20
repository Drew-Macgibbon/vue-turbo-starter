import request from 'request'
import Stripe from 'stripe'
import getAuth0ManagementApiJwt from '../../functions/getAuth0ManagementApiJwt'
import logger from '../../middleware/logger/logger'
import env from '../../config'

function updateAuth0 ({ app_metadata, event_type, auth_id }) {
  getAuth0ManagementApiJwt()
    .then(data => {
      const token = data.access_token
      const options = {
        method: 'PATCH',
        url: `https://${env.AUTH0_DOMAIN}/api/v2/users/${auth_id}`,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        body: {
          app_metadata,
        },
        json: true,
      }
      request(options, (error, response) => {
        logger.info(`${event_type} Response:`, response)
        logger.info(`${event_type} Options:`, options)
        if (error) {
          logger.error(`Stripe Webhook Error For ${event_type}: ${error}`)
          throw new Error(error)
        }
      })
    }).catch(err => { throw new Error(`AUTH0: ${event_type}`, err) })
}

async function stripeWebhook(req, res) {
  const stripe = new Stripe(env.STRIPE_SECRET)
  const webhookSecret = env.STRIPE_WEBHOOK
  let eventData
  let event_type

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
    event_type = event.type
  }

  // listen for essential stripe event types
  switch (event_type) {
    //
    // customer makes initial payment
    case 'checkout.session.completed': { // verify payment
      logger.info(['Stripe Webhook Event Type:', event_type])
      //
      // get customer subscription and metadata for auth0 id
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const auth_id = customer.metadata.auth0
      logger.info(`${event_type} Customer:`, customerId)

      // get auth0 access token and send data to auth0
      updateAuth0({ app_metadata: { plan: 'Gold' }, auth_id, event_type })
      break
    }
    case 'invoice.payment_succeeded': { // when a subscription renews
      logger.info(['Stripe Webhook Event Type:', event_type])
      const customerId = eventData.object.customer

      // get auth0 Id and subscription data
      const customer = await stripe.customers.retrieve(customerId)
      const auth_id = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info(['Stripe Customer:', sub])

      // update auth0 with new subscription end date
      updateAuth0({ app_metadata: { plan: 'Gold' }, auth_id, event_type })

      break
    }
    case 'invoice.payment_failed': { // if renewal fails redirect user to customer portal
      logger.info(['Stripe Webhook Event Type:', event_type])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const auth_id = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info(`Stripe Customer: ${sub}`)
      updateAuth0({ app_metadata: { plan: 'Gold' }, auth_id, event_type })

      break
    }
    case 'customer.subscription.deleted': { //  customer manually canceled, don't redirect to customer portal when period ends
      //
      logger.info(['Stripe Webhook Event Type:', event_type])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const auth_id = customer.metadata.auth0
      // const sub = customer.data // expand the event and get first sub

      updateAuth0({ app_metadata: { plan: 'Gold' }, auth_id, event_type })
      break
    }
    case 'customer.subscription.updated': { //  when a user renews their subscription after canceling in customer portal
      //
      logger.info(['Stripe Webhook Event Type:', event_type])
      const customerId = eventData.object.customer
      const customer = await stripe.customers.retrieve(customerId)
      const auth_id = customer.metadata.auth0
      const sub = customer.subscriptions.data[0] // must expand event data first
      logger.info('Stripe Customer:', JSON.stringify(sub))

      updateAuth0({ app_metadata: { plan: 'Gold' }, auth_id, event_type })
      break
    }
    default: logger.info(`Unhandled event type: ${event_type}`)
      // must capture unhandled events
  }
  // Return a 200 response to acknowledge receipt of the event so stripe doesn't try again
  return res.sendStatus(200)
}

export default stripeWebhook
