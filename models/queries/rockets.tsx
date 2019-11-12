import gql from "graphql-tag";

export const GET_ROCKETS = gql`
  query Rocket
  {
    rockets(limit: 10)
    {
      active
      boosters
      company
      cost_per_launch
      country
      description
      # engines
      first_flight
      id
    }
  }
`