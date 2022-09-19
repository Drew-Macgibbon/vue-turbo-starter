// strategies
// import createStrategy from './strategy/createStrategy'
// import followStrategy from './strategy/followStrategy'
// import unfollowStrategy from './strategy/unfollowStrategy'

// stripe
import stripeCustomerPortal from './stripe/stripe_customer_portal'
import stripeCheckout from './stripe/stripe_checkout'
import stripeWebhook from './stripe/stripe_webhook'
import stripeSession from './stripe/stripe_portal_session'

// test
import testAuth from './test/test_auth'
import testNoAuth from './test/test_public'

// Circle
import createCircleUser from './circle/create_circle_user'
import getCirclePosts from './circle/get_circle_posts'
import getCircleInfo from './circle/get_circle_info'

const controller = {
  // strategy: {
  //   create: createStrategy,
  //   follow: followStrategy,
  //   unfollow: unfollowStrategy,
  // },
  stripe: {
    customerPortal: stripeCustomerPortal,
    checkout: stripeCheckout,
    webhook: stripeWebhook,
    session: stripeSession,
  },
  circle: {
    posts: getCirclePosts,
    info: getCircleInfo,
    user: createCircleUser,
  },
  test: {
    auth: testAuth,
    noAuth: testNoAuth,
  },
}

export default controller
