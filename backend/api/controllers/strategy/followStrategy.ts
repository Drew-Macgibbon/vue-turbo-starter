import gql from '../../middleware/gqlClient.js'

async function followStrategy(req, res) {
  const { strategy, authId } = req.body
  const strategyString = `${strategy.label}-${strategy.instrument}-${strategy.timeframe}`
  // const id = req.body.authId
  const returnedData = []
  const actions = []
  actions.push('The trade is already stored, link to customer')
  const linkStrategyToCustomer = await gql.request(
    `mutation linkStrategyToCustomer {
        updateCustomer(
          where: {authId: "${authId}"}
          data: {strategies: {connect: {where: {strategyString: "${strategyString}"}}}}
        )
        {
          authId
        }
        publishCustomer(where: {authId: "${authId}"})
        {
          authId
        }
      }`,
  )
  returnedData.push(linkStrategyToCustomer)
  // create link between customer and strategy
  res.status(201).json({ trade: returnedData, actions })
}

export default followStrategy
