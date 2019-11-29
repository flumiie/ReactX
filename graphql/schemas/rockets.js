const schemaRockets = `
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
    height: RocketSizes!
    diameter: RocketSizes!
    mass: RocketMass!
    payload_weights: [RocketPayloadWeights]!
    landing_legs: RocketLandingLegs!
    engines: RocketEngines!
    first_stage: RocketFirstStage!
    second_stage: RocketSecondStage!
  }

  type RocketCompositeFairing
  {
    option_1: String!
    option_2: String!
    composite_fairing: RocketCompositeFairingSizes!
  }

  type RocketCompositeFairingSizes
  {
    diameter: RocketSizes!
    height: RocketSizes!
  }

  type RocketEngines
  {
    number: Int
    type: String
    version: String
    layout: String
    engine_loss_max: Int
    propellant_1: String
    propellant_2: String
    thrust_sea_level: RocketThrusts!
    thrust_to_weight: Float
    thrust_vacuum: RocketThrusts!
  }

  type RocketFirstStage
  {
    reusable: Boolean
    engines: Int
    fuel_amount_tons: Float
    burn_time_sec: Int
    thrust_sea_level: RocketThrusts!
    thrust_vacuum: RocketThrusts!
  }

  type RocketSecondStage
  {
    engines: Int
    fuel_amount_tons: Int
    burn_time_sec: Int
    thrust: RocketThrusts!
    payloads: RocketCompositeFairing!
  }

  type RocketSizes
  {
    meters: Float
    feet: Float
  }

  type RocketMass
  {
    kg: Int
    lb: Int
  }

  type RocketPayloadWeights
  {
    id: String
    name: String
    kg: Int
    lb: Int
  }

  type RocketLandingLegs
  {
    number: Float
    material: String
  }

  type RocketThrusts
  {
    kN: Int
    lbf: Int
  }
`

module.exports = schemaRockets