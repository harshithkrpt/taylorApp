const { buildSchema } = require("graphql");

module.exports = buildSchema(`

    type Blouse {
        title: String!
        _id: ID!
        deadline: String!
        createdAt: String!
        updatedAt: String!
    }

    input BlouseInput {
        title: String!
        deadline: String!
    }

    type RootQuery {
        blouses: [Blouse]!
    }

    type RootMutation {
        addBlouse(blouseInput: BlouseInput!): Blouse
    }

    schema {
        query:RootQuery,
        mutation:RootMutation
    }
`);
