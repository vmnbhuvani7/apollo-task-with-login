import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
       getAllUser: [User!]!
       getUserById(id: ID!): [User!]!
    }

    extend type Mutation {
        registerUser(newUser: UserInput!): AuthResp!
        authenticateUser(userName: String!, password: String!): signInResp!
    }

    input UserInput {
        firstName: String!
        lastName: String!
        userName: String!
        password: String!
        email: String!
    }
    
    type User {
        id:ID!
        firstName: String!
        lastName: String!
        userName: String!
        email: String!
    }

    type AuthResp {
        user: User!,
        # token: String!
    }
    type signInResp {
        user: User!,
        token: String!
    }
`;