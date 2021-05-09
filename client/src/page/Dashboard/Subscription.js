import gql from "graphql-tag";

export const SUBSCRIPTION_USERS = gql`
    subscription companyChange{
        companyChange {
            keyType
            data {
                id
                companyName
                location
                owner
            }
        }
    }
`
