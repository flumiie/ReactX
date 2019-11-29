const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')
const queries = require('./schemas/queries')
const schemaRockets = require('./schemas/rockets')
const schemaMissions = require('./schemas/missions')

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const typeDefs = queries.concat(
  schemaRockets,
  schemaMissions
)

const server = new GraphQLServer(
{
  typeDefs,
  resolvers
})

server.start(options, ({ port }) =>
{
  console.log(`🚀 Server is listening on port ${port}`)
})