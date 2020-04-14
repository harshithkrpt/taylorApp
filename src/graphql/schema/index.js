const {
  gql
} = require("apollo-server-express");

module.exports = gql `
  type Query {
    blouses: [Blouse]!
    getOwner(_id:ID!): Owner
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    signUp(userInput: UserInput): AuthResponse!
    addBlouse(blouseInput: BlouseInput!): Blouse!
    deleteBlouse(_id: ID!): Boolean
    updateBlouse(_id: ID!, updateBlouseInput: UpdateBlouseInput): Blouse
    addOwner(ownerInput: OwnerInput!): Owner!
    addMeasurement(_id:ID!,measurementInput: MeasurementInput!): Measurement!
  }

  type Measurement {
    _id: ID!
    neckSize: Int!
    handSize: Int!
    waistSize: Int!
  }

  type Owner {
    _id: ID!
    name: String!
    email: String
    phoneNo: String!
    measurementId: ID
  }

  type AuthResponse {
    token: String
    error: Error
  }

  type Error {
    msg: String!
    path: String!
  }

  type Blouse {
    title: String!
    _id: ID!
    image: String
    deadline: String!
    createdAt: String!
    updatedAt: String!
  }

  input MeasurementInput {
    neckSize: Int!
    handSize: Int!
    waistSize: Int!
  }

  input OwnerInput {
    name: String!
    email: String
    phoneNo: String!
  } 

  input UpdateBlouseInput {
    title: String
    image: String
    deadline: String
  }

  input BlouseInput {
    title: String!
    deadline: String!
    image: Upload
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }
`;