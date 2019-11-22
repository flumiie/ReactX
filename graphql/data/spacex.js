import { gql } from 'apollo-server'
import fetch from 'node-fetch'

const API_URL = 'https://api.spacexdata.com/v3'

/**
 * Main Schema
 */
export const typeDefs = gql`
  type Rockets
  {
    id: String!
    name: String!
    active: Boolean!
  }

  type Query
  {
    rockets: Rockets
  }
`

export const resolvers =
{
  Rockets:
  {
    name: (name) => name,
  },
}

function _fetch(relativeURL)
{
  return fetch(`${API_URL}${relativeURL}`).then(res => res.json())
}

// function fetchCapsules()
// {
//   return fetchResponseByURL('/capsules').then(json => json.capsules)
// }

export function fetchRockets(relativeURL)
{
  return _fetch(relativeURL).then(json => json.capsules)
}