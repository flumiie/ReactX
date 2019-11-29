import gql from "graphql-tag"

export const GET_MISSIONS = gql`
  query Mission
  {
    missions
    {
      description
      id
      manufacturers
      name
      twitter
      payloads
      {
        reused
        payload_type
        payload_mass_kg
        payload_mass_lbs
        orbit
        norad_id
        nationality
        manufacturer
        id
        customers
      }
      wikipedia
      website
    }
  }
`