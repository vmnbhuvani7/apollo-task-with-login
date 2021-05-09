import { gql }from 'apollo-server-express'

export default gql`
    scalar Number

    directive @isAuth on FIELD_DEFINITION

    type Query {
        _: Boolean!
    }
    type Mutation {
        _: Boolean!
    }
    type Subscription {
        _: Boolean!
    }
`;