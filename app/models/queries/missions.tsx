import gql from "graphql-tag"

export const GET_MISSIONS = gql`
  query Missions
  {
    missions
    {
      mission_name
      mission_id
    }
  }
`

export const GET_MISSION_DETAILS = gql`
  query Mission($mission_id: String!)
  {
    mission(id: $mission_id)
    {
      mission_name
      mission_id
      manufacturers
      payload_ids
      wikipedia
      website
      twitter
      description
    }
  }
`