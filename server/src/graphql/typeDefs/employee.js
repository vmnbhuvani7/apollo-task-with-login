import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
       getAllEmployee: [Employee!]!
       getEmployee(id: ID!): [Employee!]!
    }

    extend type Mutation {
        createNewEmployee(newPost: EmployeeInput!): Employee!
        deleteEmployee(id: ID!): PostNotification!
    }

    type Employee {
        id: ID!
        name: String!
        age: Number!
        post: String!
        salary: Number!
        department: String!
        company: ID!
    }

    input EmployeeInput {
        name: String!
        age: Number!
        post: String!
        salary: Number!
        department: String!
        company: ID!
    }
    
    type PostNotification {
        id: ID!
        message: String
        success: Boolean
    }
    extend type Subscription {
        employeeChange : EmployeeSubscribe
    }

    type EmployeeSubscribe {
        keyType : String
        data: Employee!
    }

`;