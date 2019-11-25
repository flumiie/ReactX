import { gql } from 'apollo-server'
import
{
  find,
  filter
} from 'lodash'
import fetch from 'node-fetch'
import { API_URL } from './source'

/**
 * Main Schema
 */
export const typeDefs = gql`
  type Rockets
  {
    id: ID!
    name: String
    active: Boolean
  }

  type Query
  {
    rocket: Rockets
    rockets: [Rockets]
  }
`

export const resolvers =
{
  Query:
  {
    rocket: (root, { id }, { dataSources }) => dataSources.api.getRocket(id),
    rockets: (root, args, { dataSources }) => dataSources.api.getRockets(),
  },
}

export async function _fetch(relativeURL)
{
  return fetch(`${API_URL}${relativeURL}`)
    .then(res => res.json())
}