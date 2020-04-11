const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    blouses: [Blouse]!
  }

  type Mutation {
    login(email: String!, password: String!): AuthResponse!
    signUp(userInput: UserInput): AuthResponse!
    addBlouse(blouseInput: BlouseInput!): Blouse!
    deleteBlouse(_id: ID!): Boolean
    updateBlouse(_id: ID!, updateBlouseInput: UpdateBlouseInput): Blouse
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
