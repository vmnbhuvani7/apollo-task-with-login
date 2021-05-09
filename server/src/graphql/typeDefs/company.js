import { gql } from 'apollo-server-express'

export default gql`
 
    extend type Query {
       getAllCompany: [Company!]!
       getCompanyById: [Company!]!
       getSelectedCompany(id:ID!): Company!
    }

    extend type Mutation {
        createNewCompany(newPost: CompanyInput!): Company!
    }

    type Company {
        id:ID
        companyName: String!
        owner: String!
        location: String!
    }

    input CompanyInput {
        companyName: String!
        location: String!
    }

    extend type Subscription {
        companyChange : UserSubscribe
    }

    type UserSubscribe {
        keyType : String
        data: Company!
    }
`;