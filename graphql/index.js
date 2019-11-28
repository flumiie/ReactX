const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

const API_URL = 'https://api.spacexdata.com/v3/';

const typeDefs = `
  type Query {
    rocket(id: String!): Rocket
    rockets(limit: Int!): [Rocket]
  }

  type Rocket {
    id: String
    rocket_name: String
    active: String
    stages: String
    description: String
  }
`;

const resolvers =
{
  Query:
  {
    rocket: async (_, {id}) =>
    {
      const response = await fetch(`${API_URL}rockets/${id}/`)
      return response.json()
    },
    rockets: async (_) =>
    {
      const response = await fetch(`${API_URL}rockets`)
      return response.json()
    }
  }
};

const server = new GraphQLServer(
{
  typeDefs,
  resolvers
});

server.start().then(( url ) =>
{
  const PORT = url._connectionKey.split('::::')[1]
  console.log(`🚀 Server is running at http://localhost:${PORT}`)
})