async function getStandaloneApolloClient() {
  const { ApolloClient, InMemoryCache, HttpLink } = await import('@apollo/client/core')
  // const unfetch = typeof await import('isomorphic-unfetch')
  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://mlfx.hasura.app/v1/graphql',
      fetch
    }),
    cache: new InMemoryCache({})
  })
}

export async function getStaticProps({ params, query }: any) {
  const client = await getStandaloneApolloClient()
  // Query a cached Todo object with id 5
  const { loading, error, data } = await client.query({
    query,
    // variables: { input: { slug: params?.slug } }
  })
  return {
    props: {
      apolloStaticCache: client.cache.extract(),
      data,
    }
  } 
}
