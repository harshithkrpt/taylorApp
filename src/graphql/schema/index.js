const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    blouses: [Blouse]!
    # Customer
    getCustomer(userId: ID!, searchTerm: String, customerId: ID): Customer!
    getCustomers(userId: ID!): [Customer!]!
  }

  type Mutation {
    # Authentication
    login(email: String!, password: String!): AuthResponse!
    signUp(userInput: UserInput): AuthResponse!
    revokeRefreshTokensForUsers(userId: String!): Boolean
    logout: Boolean
    # Blouses
    addBlouse(blouseInput: BlouseInput!): Blouse!
    deleteBlouse(_id: ID!): Boolean
    updateBlouse(_id: ID!, updateBlouseInput: UpdateBlouseInput): Blouse

    # Customer
    addCustomer(customerInput: CustomerInput!): Customer!
    deleteCustomer(_id: ID!): Boolean
    updateCustomer(_id: ID!, customerInput: UpdatedCustomerInput): Customer!

    # Customer Measurement
    addMeasurement(_id: ID!, measurementInput: MeasurementInput!): Measurement!
    updateMeasurement(
      _id: ID!
      measurementInput: UpdatedMeasurementInput!
    ): Measurement!

    # Item
    addItem(itemInput: ItemInput): Boolean
    updateItem(_id: ID, itemInput: UpdateItemInput): Boolean

    # Item Date
    addItemDate(receivedDate: String!, returnDate: String!): Boolean

    # Item Type
    addItemType(itemTypeInput: ItemTypeInput): Boolean
    updateItemType(_id: ID!, itemTypeInput: UpdatedItemTypeInput): Boolean
  }

  type Measurement {
    _id: ID!
    neckSize: Int!
    handSize: Int!
    waistSize: Int!
  }

  type Customer {
    _id: ID!
    name: String!
    userId: ID!
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

  input CustomerInput {
    name: String!
    email: String
    phoneNo: String!
    userId: ID!
  }

  input UpdatedCustomerInput {
    name: String
    email: String
    phoneNo: String
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

  input UpdateItemInput {
    title: String
    description: String
    imageUrl: [String!]
    userId: ID
    itemDateId: ID
    itemTypeId: ID
    ownerId: ID
  }

  input UpdatedMeasurementInput {
    neckSize: Int
    handSize: Int
    waistSize: Int
  }

  input ItemInput {
    title: String
    description: String
    imageUrl: [String!]
    userId: ID
    itemDateId: ID
    itemTypeId: ID
    ownerId: ID
  }

  input ItemTypeInput {
    name: String!
    price: Int!
  }

  input UpdatedItemTypeInput {
    name: String
    price: Int
  }
`;
