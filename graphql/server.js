import { ApolloServer } from 'apollo-server'
import
{
  fetchRockets,
  typeDefs,
  resolvers
} from './data/spacex'

const server = new ApolloServer(
{
  typeDefs,
  resolvers,
  dataSources: () =>
  ({
    spacexAPI: fetchRockets('/rockets')
  }),
  // subscriptions: { path: "/websocket" }
})

server.listen().then(({ url }) =>
{
  console.log(`🚀 Server ready at ${url}`)
})