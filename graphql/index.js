const { GraphQLServer } = require('graphql-yoga')
const fetch = require('node-fetch')

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}

const API_URL = 'https://api.spacexdata.com/v3/'

const typeDefs = `
  type Query
  {
    rocket(id: String!): Rocket
    rockets(limit: Int!): [Rocket]
  }

  type Rocket
  {
    rocket_id: String
    rocket_name: String
    active: String
    stages: String
    description: String
    wikipedia: String
    type: String
    success_rate_pct: String
    boosters: String
    company: String
    country: String
    cost_per_launch: String
    first_flight: String
  }
`
  //   landing_legs
  //   {
  //     number
  //     material
  //   }
  //   diameter
  //   {
  //     feet
  //     meters
  //   }
  //   engines
  //   {
  //     engine_loss_max
  //     layout
  //     number
  //     propellant_1
  //     propellant_2
  //     thrust_sea_level
  //     {
  //       kN
  //       lbf
  //     }
  //     thrust_to_weight
  //     thrust_vacuum
  //     {
  //       kN
  //     }
  //     type
  //     version
  //   }
  //   first_stage
  //   {
  //     burn_time_sec
  //     engines
  //     fuel_amount_tons
  //     reusable
  //     thrust_sea_level
  //     {
  //       kN
  //       lbf
  //     }
  //     thrust_vacuum
  //     {
  //       kN
  //       lbf
  //     }
  //   }
  //   height
  //   {
  //     meters
  //     feet
  //   }
  //   mass
  //   {
  //     kg
  //     lb
  //   }
  //   payload_weights
  //   {
  //     id
  //     kg
  //     lb
  //     name
  //   }
  //   second_stage
  //   {
  //     burn_time_sec
  //     engines
  //     fuel_amount_tons
  //     payloads
  //     {
  //       composite_fairing
  //       {
  //         diameter
  //         {
  //           feet
  //           meters
  //         }
  //         height
  //         {
  //           feet
  //           meters
  //         }
  //       }
  //       option_1
  //     }
  //     thrust
  //     {
  //       kN
  //       lbf
  //     }
  //   }
  // }


const resolvers =
{
  Query:
  {
    rocket: async (_, {id}) =>
    {
      const response = await fetch(`${API_URL}rockets/${id}/`)
      return response.json()
    },
    rockets: async (_) =>
    {
      const response = await fetch(`${API_URL}rockets`)
      return response.json()
    }
  }
}

const server = new GraphQLServer(
{
  typeDefs,
  resolvers
})

server.start(options, ({ port }) =>
{
  console.log(`🚀 Server is listening on port ${port}`)
})