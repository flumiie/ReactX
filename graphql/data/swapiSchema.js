import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLString
} from 'graphql'
import { makeExecutableSchema } from 'apollo-server-express'

const BASE_URL = 'https://api.spacexdata.com/v3'

/**
 * Main Schema
 */
const typeDefs = gql`
  type Rockets
  {
    id: ID
    name: String
    active: Boolean
  }
  type Query
  {
    getRocket: Rocket
    getRockets(people: Int): [getRocket]
  }
`

function fetchResponseByURL(relativeURL)
{
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json())
}

function fetchCapsules()
{
  return fetchResponseByURL('/capsules').then(json => json.capsules)
}

function fetchCapsulesByURL(relativeURL)
{
  return fetchResponseByURL(relativeURL).then(json => json.capsules)
}

const CapsuleType = new GraphQLObjectType(
{
  name: 'Capsules',
  fields: () =>
  ({
    capsules:
    {
      type: new GraphQLList(CapsuleType),
      resolve: capsule => capsule.map(fetchCapsulesByURL),
    },
  }),
})

const QueryCapsule = new GraphQLObjectType(
{
  name: 'Capsule',
  fields: () =>
  ({
    person:
    {
      type: CapsuleType,
      args:
      {
        id: { type: GraphQLString },
      },
      resolve: (root, args) => fetchPersonByURL(`/capsules/${args.id}/`),
    },
  }),
})

const gqlSchema = new GraphQLSchema(
{
  query: QueryCapsule,
})

const Resolvers = () =>
{
  
}

export default makeExecutableSchema({
	typeDefs: [gqlSchema],
	resolvers: Resolvers
})