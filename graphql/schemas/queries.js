const queries = `
  type Query
  {
    rocket(id: String!): Rocket
    rockets(limit: Int): [Rocket]
    
    mission(mission_id: String!): Mission
    missions(limit: Int): [Mission]
  }
`

module.exports = queries