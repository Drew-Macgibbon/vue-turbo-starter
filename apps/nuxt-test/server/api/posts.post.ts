import { fetch}  from 'ohmyfetch'

const graphqlQuery = {
  "operationName": "getArticles",
  "query": `query getArticles { mlfx_articles(order_by: {created_at: desc}) { id }}`,
}

const options = {
  "method": "POST",
  "headers": {
    type: 'application/json',
  },
  "body": JSON.stringify(graphqlQuery)
}

export default defineEventHandler(async (event) => {
  console.log('connek')
  const response = await fetch('https://mlfx.hasura.app/v1/graphql', options)
  const data = await response.json()
  console.log('rappy', data)
  return {
    posts: data.data
  }
})



