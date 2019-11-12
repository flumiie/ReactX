import gql from "graphql-tag";

export const GET_ROCKETS = gql`
  query Rocket
  {
    rockets
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