const { GraphQLServer } = require('graphql-yoga');
const fetch = require('node-fetch');

const API_URL = 'https://api.spacexdata.com/v3';

const typeDefs = `
  type Query {
    getRocket(id: String!): Rocket
  }

  type Rocket {
    active: String
    stages: String
  }
`;

const resolvers =
{
  Query:
  {
    getRocket: async (_, {id}) =>
    {
      const response = await fetch(`${API_URL}/rockets/${id}/`)
      return response.json()
    }
  }
};

const server = new GraphQLServer(
{
  typeDefs,
  resolvers
});

server.start().then(({ url }) =>
{
  console.log(`🚀 Server ready at ${url}`)
})