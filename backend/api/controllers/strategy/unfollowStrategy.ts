import gql from '../../middleware/gqlClient'

async function unfollowStrategy(req, res) {
  const { strategy, auth_id } = req.body
  const strategyString = `${strategy.label}-${strategy.instrument}-${strategy.timeframe}`
  // const id = req.body.auth_id
  const returnedData = []
  const actions = []

  const unlinkStrategyToCustomer = await gql.request(
    `mutation unlinkStrategyToCustomer {
        updateCustomer(
          where: {auth_id: "${auth_id}"}
          data: {strategies: {disconnect: {strategyString: "${strategyString}"}}})
        {
          auth_id
        }
        publishCustomer(where: {auth_id: "${auth_id}"})
        {
          auth_id
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
