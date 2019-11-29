const schemaMissions = `
  type Mission
  {
    mission_name: String
    mission_id: String
    manufacturers: [String]
    payload_ids: [String]
    wikipedia: String
    website: String
    twitter: String
    description: String
  }
`

module.exports = schemaMissions