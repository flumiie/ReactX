const queries = `
  type Query
  {
    rocket(id: String!): Rocket
    rockets(limit: Int): [Rocket]
    
    mission(id: String!): Mission
    missions(limit: Int): [Mission]
  }
`

module.exports = queries