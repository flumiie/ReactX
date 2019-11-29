const { GraphQLServer } = require('graphql-yoga')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const server = new GraphQLServer(
{
  typeDefs,
  resolvers
})

server.start(options, ({ port }) =>
{
  console.log(`🚀 Server is listening on port ${port}`)
})