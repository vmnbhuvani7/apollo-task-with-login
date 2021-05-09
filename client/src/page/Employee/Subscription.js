import gql from "graphql-tag";

export const SUBSCRIPTION_EMPLOYEE = gql`
    subscription employeeChange{
        employeeChange {
            keyType
            data {
                id
                name
                age
                post
                salary
                department
                company
            }
        }
    }
`