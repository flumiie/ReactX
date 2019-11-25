import
{
  HttpLink
} from 'apollo-client-preset'
import
{
  ApolloLink,
  InMemoryCache
} from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { onError } from 'apollo-link-error'

const link = onError(({ graphQLErrors, networkError }) =>
{
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const cache = new InMemoryCache();

const restLink = new HttpLink(
{
  uri: 'https://api.spacex.land/graphql/'
})

// const setup = async onComplete => {
  const client = new ApolloClient(
  {
    link: ApolloLink.from([restLink]),
    cache,
    // resolvers,
    // typeDefs
  })

//   return onComplete(client)
// }

export default client