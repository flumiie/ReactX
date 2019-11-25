import { ApolloServer } from 'apollo-server'
import { SpaceXAPI } from './data/source'
import
{
  typeDefs,
  resolvers
} from './data/schema'
import
{
  fetchRockets
} from './data/queries'

const server = new ApolloServer(
{
  typeDefs,
  resolvers,
  dataSources: () =>
  ({
    api: new SpaceXAPI()
  }),
  // subscriptions: { path: "/websocket" }
})

server.listen().then(({ url }) =>
{
  console.log(`🚀 Server ready at ${url}`)
})