// strategies
// import createStrategy from './strategy/createStrategy.js'
// import followStrategy from './strategy/followStrategy.js'
// import unfollowStrategy from './strategy/unfollowStrategy.js'

// stripe
import stripeCustomerPortal from './stripe/stripeCustomerPortal.js'
import stripeCheckout from './stripe/stripeCheckout.js'
import stripeWebhook from './stripe/stripeWebhook.js'
import stripeSession from './stripe/stripeSession.js'

// test
import testAuth from './test/testAuth.js'
import testNoAuth from './test/testNoAuth.js'

// Circle
import createCircleUser from './circle/createCircleUser.js'
import getCirclePosts from './circle/getCirclePosts.js'
import getCircleInfo from './circle/getCircleInfo.js'

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
