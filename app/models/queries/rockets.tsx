import gql from "graphql-tag"

export const GET_ROCKETS = gql`
  query Rockets
  {
    rockets
    {
      rocket_id
      rocket_name
      active
    }
  }
`

export const GET_ROCKET_DETAILS = gql`
  query Rocket($rocket_id: String!)
  {
    rocket(id: $rocket_id)
    {
      rocket_id
      rocket_name
      active
      stages
      description
      wikipedia
      type
      success_rate_pct
      boosters
      company
      country
      cost_per_launch
      first_flight
    }
  }
`