import gql from '../../middleware/gqlClient.js'

async function unfollowStrategy(req, res) {
  const { strategy, authId } = req.body
  const strategyString = `${strategy.label}-${strategy.instrument}-${strategy.timeframe}`
  // const id = req.body.authId
  const returnedData = []
  const actions = []

  const unlinkStrategyToCustomer = await gql.request(
    `mutation unlinkStrategyToCustomer {
        updateCustomer(
          where: {authId: "${authId}"}
          data: {strategies: {disconnect: {strategyString: "${strategyString}"}}})
        {
          authId
        }
        publishCustomer(where: {authId: "${authId}"})
        {
          authId
          strategies {
            strategyString
          }
        }
      }`,
  )
  returnedData.push(unlinkStrategyToCustomer)
  res.status(201).json({ trade: returnedData, actions })
}

export default unfollowStrategy
