import gql from '../../middleware/gqlClient'

async function followStrategy(req, res) {
  const { strategy, auth_id } = req.body
  const strategyString = `${strategy.label}-${strategy.instrument}-${strategy.timeframe}`
  // const id = req.body.auth_id
  const returnedData = []
  const actions = []
  actions.push('The trade is already stored, link to customer')
  const linkStrategyToCustomer = await gql.request(
    `mutation linkStrategyToCustomer {
        updateCustomer(
          where: {auth_id: "${auth_id}"}
          data: {strategies: {connect: {where: {strategyString: "${strategyString}"}}}}
        )
        {
          auth_id
        }
        publishCustomer(where: {auth_id: "${auth_id}"})
        {
          auth_id
        }
      }`,
  )
  returnedData.push(linkStrategyToCustomer)
  // create link between customer and strategy
  res.status(201).json({ trade: returnedData, actions })
}

export default followStrategy
